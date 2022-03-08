console.log('✔ usersController called!');
// usersController

const {
  generateToken,
  verifyToken,
  setTokenToCookie,
} = require('./tokenFunc.js');

const {
  findOne,
  findOrCreate,
  update,
  destroy,
  getAllUserInfo,
} = require('../data/usersData');

module.exports = {
  // 회원가입
  signup: (req, res) => {
    console.log('✔ signup called!');
    const { email, password, name } = req.body;

    const newUser = findOrCreate({ email, password, name });

    if (!newUser) {
      return res
        .status(409)
        .json({ data: null, message: '이미 가입된 이메일 입니다.' });
    } else {
      const signupToken = generateToken({
        id: newUser.id,
        email: newUser.email,
      });
      setTokenToCookie(res, signupToken);
      res.status(201).json({ uid: newUser.id, message: '회원가입 성공' });
    }
  },

  // 로그인
  signin: (req, res) => {
    console.log('✔ siginin() called!');
    // 1) 클라이언트로 부터 { email, password }와 함께 로그인 요청이 옴 => 가입된 회원인지 확인 필요
    // 2) 데이터 추출
    const { email, password } = req.body;
    // 3) 해당 로그인 정보로 db에서 유저 찾기 => userData.findUser(email, password) 사용 예정
    // 없다면, 로그인 정보가 틀렸거나, 회원이 아님 => 에러
    const signedUser = findOne(email, password);

    if (!signedUser) {
      return res.status(401).json({ message: '가입되지 않은 사용자 입니다' });
    } else {
      // 있다면, 해당 유저의 정보로 accessToken 생성
      const { id, email, nickname, available, createdAt, updatedAt } =
        signedUser.dataValues;
      const loginToken = verifyToken({ id, email });
      // 4) 생성된 access _token을 응답의 쿠키에 심기
      // 5) 쿠키: access_token, 옵션 설정, 바디: { 유저 데이터 } => 'posts/본인아이디'로 리디렉션
      if (!loginToken) {
        return res.status(500).json({ message: '사용 권한이 없습니다' });
      } else {
        setTokenToCookie(res, loginToken);
        res.status(200).json({
          message: '로그인 성공',
          data: { id, email, nickname, available, createdAt, updatedAt },
        });
      }
    }
  },

  // 로그아웃
  signout: (req, res) => {
    console.log('✔ signout() called!');
    // 1) 쿠키 삭제
    // 2) 👀리다이렉트: '/' 는 프론트에서 isLogin 상태로 처리하나?
    res.clearCookie('accessToken');
    res.status(200).json({ message: '로그아웃 성공' });
  },

  // 회원정보 조회
  read: (req, res) => {
    // users/:uid 로 들어오니까 req.params.uid로 받아옴
    const { uid } = req.params;

    const userInfo = getAllUserInfo(uid);

    if (!userInfo) {
      return res.status(404).json({ message: '존재하지 않는 유저입니다' });
    } else {
      const { title, email, nickname, totalMessage } = userInfo;

      res.status(200).json({
        message: '유저 정보 조회 성공',
        data: { title, email, nickname, totalMessage },
      });
    }
  },

  // 회원정보 수정
  update: (req, res) => {
    // 쿠키에 토큰 있는지 확인
    // null / decodedData를 가져옴
    const decoded = verifyToken(req);

    // 로그인 안되어 있는 상태
    if (!decoded) {
      return res.status(401).json({ message: '다시 로그인 해주세요' });
    }

    const { nickname, password, title } = decoded;

    const userInfo = update(nickname, password, title);
  },
  // 회원탈퇴
  destroy: (req, res) => {
    res.serd();
  },
};
