console.log('✔✔ usersController called!');
const { createAccessToken, isAuthorized } = require('../utils/token');
const { User, Post, Message } = require('../models');
const crypto = require('crypto');

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname } = req.body;

    // 👀 Users.post_id가 auto_increment가 안되서 임의로 지정...
    const hexPostId = crypto.randomBytes(3).toString('hex');
    const decPostId = parseInt(hexPostId, 16);

    const [newUser, created] = await User.findOrCreate({
      where: { email, password, nickname, available: true, post_id: decPostId },
    });

    console.log('✔ 새로운 회원 생성: ', newUser.get({ plain: true }));

    if (created) {
      const accessToken = createAccessToken({ email, nickname });

      // 👀 토큰을 응답 헤더에 심어야 하나?
      req.headers['authorization'] = `Bearer ${accessToken}`;

      res.status(201).json({ message: 'ok', data: null });
    } else {
      return res
        .status(409)
        .json({ message: '이미 가입된 이메일 입니다.', data: null });
    }
  },
  // 로그인
  signin: (req, res) => {
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized', data: null });
    }
    // decoded data
    const { email, password } = req.body;

    User.findOne({
      where: { email, password },
    }).then(theUser => {
      if (!theUser) {
        return res.status(403).json({ message: 'Token expired', data: null });
      }
      const { id, email, nickname, available, post_id } = theUser;

      const title = Post.findOne({ where: { id: post_id } });

      const accessToken = createAccessToken(theUser);

      res.status(200).json({
        message: 'ok',
        data: {
          accessToken,
          uid: id,
          email,
          nickname,
          available,
          post_id,
          title,
        },
      });
      // 이후 posts/uid로 리디렉션
    });
  },

  // 로그아웃
  signout: (req, res) => {
    // 👀 클라에서 req.body, req.header에서 오는 정보가 없는데
    // 토큰을 어떻게 파괴하지?
    // const decoded = isAuthorized(req);
    // if (!decoded) {
    //   return res
    //     .status(401)
    //     .json({ message: '로그인 되지 않은 상태입니다.', data: null });
    // }
    res.status(205).json({ message: '로그아웃 성공', data: null });
  },
  // GET users/:uid

  // 헤더에 토큰을 담아서 GET 요청 들어옴
  // 권한 있으면 p.title, m.total_message, u.email, u.nickname 반환
  // => 내가 이걸  'posts/:uid' postsController.read에서 처리해줬는데... 근데 얘는 messageList도 반환!
  // API 경로가 비효율적으로 설계됐구나...
  read: (req, res) => {
    // 헤더에서 토큰 찾아다가 디코딩한 유저 정보
    const loginUser = isAuthorized(req);

    const { id, email, nickname, post_id } = loginUser;

    Post.findOne({ where: { user_id: id } }).then(thePost => {
      const { title } = thePost;

      Message.findAndCountAll({ where: { post_id } }).then(theMessage => {
        const { count } = theMessage;

        res.status(200).json({
          message: 'ok',
          data: {
            title,
            total_message: count,
            email,
            nickname,
          },
        });
      });
    });
  },

  // users/properties/update
  // 회원정보 수정
  update: async (req, res) => {
    // Post.title하고 User.nickname, User.email 동시에 어떻게 update?
    // 👀 이메일은 일종의 유니크밸류라서 수정되면 안되는데...
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: '로그인되지 않은 사용자입니다', data: null });
    }

    // id를 쓰면 아래 Post 조회할 때 못써서 email로 대체
    const { id, email, post_id } = decoded;
    // req.body에 nickname
    const theUser = await User.findOne({ where: { email } });
    theUser.set({
      nickname: req.body.nickname,
      email: req.body.email,
    });

    // 👀 이제 보니까 title을 회원정보에서 변경해줘야 하는 거라면
    // 애초에 Users 테이블에 넣어주는 게 좋았겠어
    const thePost = await Post.findOne({ where: { id: post_id } });
    thePost.set({
      title: req.body.title,
    });
    res.status(204).json({ message: '회원 정보 수정 성공', data: { uid: id } });
  },

  // users/properties/destroy
  // 회원탈퇴
  destroy: async (req, res) => {
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: '요청 권한이 없습니다', data: null });
    }

    const { id, email } = decoded;

    const theUser = await User.findOne({ where: { id, email } });
    await theUser.destroy();
    res.status(204).json({ message: '회원 탈퇴 성공', data: { uid: id } });
  },
};
