import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signin from '../components/Signin';

export default function Login({ isLogin, handleResponseSuccess, setUserId }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="overflow-hidden h-screen bg-amber-50">
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 md:px-12 py-4">
          <div className="md:flex justify-between items-center">
            <div className="flex justify-between items-center"></div>
            <div className="hidden md:flex items-center">
              <a className="text-lg uppercase mx-3 text-gray-800 cursor-pointer hover:underline">
                About Us
              </a>
            </div>
          </div>
        </nav>
      </header>
      <div
        className="left-8
       bottom-5 container mx-auto px-6 md:pzx-12 relative z-10 flex items-center py-32 xl:py-40"
      >
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <span className="font-bold text-base uppercase mx-1 text-yellow-400">
            Hello-Post
          </span>
          <h1 className="font-bold text-6xl sm:text-7xl text-gray-900 leading-tight mt-4">
            Lets Rollingpaper!
            <br />
          </h1>
          <p className="text-lg uppercase text-gray-900 mt-5">
            사랑하는 사람을 위한,
            <br />
            가나다라 마바사 글자 테스트!
          </p>
          <button
            className="block bg-blue-700 transition ease-in duration-150 hover:bg-blue-800 py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10"
            onClick={() => setShowModal(true)}
          >
            SIGN IN
          </button>
          {showModal ? (
            <Signin
              isLogin={isLogin}
              setUserId={setUserId}
              handleResponseSuccess={handleResponseSuccess}
              setShowModal={setShowModal}
            ></Signin>
          ) : null}
          <div className="text-lg uppercase text-gray cursor-pointer hover:underline mt-5">
            <Link to="/signup">아직 아이디가 없으신가요?</Link>
          </div>
        </div>
      </div>
      <img
        src="img/test.svg"
        className="absolute bottom-12 right-0 w-3/5 h-4/5 opacity-90"
      />
    </div>
  );
}
