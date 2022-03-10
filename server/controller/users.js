console.log('✔✔ usersController called!');
const { createAccessToken, isAuthorized } = require('../utils/token');
const { User, Post, Message } = require('../models');
const crypto = require('crypto');
const { runInNewContext } = require('vm');

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    console.log('👀 회원가입 메소드 실행');
    const { email, password, nickname } = req.body;
    console.log('👀 회원정보 req.body', req.body);

    if (!email || !password || !nickname) {
      console.log('🤢req.body', req.body);
      return res
        .status(400)
        .json({ message: '회원정보를 요청객체 바디에서 찾을 수 없습니다!' });
    }

    // 👀 Users.post_id가 auto_increment가 안되서 임의로 지정...
    const hexPostId = crypto.randomBytes(3).toString('hex');
    const decPostId = parseInt(hexPostId, 16);

    try {
      const [newUser, created] = await User.findOrCreate({
        where: {
          email,
          password,
          nickname,
          available: true,
          postId: decPostId,
        },
      });

      if (created) {
        console.log('✔ 새로운 회원 생성: ', newUser.get({ plain: true }));
        const accessToken = createAccessToken(newUser.dataValues);
        console.log('🤢 토큰 발급 완료 :', accessToken);

        // 👀 토큰을 응답 헤더에 심어야 하나?
        // req.headers['authorization'] = `Bearer ${accessToken}`;

        // 일단, 바디에 accessToken이라는 이름으로 보내보자!
        res.status(201).json({
          message: '회원가입성공!',
          accessToken,
          data: { uid: newUser.id },
        });
      } else {
        return res
          .status(409)
          .json({ message: '이미 가입된 이메일 입니다.', data: null });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: '회원 가입 처리 중 서버 에러' });
    }
  },
  // 로그인
  signin: async (req, res) => {
    console.log('😁 req', req.body);
    const { email, password } = req.body;

    const theUser = await User.findOne({
      where: { email, password },
    });

    if (!theUser) {
      return res
        .status(200)
        .json({ message: '가입된 유저가 없습니다.', data: null });
    }

    // 가입된 유저라면, { 액세스토큰, 성공메시지, uid } 응답으로 보내주기
    // 로그인 성공 시, 해당 유저의 롤페 화면으로 리디렉션
    // + 사이드바 클릭했을 때 이 사람의 정보

    console.log('💥 회원 정보', theUser);
    const { id } = theUser.dataValues; // User.id

    const accessToken = createAccessToken(theUser.dataValues);

    res.status(200).json({
      message: 'ok',
      accessToken,
      data: {
        uid: id,
      },
    });
    // 이후 posts/uid로 리디렉션
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
    res.status(200).json({ message: '로그아웃 성공', data: null });
  },
  // GET users/:uid

  // 헤더에 토큰을 담아서 GET 요청 들어옴
  // 권한 있으면 p.title, m.total_message, u.email, u.nickname 반환
  // => 내가 이걸  'posts/:uid' postsController.read에서 처리해줬는데... 근데 얘는 messageList도 반환!
  // API 경로가 비효율적으로 설계됐구나...
  read: async (req, res) => {
    // 헤더에서 토큰 찾아다가 디코딩한 유저 정보

    const userId = req.params.uid;
    const loginUser = isAuthorized(req);

    if (!loginUser) {
      return res
        .status(404)
        .json({ message: '해당 회원이 없습니다.', data: req.headers });
    }
    // userId  가지고 postId 값 구하기
    const theUser = await User.findOne({ where: { id: userId } });
    // console.log('🎃 theUser', theUser.dataValues);

    // P.title, M.total_message, U.email, U.nickname

    Post.findOne({ where: { userId } })
      .then(thePost => {
        const { title } = thePost.dataValues;

        Message.findAndCountAll({ where: { postId: 4 } }).then(theMessage => {
          console.log('🔼 theMsg', theMessage);
          const { count } = theMessage;

          res.status(200).json({
            message: '유저 정보 조회 성공',
            userinfo: {
              title,
              total_message: count,
              email: theUser.dataValues.email,
              nickname: theUser.dataValues.nickname,
            },
          });
        });
      })
      .catch(e => {
        return res.status(404).json({ message: e.message, data: null });
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
    const { id, email } = decoded;
    // req.body에 nickname
    const theUser = await User.findOne({ where: { email } });

    console.log('❤ BEFORE', theUser.dataValues);

    // jane.set({
    //   name: "Ada",
    //   favoriteColor: "blue"
    // });

    theUser.set({
      nickname: req.body.nickname,
      password: req.body.password,
    });

    // theUser.dataValues.nickname = req.body.nickname;
    // theUser.dataValues.password = req.body.password;
    await theUser.save();
    console.log('❤ AFTER', theUser.dataValues);

    // 👀 이제 보니까 title을 회원정보에서 변경해줘야 하는 거라면
    // 애초에 Users 테이블에 넣어주는 게 좋았겠어
    const thePost = await Post.findOne({ where: { id: 4 } });

    console.log('❤ BEFORE', thePost.dataValues);
    thePost.dataValues.title = req.body.title;
    await thePost.save();
    console.log('❤ AFTER', thePost.dataValues);

    res.status(201).json({ message: 'ok', data: { uid: id } });
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
    res.status(200).json({ message: '회원 탈퇴 성공', data: { uid: id } });
  },
};
