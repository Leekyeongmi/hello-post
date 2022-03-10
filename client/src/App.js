import { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  BrowserRouter,
} from 'react-router-dom';
import Login from './pages/Login';
import Rollingpaper from './pages/Rollingpaper';
import Signup from './pages/Signup';
import Userinfo from './pages/Userinfo';
import axios from 'axios';
import './app.css';

axios.defaults.withCredentials = true;

function App() {
  console.log('rendered?');
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userinfo, setUserinfo] = useState({
    title: '롤링페이퍼',
    total_message: 0,
    email: 'test@com',
    nickname: 'suri',
  });

  // console.log(userinfo);
  const [accessToken, issueAccessToken] = useState(null);

  // [TEST] 루트경로로 접속할 때 서버의 GET '/' 요청 처리를 위해 잠시 추가했습니다!
  // axios
  //   .get(`${process.env.REACT_APP_API_URL}`)
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // // [TEST]

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(respond => {
        if (respond.data.message === '유저 정보 조회 성공') {
          const { title, email, total_message, nickname } =
            respond.data.userinfo;
          setUserinfo({
            title,
            email,
            total_message,
            nickname,
          });
        }
        console.log('worked?');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    isAuthenticated();
  }, [userId]);

  const handleResponseSuccess = accessToken => {
    setIsLogin(true);
    isAuthenticated();
    issueAccessToken(accessToken);
  };

  const handleLogout = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/signout`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        if (res.data.message === '로그아웃 성공') {
          setUserinfo({
            title: '',
            total_message: '',
            email: '',
            nickname: '',
          });
          setIsLogin(false);
        }
      })
      .catch(error => console.log(error));
  };

  const handleWithdrawl = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/properties`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        if (res.data.message === '회원 탈퇴 성공') {
          console.log('성공?');
          setUserinfo({
            title: '',
            total_message: '',
            email: '',
            nickname: '',
          });
          setIsLogin(false);
          // issueAccessToken(null);
          alert('정상적으로 처리되었습니다.');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login
              isLogin={isLogin}
              setUserId={setUserId}
              handleResponseSuccess={handleResponseSuccess}
            />
          </Route>
          <Route exact path="/signup">
            <Signup isLogin={isLogin} />
          </Route>
          <Route exact path="/userinfo">
            <Userinfo
              userinfo={userinfo}
              setUserinfo={setUserinfo}
              accessToken={accessToken}
            />
          </Route>
          <Route path="/posts">
            <Rollingpaper
              isLogin={isLogin}
              userinfo={userinfo}
              handleLogout={handleLogout}
              handleWithdrawl={handleWithdrawl}
              location={location}
            />
          </Route>
          <Route exact path="/">
            {isLogin ? (
              <Redirect
                to={{
                  pathname: `/posts/${userId}`,
                }}
              />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
