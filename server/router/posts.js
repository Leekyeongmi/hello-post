const router = require('express').Router();
const { postsController } = require('../controller');

// 전체 아이템 내역을 가져오는 라우팅
router.get('/:uid', postsController.get);
router.get('/:pid', postsController.get);
router.post('/message', postsController.post);
router.delete('/messages', postsController.delete);

module.exports = router;
