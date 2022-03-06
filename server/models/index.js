'use strict';

const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');
const Message = require('./message');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

// db 객체 안에 필요한 모델 담기 => require로 해당 모델에 접근
db.User = User;
db.Post = Post;
db.Message = Message;

// 모델 호출
User.init(sequelize);
Post.init(sequelize);
Message.init(sequelize);

// 모델 관계 연결 실행
User.associate(db);
Post.associate(db);
Message.associate(db);

module.exports = db;
