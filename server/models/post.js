'use strict';
const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
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
        modelName: 'Post',
        tableName: 'posts',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    // 하나의 롤링페이퍼는 여러개의 메시지를 갖는다
    // messages 테이블의 post_id가 Post 테이블의 id와 일치
    db.Post.hasMany(db.Message, {
      foreignKey: 'post_id',
      as: 'messages',
    });
    // 롤링페이퍼의 정보는 User 테이블에 들어가게 된다.
    db.Post.belongsTo(db.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
};
