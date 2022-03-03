'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'messages',
      [
        {
          content: '메시지 내용입니다~~~',
          writer: '어피치',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '화이팅~',
          writer: '이종열',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'ㅎㅎㅎㅎㅎ~~~',
          writer: '박해커',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: '생일축하해~~~',
          writer: '김코딩',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('messages', null, {});
  },
};
