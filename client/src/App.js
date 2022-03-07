import React, { useState } from 'react';
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
import axios from 'axios';
import './app.css';

axios.defaults.withCredentials = true;

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);
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
        if (respond.data.message === 'ok') {
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
      .delete(`${process.env.REACT_APP_API_URL}/signout`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(res => {
        setUserinfo(null);
        setIsLogin(false);
        history.push('/');
      })
      .catch(error => console.log(error));
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
          <Route path="/posts">
            <Rollingpaper
              isLogin={isLogin}
              userinfo={userinfo}
              handleLogout={handleLogout}
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
