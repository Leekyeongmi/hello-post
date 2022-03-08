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
  const [isLogin, setIsLogin] = useState(true);
  const [userId, setUserId] = useState(1);
  const [userinfo, setUserinfo] = useState({
    title: 'Lets Rollingpaper!',
    total_message: 3,
    email: 'test@hello.com',
    nickname: 'suri',
  });
  const [accessToken, issueAccessToken] = useState(null);
  const history = useHistory();

  const isAuthenticated = () => {
    setIsLogin(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then(respond => {
        console.log(respond.data);
        if (respond.data.message === '유저 정보 조회 성공') {
          const { title, total_message, email, nickname } =
            respond.data.userinfo;
          setUserinfo({
            title,
            total_message,
            email,
            nickname,
          });
        }
      })
      .catch(error => console.log(error));
  };

  const handleResponseSuccess = accessToken => {
    isAuthenticated();
    issueAccessToken(accessToken);
    history.push('/');
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

  //* 회원탈퇴
  const handleWithdrawl = () => {
    console.log('clicked?');
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/properties`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        axios.defaults.headers.common[
          'authorization'
        ] = `Bearer ${accessToken}`;
        setUserinfo({
          title: '',
          total_message: '',
          email: '',
          nickname: '',
        });
        setIsLogin(false);
        alert('정상적으로 처리되었습니다.');
      });
  };

  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

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
            <Userinfo />
          </Route>
          <Route path="/posts">
            <Rollingpaper
              isLogin={isLogin}
              userinfo={userinfo}
              handleLogout={handleLogout}
              handleWithdrawl={handleWithdrawl}
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
