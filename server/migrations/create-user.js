'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // cli에서 모델 'User'로 생성했는데 테이블명은 'Users'
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }); // end of queryInterface.createTable
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
