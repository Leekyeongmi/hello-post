'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('Messages', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        content: {
          type: Sequelize.STRING,
          defaultValue: 'Hello',
        },
        writer: {
          type: Sequelize.STRING,
          defaultValue: '비밀 친구',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        },
      })
      // messages 테이블에 FK인 posts의 id를 추가
      .then(() => {
        queryInterface.addColumn('post_id', {
          type: Sequelize.INTEGER,
          references: { model: 'Post', key: 'id' },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  },
};
