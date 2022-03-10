require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  createAccessToken: data => {
    console.log('😎 토큰 발급 메소드 호출', data);
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '7d' });
  },

  // 새로 발급 후 토큰 반환
  sendAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken }, message: 'ok' });
  },

  // 요청 헤더의 토큰 유효성 검사 => 유효하면 해독된 페이로드 반환
  isAuthorized: req => {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];

    let decoded;
    try {
      decoded = verify(token, process.env.ACCESS_SECRET);
    } catch (e) {
      if (e.message === 'jwt expired') {
        console.log('만료된 액세스 토큰입니다. 다시 발급받으세요', e.message);
        return -1; // TokenExpiredError
      } else if (e.message === 'jwt malformed') {
        console.log('유효하지 않은 액세스 토큰입니다.', e.message);
        return -2; // InvalidTokenError
      } else {
        console.log('Token Error', e.message);
        return -2; // InvalidTokenError
      }
    }
    return decoded;
  },
};
