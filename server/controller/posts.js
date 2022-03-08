const { createAccessToken, isAuthorized } = require('../../utils/token');
const { User, Post, Message } = require('../../models');

module.exports = {
  // 메시지 작성
  write: (req, res) => {},

  // 메시지 삭제
  delete: (req, res) => {},

  // 롤링페이퍼 조회
  // posts/:uid
  read: (req, res) => {
    const user_id = req.params.uid;

    // 1) 로그인 안 한 방문자
    const token = isAuthorized(req);

    if (!token) {
      Post.findOne({ where: { user_id } }).then(thePost => {
        const { id, title } = thePost;

        Message.findAndCountAll({ where: { post_id: id } }).then(theMessage => {
          const { count, rows } = theMessage;

          res.status(200).json({
            message: 'ok',
            data: {
              title,
              total_message: count,
              // rows는 객체 배열: [{}, {}, {}]
              messages: rows.map(row => {
                const { id, content, writer, created_at } = row;

                return { id, content, writer, created_at };
              }),
            },
          });
        });
      });
    }
    // 2) 로그인 된 유저 -> 사이드바 클릭 시 유저 정보까지 보여야 함
    else {
      const loginUser = isAuthorized(req);

      const { email, nickname, available, post_id } = loginUser;

      Post.findOne({ where: { user_id } }).then(thePost => {
        const { id, title } = thePost;

        Message.findAndCountAll({ where: { post_id: id } }).then(theMessage => {
          const { count, rows } = theMessage;

          res.status(200).json({
            message: 'ok',
            data: {
              title,
              total_message: count,
              // rows는 객체 배열: [{}, {}, {}]
              messages: rows.map(row => {
                const { id, content, writer, created_at } = row;

                return { id, content, writer, created_at };
              }),
              uid: id,
              email,
              nickname,
            },
          });
        });
      });
    }
  },

  // 개별 메시지 클릭 시 전체 메시지 목록 조회
  readAll: (req, res) => {},
};
