import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Notification from '../components/Notification';

export default function Signup() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirm: '',
    nickname: '',
  });

  const handleInputValue = key => e => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  // 비밀번호 일치 확인
  const passwordMatch = () => {
    const { password, confirm } = userInfo;
    return password === confirm;
  };

  // 비밀번호 보안 강화
  const strongPassword = str => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  };

  const passwordHandler = () => {
    console.log(strongPassword(userInfo.password));
    if (!strongPassword(userInfo.password)) {
      setErrorMsg2(
        '최소 8자 이상, 알파벳과 숫자 및 특수문자는 하나 이상 포함하세요.'
      );
    }
    if (strongPassword(userInfo.password)) {
      setErrorMsg2('');
    }

    if (!passwordMatch()) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    } else {
      setErrorMsg('');
    }
  };

  useEffect(() => {
    passwordHandler();
  });

  const handleSignup = () => {
    const { email, password, confirm, nickname } = userInfo;
    if (!passwordMatch() || !strongPassword(password)) {
      return setShowNotification(true);
    }

    if (!email || !password || !confirm) {
      return setShowNotification(true);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signup`,
        {
          email,
          password,
          nickname,
        },
        { headers: { 'Content-Type': 'application / json' } }
      )
      .then(respond => {
        if (respond.data.message === 'ok') {
          history.push('/');
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24"></div>
        <div className="flex flex-col px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <h1 className="font-bold text-center text-6xl sm:text-3xl text-gray-800 leading-tight mt-4">
            Sign Up
            <br />
          </h1>
          <div className="relative p-6 flex-auto">
            <div className="mb-3 relative ">
              <label htmlFor="required-email" className="text-gray-700">
                E-mail
                <span className="text-red-500 required-dot"> *</span>
              </label>
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="email"
                placeholder="email"
                onChange={handleInputValue('email')}
              />
            </div>
            <div className="mb-1 relative">
              <label htmlFor="required-email" className="text-gray-700 mt-10">
                Password
                <span className="text-red-500 required-dot"> *</span>
              </label>
              <input
                type="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="password"
                placeholder="password"
                onChange={handleInputValue('password')}
              />
            </div>
            <span className="text-red-500 text-sm">{errorMsg2}</span>
            <div className="mb-1 relative">
              <label className="text-gray-700 mt-10">
                Confirm Password
                <span className="text-red-500 required-dot"> *</span>
              </label>
              <input
                type="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="password"
                placeholder="password"
                onChange={handleInputValue('confirm')}
              />
            </div>
            <span className="text-red-500 text-sm">{errorMsg}</span>
            <div className="mb-3 relative ">
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="name"
                placeholder="name"
                onChange={handleInputValue('nickname')}
              />
            </div>
            <button
              onClick={handleSignup}
              className="w-full bg-blue-700 transition ease-in duration-150 hover:bg-blue-800 py-2 px-4 rounded-lg text-lg text-white font-bold uppercase mt-5"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen shadow-lg">
        <img
          className="object-cover h-screen md:block opacity-80"
          src="/img/signup.svg"
        />
      </div>
      {showNotification ? (
        <Notification
          setShowNotification={setShowNotification}
          content="올바른 사용자 정보를 입력해주세요."
        ></Notification>
      ) : null}
    </div>
  );
}
