const { createAccessToken, isAuthorized } = require('../../utils/token');
const { User, Post, Message } = require('../../models');

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname } = req.body;

    const [newUser, created] = await user.findOrCreate(
      { where: { email, password, nickname, available: true, post_id: 99 } });

    if (created) {
      const accessToken = createAccessToken({ email, nickname});

      // 👀 토큰을 응답 헤더에 심어야 하나?
      res.status(201).json({ message: 'ok', data: { userInfo: newUser, accessToken } });
  } else {
    return res.status(409).json({ message: '이미 가입된 이메일 입니다.', data: null });
  }

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
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: '로그인되지 않은 사용자입니다', data: null });
    }

    const { id, nickname } = decoded;
    const { nickname: newNickname } = req.body;

    const thePost = await Post.findOne({ where: { user_id: id } });
    const { title } = thePost;

      // Post.title하고 User.nickname 동시에 어떻게 update?
      User.update({ nickname },{ where: { id } }).then(() => {
        res.status(200).json({
          message: 'ok',
          data: { nickname },
    });

    User.update(
      {
        email,
        nickname,
      },
      { where: { id } }
    ).then(() => {
      res.status(200).json({ message: 'ok', data: null });
    });
  },

  // users/properties/destroy
  // 회원탈퇴
  destroy: (req, res) => {},
};
