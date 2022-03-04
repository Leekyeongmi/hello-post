const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World from Server!');
});

// hello world 대신에 랜딩페이지/404 페이지 보여줄 수 있지 않을까

module.exports = router;
