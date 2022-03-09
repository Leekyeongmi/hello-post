console.log('✔✔ postsController called!');
const { isAuthorized } = require('../utils/token');
const { Post, Message } = require('../models');

module.exports = {
  // 메시지 작성
  // posts/message
  write: (req, res) => {
    // 👀 지금 코드 상으로 sendButton 눌렀을 때 클라에서 오는 name, message가 없음
    // 메시지 작성은 posts/:uid 뒤에 오는 uid를 가져와야 함
    const { owner_id, writer, message } = req.body;

    // owner_id(uid)로 post_id 찾기
    Post.findOne({
      where: { userId: owner_id },
    })
      .then(thePost => {
        const postId = thePost.id;

        Message.create({
          postId,
          content: message,
          writer,
        });
        res.status(201).json({ message: '메시지 작성 완료', data: null });
      })
      .catch(err => {
        console.log('메시지 작성 실패', err);
        return res
          .status(500)
          .json({ message: '메시지 작성 실패', data: null });
      });
  },

  // 메시지 삭제
  // delete: (req, res) => {},

  // 롤링페이퍼 조회
  // posts/:uid
  read: async (req, res) => {
    const userId = req.params.uid;
    const result = {};

    try {
      const thePost = await Post.findOne({ where: { userId } });
      const { id, title } = thePost;

      result.pid = id;
      result.ptitle = title;
    } catch (e) {
      console.log('userId로 post 조회 실패', e);
      return res
        .status(500)
        .json({ message: '없는 사용자의 롤링페이퍼 입니다', data: null });
    }
    try {
      const theMessage = await Message.findAndCountAll({
        where: { postId: result.pid },
      });
      const { count, rows } = theMessage;

      result.msgCount = count;
      result.msgList = rows;
    } catch (e) {
      console.log('postId로 message 조회 실패', e);
      return res.status(500).json({
        message: '해당 롤링페이퍼의 메시지를 불러오지 못했습니다.',
        data: null,
      });
    }
    const { ptitle, msgCount, msgList } = result;
    res.status(200).json({
      message: 'ok',
      data: {
        title: ptitle,
        total_message: msgCount,
        messages: msgList,
      },
    });
  },

  // 개별 메시지 클릭 시 전체 메시지 목록 조회
  // readAll: (req, res) => {},
};
