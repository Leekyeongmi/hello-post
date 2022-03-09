import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Userinfo({ userinfo }) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    password: '',
    nickname: userinfo.nickname,
    title: userinfo.title,
  });
  const handleUserinfo = () => {
    const { email, password, title } = userInfo;
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/users/properties`,
        {
          nickname: email,
          password: password,
          title: title,
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
                onChange={handleInputValue('email')}
              />
            </div>
            <div className="mb-3 relative">
              <label className="text-gray-700 mt-10">Password</label>
              <input
                type="password"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                placeholder="password"
                onChange={handleInputValue('password')}
              />
            </div>

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
    </div>
  );
}
