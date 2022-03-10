require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  createAccessToken: data => {
    console.log('😎 토큰 발급 메소드 호출', data);
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '15s' });
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
    try {
      return verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
