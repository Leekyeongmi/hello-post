'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('posts', [
      {
        title: '프로젝트 화이팅!',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'happy birthday!~',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'first project',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
