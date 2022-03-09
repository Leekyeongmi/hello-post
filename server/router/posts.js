const router = require('express').Router();
console.log('✔ postsRouter called!');
const { write, destroy, read, readAll } = require('../controller/posts');

// posts/*

// 메시지 작성, 삭제
router.route('/message').post(write);
// .delete(destroy);

// 롤링페이퍼 조회
router.get('/:uid', read);

// 롤링페이퍼의 전체 메시지 조회
// router.get('/:pid', readAll);

// * 롤링페이퍼의 출력 기능 구현 예정 *

module.exports = router;
