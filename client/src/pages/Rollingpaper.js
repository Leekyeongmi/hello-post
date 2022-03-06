import React, { useEffect, useState } from 'react';
import Message from '../components/Message';
import dummy from '../static/dummyData';
import Navbar from '../components/Navbar';
import WriteMessage from '../components/WriteMessage';
import Sidemenu from '../components/Sidemenu';

export default function Rollingpaper({ isLogin, userinfo }) {
  const [showWrite, setShowWrite] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);

  const [tt, tT] = useState(dummy);

  useEffect(() => {
    tT(dummy);
  }, []);

  return (
    <div className="h-screen bg-amber-50">
      <main className="">
        <Navbar
          tt={tt}
          showSidemenu={showSidemenu}
          setShowSidemenu={setShowSidemenu}
        ></Navbar>
        <img
          className="absolute bottom-5 left-1/4 w-1/2 opacity-20"
          src="img/doodle.svg"
        ></img>
        {/* <ul>
          {tt.map((a, index) => {
            return (
              <li key={index}>
                <Message list={a} key={a.id} />
              </li>
            );
          })}
        </ul> */}
        <button
          onClick={() => setShowWrite(true)}
          className="absolute bg-blue-600 text-white right-5 bottom-5 items-center p-4 transition ease-in duration-200 uppercase rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 hover:opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        {showWrite ? (
          <WriteMessage setShowWrite={setShowWrite}></WriteMessage>
        ) : null}
      </main>
      <div onClick={() => setShowSidemenu(false)}>
        <div>
          {showSidemenu ? (
            <Sidemenu
              isLogin={isLogin}
              setShowSidemenu={setShowSidemenu}
              userinfo={userinfo}
            ></Sidemenu>
          ) : null}
        </div>
      </div>
    </div>
  );
}
