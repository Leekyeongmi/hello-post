'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    console.console.log('✔create-user.js: up()');
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
