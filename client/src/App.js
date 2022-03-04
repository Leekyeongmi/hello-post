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
import './app.css';

function App() {
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
