import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Signin({
  setUserId,
  handleResponseSuccess,
  setShowModal,
}) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {});

  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    const { email, password } = loginInfo;

    if (!email || !password) {
      return setErrMessage('아이디와 비밀번호를 모두 입력해주세요.');
    } else {
      setErrMessage('');
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signin`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        }
      )
      .then(res => {
        setUserId(res.data.uid);
        handleResponseSuccess(res.data.accessToken);
      })
      .catch(err => {
        setLoginInfo({
          email: '',
          password: '',
        });
        // 상태코드 확인 필요
        if (err.response.status === 401) {
          alert('이름과 비밀번호를 정확히 입력해주세요!');
        }
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl text-gray-800 font-semibold">Sign In</h3>
              <button
                className="p-1 ml-5 bg-transparent text-gray float-right text-3xl leading-none  focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="absolute bg-transparent text-4xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/* body*/}
            <div className="relative p-6 flex-auto">
              <div className="mb-3 relative ">
                <label htmlFor="required-email" className="text-gray-700">
                  E-mail
                  <span className="text-red-500 required-dot"> *</span>
                </label>
                <input
                  type="text"
                  id="required-email"
                  className="required rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="email"
                  placeholder="email"
                  onChange={handleInputValue('email')}
                />
              </div>
              <div className="relative">
                <label htmlFor="required-email" className="text-gray-700 mt-10">
                  Password
                  <span className="text-red-500 required-dot"> *</span>
                </label>
                <input
                  type="password"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="password"
                  placeholder="password"
                  onChange={handleInputValue('password')}
                />
                <p className="text-base uppercase text-red-500 mt-5">
                  {errMessage}
                </p>
              </div>
            </div>
            {/* footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="block w-full bg-blue-700 transition ease-in duration-150 hover:bg-blue-800 py-2 px-4 rounded-lg text-lg text-white font-bold uppercase"
                type="button"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
