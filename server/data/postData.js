const Posts = require('../model/posts');
// Sequelize가 제공하는 쿼리로 db의 posts 관련 데이터를 조회, 생성

module.exports = {
  // sequelize의 findByPk 함수 사용
  readRollPaper: (req, res) => {},

  // create
  createMessage: (req, res) => {},

  // findAll
  readAllMessage: (req, res) => {},

  // desrtroy
  deleteMessage: (req, res) => {},
};
