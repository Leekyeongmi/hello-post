import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Notification from '../components/Notification';

axios.defaults.withCredentials = true;

export default function Userinfo({ userinfo, accessToken, setUserinfo }) {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg2, setErrorMsg2] = useState('');
  const [errorMsg3, setErrorMsg3] = useState('');
  const [userInfo, setUserInfo] = useState({
    password: '',
    confirm: '',
    nickname: userinfo.nickname,
    title: userinfo.title,
  });
  const [showNotification, setShowNotification] = useState(false);

  const passwordMatch = () => {
    const { password, confirm } = userInfo;
    return password === confirm;
  };

  const strongPassword = str => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      str
    );
  };

  const passwordHandler = () => {
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

  const handleUserinfo = () => {
    const { password, confirm, nickname, title } = userInfo;

    if (!password || !confirm || !title) {
      return setErrorMsg3('필수항목을 모두 입력해주세요.');
    }

    if (!passwordMatch() || !strongPassword(password)) {
      return setErrorMsg3('사용자 정보를 올바르게 입력해주세요.');
    }

    setErrorMsg3('');

    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/users/properties`,
        {
          nickname: nickname,
          password: password,
          title: title,
        },
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(respond => {
        if (respond.data.message === 'ok') {
          alert('회원정보 수정이 완료되었습니다.');
          setUserinfo({ ...userinfo, nickname, title });
          history.push('/');
        }
      })
      .catch(error => console.log(error));
  };
  const handleInputValue = key => e => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <h1 className="font-bold text-center text-6xl sm:text-3xl text-gray-800 leading-tight mt-4">
            User Info
          </h1>
          <div className="relative p-6 flex-auto">
            <div className="mb-3 relative ">
              <label className="text-gray-700">Name</label>
              <input
                type="text"
                value={userInfo.nickname}
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                placeholder="name"
                onChange={handleInputValue('nickname')}
              />
            </div>
            <div className="mb-1 relative">
              <label className="text-gray-700 mt-10">
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
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="password"
                placeholder="password"
                onChange={handleInputValue('confirm')}
              />
            </div>
            <span className="text-red-500 text-sm">{errorMsg}</span>

            <div className="mb-3 relative ">
              <label className="text-gray-700">Rollingpaper&apos;s title</label>
              <input
                type="text"
                value={userInfo.title}
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                placeholder="title"
                onChange={handleInputValue('title')}
              />
            </div>
            <span className="text-gray-800 text-base">{errorMsg3}</span>
            <div className="flex items-center justify-between gap-4 w-full mt-5">
              <button
                onClick={handleUserinfo}
                className="w-full bg-blue-700 transition ease-in duration-150 hover:bg-blue-800 py-2 px-4 rounded-lg text-lg text-white font-bold uppercase mt-5"
              >
                update
              </button>
              <button
                onClick={() => history.push('/')}
                className="w-full bg-white transition ease-in duration-150 hover:bg-gray-100 py-2 px-4 rounded-lg text-lg text-white font-bold uppercase mt-5 text-blue-500 text-white w-full text-center text-base font-semibold shadow-md"
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen shadow-lg">
        <img
          className="object-cover h-screen md:block opacity-80"
          src="/img/userinfo.svg"
        />
      </div>
      {showNotification ? (
        <Notification
          content="회원 정보 수정이 완료되었습니다."
          setShowNotification={setShowNotification}
        ></Notification>
      ) : null}
    </div>
  );
}
