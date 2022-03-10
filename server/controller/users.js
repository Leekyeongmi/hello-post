const { createAccessToken, isAuthorized } = require('../utils/token');
const { User, Post, Message } = require('../models');
const crypto = require('crypto');

module.exports = {
  // 회원가입
  signup: async (req, res) => {
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname) {
      console.log('🤢req.body', req.body);
      return res
        .status(400)
        .json({ message: '회원정보를 요청객체 바디에서 찾을 수 없습니다!' });
    }

    // 👀 Users.post_id가 auto_increment가 안되서 임의로 지정...
    const hexPostId = crypto.randomBytes(3).toString('hex');
    const decPostId = parseInt(hexPostId, 16);

    // 👀 동일한 이메일로도 가입되는 문제가 있음
    try {
      const [newUser, created] = await User.findOrCreate({
        where: {
          email,
          password,
          nickname,
          available: true,
          // postId: decPostId,
        },
      });

      if (created) {
        const accessToken = createAccessToken(newUser.dataValues);

        await newUser.set({ postId: decPostId });
        await newUser.save();

        res.status(201).json({
          message: '회원가입성공!',
          accessToken,
          data: { uid: newUser.id },
        });
      } else {
        return res
          .status(409)
          .json({ message: '이미 가입된 이메일 입니다.', data: null });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: '회원 가입 처리 중 서버 에러' });
    }
  },
  // 로그인
  signin: async (req, res) => {
    const { email, password } = req.body;

    const theUser = await User.findOne({
      where: { email, password },
    });

    if (!theUser) {
      return res
        .status(404)
        .json({ message: '가입된 유저가 없습니다.', data: null });
    }

    // 가입된 유저라면, { 액세스토큰, 성공메시지, uid } 응답으로 보내주기
    // 로그인 성공 시, 해당 유저의 롤페 화면으로 리디렉션
    const { id } = theUser.dataValues; // User.id

    const accessToken = createAccessToken(theUser.dataValues);

    res.status(200).json({
      message: 'ok',
      accessToken,
      data: {
        uid: id,
      },
    });
    // 이후 posts/uid로 리디렉션
  },

  // 로그아웃
  signout: (req, res) => {
    res.status(205).json({ message: '로그아웃 성공', data: null });
  },
  // GET users/:uid

  read: async (req, res) => {
    const userId = req.params.uid;

    const loginUser = isAuthorized(req);

    if (!loginUser) {
      return res
        .status(404)
        .json({ message: '해당 회원이 없습니다.', data: null });
    }
    // userId  가지고 postId 값 구하기
    const theUser = await User.findOne({ where: { id: userId } });

    Post.findOne({ where: { userId } })
      .then(thePost => {
        if (!thePost) {
          return res
            .status(404)
            .json({ message: '롤링페이퍼가 없는 회원입니다😥', data: null });
        }
        const { title } = thePost.dataValues;
        // 현재 Users 테이블에 postId 추가가 안되는 문제로 하드코딩함
        Message.findAndCountAll({ where: { postId: 4 } }).then(theMessage => {
          const { count } = theMessage;

          res.status(200).json({
            message: '유저 정보 조회 성공',
            userinfo: {
              title,
              total_message: count,
              email: theUser.dataValues.email,
              nickname: theUser.dataValues.nickname,
            },
          });
        });
      })
      .catch(e => {
        return res.status(404).json({ message: e.message, data: null });
      });
  },

  // users/properties/update
  // 회원정보 수정
  update: async (req, res) => {
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: '로그인되지 않은 사용자입니다', data: null });
    }

    // 헤더 토큰으로 유저가 누구인지 확인
    const { id, email } = decoded;
    const theUser = await User.findOne({ where: { email } });

    // Users의 닉네임, 비밀번호 수정
    theUser.set({
      nickname: req.body.nickname,
      password: req.body.password,
    });

    await theUser.save();

    // Post 테이블에서 title 변경 => 원래 where: postId
    const thePost = await Post.findOne({ where: { id: 4 } });

    thePost.set({
      title: req.body.title,
    });
    await thePost.save();

    res.status(201).json({ message: 'ok', data: { uid: id } });
  },

  // users/properties/destroy
  // 회원탈퇴
  destroy: async (req, res) => {
    const decoded = isAuthorized(req);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: '요청 권한이 없습니다', data: null });
    }

    const { id, email } = decoded;

    const theUser = await User.findOne({ where: { id, email } });
    await theUser.destroy();
    res.status(204).json({ message: '회원 탈퇴 성공', data: { uid: id } });
  },
};
