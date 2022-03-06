const User = require('../models/user');
// Sequelize가 제공하는 쿼리로 db의 users 관련 데이터를 조회, 생성

module.exports = {
  // findOne
  findUser: async (email, password) => {
    const user = await User.findOne({
      where: { email, password },
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  },

  // findOrCreate
  createUser: (req, res) => {},

  // update
  updateUserInfo: (req, res) => {},

  // destroy
  deleteAccount: (req, res) => {},
};
