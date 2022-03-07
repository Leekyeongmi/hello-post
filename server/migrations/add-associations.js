'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Posts: Users = 1: 1
    // Posts 테이블에 user_id 컬럼 추가
    await queryInterface.addColumn('Posts', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // 참조할 테이블
        key: 'id', // 참조 테이블에서 가져올 필드
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    // 2) Posts: Messages = 1: N
    // Posts 테이블에 message_id 추가
    await queryInterface.addColumn('Posts', 'message_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    // 3) Messages: Posts = N: 1
    // Messages 테이블에 post_id 추가
    await queryInterface.addColumn('Messages', 'post_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Posts',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface, Sequelize) {
    // 1) Users: Posts = 1: 1
    await queryInterface.removeColumn('Posts', 'user_id');
    // 2) Posts: Messages = 1: N
    await queryInterface.removeColumn('Posts', 'message_id');
    // 3) Messages: Posts = N: 1
    await queryInterface.removeColumn('Messages', 'post_id');
  },
};
