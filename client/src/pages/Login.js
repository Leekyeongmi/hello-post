import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Signin from '../components/Signin';

export default function Login({ isLogin, handleResponseSuccess }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="relative overflow-hidden h-screen">
      <img
        src="img/freetime.svg"
        className="absolute bottom-0 right-0 h-full w-full object-cover opacity-90"
      />
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 md:px-12 py-4">
          <div className="md:flex justify-between items-center">
            <div className="flex justify-between items-center">
              {/* <div className="md:hidden">
                <button className="text-white focus:outline-none">
                  <svg
                    className="h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div> */}
            </div>
            {/* <div className="hidden md:flex items-center">
              <a className="text-lg uppercase mx-3 text-gray-800 cursor-pointer hover:text-gray-300">
                About Us
              </a>
            </div> */}
          </div>
        </nav>
      </header>
      <div className="container mx-auto px-6 md:pzx-12 relative z-10 flex items-center py-32 xl:py-40">
        <div className="lg:w-3/5 xl:w-2/5 flex flex-col items-start relative z-10">
          <span className="font-bold uppercase mx-1 text-amber-400">
            Hello-Post
          </span>
          <h1 className="font-bold text-6xl sm:text-7xl text-gray leading-tight mt-4">
            Lets Rollingpaper!
            <br />
          </h1>
          <p className="text-lg uppercase text-black-900 mt-5">
            사랑하는 사람을 위한,
            <br />
            가나다라 마바사 글자 테스트!
          </p>
          <button
            className="block bg-gray-800 transition ease-in duration-150 hover:bg-white hover:text-gray-800 hover:outline py-3 px-4 rounded-lg text-lg text-white font-bold uppercase mt-10"
            onClick={() => setShowModal(true)}
          >
            SIGN IN
          </button>
          {showModal ? (
            <Signin
              isLogin={isLogin}
              handleResponseSuccess={handleResponseSuccess}
              setShowModal={setShowModal}
            ></Signin>
          ) : null}
          <div className="text-lg uppercase text-gray cursor-pointer hover:underline mt-5">
            <Link to="/signup">아직 아이디가 없으신가요?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
