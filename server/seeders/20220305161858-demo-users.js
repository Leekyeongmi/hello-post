'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
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
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
