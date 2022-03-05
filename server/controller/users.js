// usersController
const { tokenFunc } = require('./tokenFunc.js');
const {
  createUser,
  updateUserInfo,
  deleteAccount,
} = require('../data/usersData');

module.exports = {
  // 회원가입
  signup: (req, res) => {},

  // 로그인
  signin: (req, res) => {},

  // 로그아웃
  signout: (req, res) => {},

  // 회원정보 조회
  read: (req, res) => {},

  // 회원정보 수정
  update: (req, res) => {},

  // 회원탈퇴
  delete: (req, res) => {},
};
