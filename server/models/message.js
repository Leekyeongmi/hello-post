'use strict';
const Sequelize = require('sequelize');

module.exports = class Message extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        writer: {
          type: Sequelize.STRING,
          defaultValue: 'Sincerely',
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
        modelName: 'Message',
        tableName: 'messages',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    // 메시지는 하나의 롤링페이퍼에 속한다.
    // post_id는 Post 테이블의 id와 일치
    db.Message.belongsTo(db.Post, {
      foreignKey: 'post_id',
      as: 'post',
    });
  }
};
