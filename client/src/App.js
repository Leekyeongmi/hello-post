import React, { useEffect, useState } from 'react';
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

function App() {
  // 서버연결 확인코드
  useEffect(() => {
    axiosTest();
  });
  const axiosTest = () => {
    axios
      .get('http://localhost:5500')
      .then(res => console.log(res.data).catch(err => console.log(err)));
  };

  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const history = useHistory();

  const isAuthenticated = () => {
    setIsLogin(true);
    setUserinfo('hello');
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
    history.push('/');
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <Login
              isLogin={isLogin}
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
            {isLogin ? <Redirect to="/posts" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
