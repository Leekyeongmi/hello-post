const jwt = require('jsonwebtoken');
require('dotenv').config();

module.export = {
  // payload는 컨트롤러에서 넘겨준 사용자 정보
  generateToken: payload => {
    try {
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      if (!token) {
        return null;
      } else {
        return token;
      }
    } catch (error) {
      console.log('🚨 토큰 발급 실패', error);
      return error;
    }
  },

  // 요청 쿠키의 토큰 해독 후 권한 있는 유저인지 확인
  verifyToken: req => {
    const token = req.cookies.accessToken;

    // 로그인 안 되어 있거나, 만료된 토큰
    if (!token) {
      return null;
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      return decoded;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  setTokenToCookie: (res, token) => {
    // 👀 return 안 해도 응답에 쿠키는 심어지겠지?
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  },
};
