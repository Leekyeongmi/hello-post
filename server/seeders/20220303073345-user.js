'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          email: 'kimcoding@gmail.com',
          password: 1234,
          nickName: '김코딩',
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'parkhacker@gmail.com',
          password: 5678,
          nickName: '박해커',
          available: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  },
};
