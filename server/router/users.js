const router = require('express').Router();
const { usersController } = require('../controller');

// 회원가입
router.post('/signup', usersController.signup);

// 로그인
router.post('/signin', usersController.signin);

// 로그아웃
router.delete('/signout', usersController.signout);

// 회원정보 조회
router.get('/:uid', usersController.read);

// 회원정보 수정, 회원탈퇴
router
  .route('/properties')
  .patch(usersController.update)
  .delete(usersController.delete);

module.exports = router;
