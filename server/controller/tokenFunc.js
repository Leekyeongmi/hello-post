const jwt = require('jsonwebtoken');

module.export = {
  // data는 해독된 사용자 정보
  generateToken: (UserData, secretKey) => {
    try {
      const token = jwt.sign(UserData, secretKey, {
        expiresIn: '1d',
      });
      console.log('✔ TEST create token: ', token);
      return token;
    } catch (error) {
      console.log('Cannot generate Token', error);
      return null;
    }
  },

  verifyToken: (req, res, next) => {},

  setTokenCookie: (res, token) => {},
};
