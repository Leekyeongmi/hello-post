const router = require('express').Router();
console.log('✔ usersRouter called!');
const {
  signup,
  signin,
  signout,
  read,
  update,
  destroy,
} = require('../controller/users');

// users/*

// 회원가입
router.post('/signup', signup);

// 로그인
router.post('/signin', signin);

// 로그아웃
router.delete('/signout', signout);

// 회원정보 조회
router.get('/:uid', read);

// PATCH /properties/update 회원정보 수정
// DELETE /properties/destroy 회원탈퇴
router.route('/properties').patch(update).delete(destroy);

module.exports = router;
