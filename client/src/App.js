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

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState();
  const [userinfo, setUserinfo] = useState(null);
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
          <Route exact path="/posts">
            <Rollingpaper userinfo={userinfo} />
          </Route>
          <Route path="/">
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
