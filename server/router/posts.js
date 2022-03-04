const router = require('express').Router();
const { postsController } = require('../controller');

// 메시지 작성, 삭제
router
  .route('/message')
  .post(postsController.write)
  .delete(postsController.delete);

// 롤링페이퍼 조회
router.get('/:uid', postsController.read);

// 롤링페이퍼의 전체 메시지 조회
router.get('/:pid', postsController.readAll);

// * 롤링페이퍼의 출력 기능 구현 예정 *

module.exports = router;
