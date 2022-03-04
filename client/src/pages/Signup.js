import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Signup() {
  const history = useHistory();
  const [userinfo, setuserinfo] = useState({
    email: '',
    password: '',
    username: '',
  });
  const handleInputValue = key => e => {
    setuserinfo({ ...userinfo, [key]: e.target.value });
  };
  return (
    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24"></div>
        <div className="flex flex-col px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <h1 className="font-bold text-center text-6xl sm:text-3xl text-gray leading-tight mt-4">
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
            <div className="mb-3 relative">
              <label htmlFor="required-email" className="text-gray-700 mt-10">
                Confirm Password
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
            <div className="mb-3 relative ">
              <label htmlFor="required-email" className="text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="required-email"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="name"
                placeholder="name"
                onChange={() => handleInputValue('email')}
              />
            </div>
            <button className="w-full bg-gray-800 transition ease-in duration-150 hover:bg-white hover:text-gray-800 hover:outline py-2 px-4 rounded-lg text-lg text-white font-bold uppercase mt-5">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-screen shadow-lg">
        <img
          className="object-cover h-screen md:block opacity-90"
          src="/img/jumping.svg"
        />
      </div>
    </div>
  );
}
