'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('posts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
          defaultValue: 'Welcome!',
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
      // posts 테이블에 FK인 users의 id를 추가
      .then(() => {
        queryInterface.addColumn('user_id', {
          type: Sequelize.INTEGER,
          references: { model: 'User', key: 'id' },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
