'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'post_messages',
      [
        {
          post_id: 1,
          message_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_id: 2,
          message_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_id: 1,
          message_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          post_id: 1,
          message_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('post_messages', null, {});
  },
};
