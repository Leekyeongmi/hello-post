import React, { useState } from 'react';
import axios from 'axios';

export default function Signin({ handleResponseSuccess, setShowModal }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleInputValue = key => e => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    const { email, password } = loginInfo;

    axios
      .post(
        'http://localhost:5500/users/signin',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(res => {
        handleResponseSuccess();
      })
      .catch(err => console.log(err));
  };
  // 서버로부터 성공 응답 : 롤링페이퍼 페이지로 유저아이디를 받아 리디렉션해준다.
  // 서버로부터 실패 응답 : 실패 안내창을 띄워야 한다.
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/* content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">SIGN IN</h3>
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
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  name="email"
                  placeholder="email"
                  onChange={() => handleInputValue('email')}
                />
              </div>
              <div className="mb-3 relative">
                <label htmlFor="required-email" className="text-gray-700 mt-10">
                  Password
                  <span className="text-red-500 required-dot"> *</span>
                </label>
                <input
                  type="password"
                  id="required-email"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                  name="password"
                  placeholder="password"
                  onChange={() => handleInputValue('password')}
                />
              </div>
            </div>
            {/* footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="block bg-gray-800 transition ease-in duration-150 hover:bg-white hover:text-gray-800 hover:outline py-2 px-4 rounded-lg text-lg text-white font-bold uppercase"
                type="button"
                onClick={() => handleLogin}
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
