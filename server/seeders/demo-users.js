'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users', // 테이블명
      [
        {
          email: 'kim@hello.com',
          password: '1111',
          nickname: 'rollKim',
          available: true,
          created_at: new Date(),
        },
        {
          email: 'lee@hello.com',
          password: '1111',
          nickname: 'rollLee',
          available: true,
          created_at: new Date(),
        },
        {
          email: 'park@hello.com',
          password: '1111',
          nickname: 'rollPark',
          available: true,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
