require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: data => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '15s' });
  },

  generateRefreshToken: data => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: '30d' });
  },

  sendRefreshToken: (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      credentials: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60,
    });
  },

  // 새로 발급 후 토큰 반환
  sendAccessToken: (res, accessToken) => {
    res.json({ data: { accessToken }, message: 'ok' });
  },

  // 토큰 검증 후 토큰 + 요청에 대한 정보 반환
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, userInfo: data }, message: 'ok' });
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

  checkRefeshToken: refreshToken => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch (err) {
      return null;
    }
  },
};
