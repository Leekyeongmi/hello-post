const db = require('../models');
const { User, Post, Message } = db;
// Sequelize가 제공하는 쿼리로 db의 users 관련 데이터를 조회, 생성

module.exports = {
  findOne: async (email, password) => {
    const user = await User.findOne({
      where: { email, password },
    });

    if (!user) {
      return null;
    } else {
      return user;
    }
  },

  findOrCreate: async userInfo => {
    // created: true는 새로 생성된 경우
    const [newUser, created] = await User.findOrCreate({
      where: {
        email: userInfo.email,
        password: userInfo.password,
        nickname: userInfo.name,
      },
    });

    if (!created) {
      // 해당 이메일로 가입된 유저가 존재
      return null;
    } else {
      return newUser;
    }
  },

  // 반환할 회원 정보: posts.title / users.email, users.nickname / COUNT(messages) AS total_message
  getAllUserInfo: async id => {
    const userInfo = await User.findOne({
      where: { id },
      attributes: ['email', 'nickname'],
      include: [
        {
          model: Post,
          attributes: ['title'],
        },
        {
          model: Message,
          attributes: [
            [
              db.sequelize.fn('COUNT', db.sequelize.col('messages.id')),
              'totalMessage',
            ],
          ],
        },
      ],
    });

    if (!userInfo) {
      return null;
    } else {
      return userInfo;
    }
  },
  // 정보 수정 기능을 볼 수 있다는 건 로그인 된 상태라는 점
  // 모델 update 위한 where 조건: 토큰으로 해독한 유저 email, id

  // 👀수정 가능 항목: users.nickname, users.password / posts.title
  update: async id => {
    const user = await User.findOne({
      where: { id },
    });
  },

  // destroy
  destroy: async (req, res) => {},
};
