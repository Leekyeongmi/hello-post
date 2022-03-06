'use strict';
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    // 테이블 설정
    return super.init(
      {
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          defaultValue: 'Friend',
        },
        available: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  // 다른 테이블 간 관계 설정
  static associate(db) {
    // 일단은 하나의 유저가 한 개의 롤링페이퍼를 갖도록 설정
    db.User.hasOne(db.Post, {
      foreignKey: 'user_id',
      as: 'posts',
    });
    db.Post.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'users',
    });
  }
};
