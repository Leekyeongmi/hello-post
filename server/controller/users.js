const { createAccessToken, isAuthorized } = require('../../utils/token');
const { User, Post } = require('../../models');

module.exports = {
  // 회원가입
  signup: (req, res) => {},

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
  signout: (req, res) => {},

  // 회원정보 조회
  read: (req, res) => {},

  // 회원정보 수정
  update: (req, res) => {},

  // 회원탈퇴
  destroy: (req, res) => {},
};
