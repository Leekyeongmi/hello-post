import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification';

export default function WriteMessage({ setShowWrite, location }) {
  const [msg, setMsg] = useState({
    owner_id: location.pathname.slice(7),
    message: '',
    writer: '',
  });

  const [showNotification, setShowNotification] = useState(false);

  const handleInputValue = key => e => {
    setMsg({ ...msg, [key]: e.target.value });
  };

  const SendMessage = () => {
    const { owner_id, message, writer } = msg;
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/posts/message`,
        {
          owner_id,
          message,
          writer,
        },
        {
          headers: {
            authorization: { 'Content-Type': 'application/json' },
          },
        }
      )
      .then(res => {
        if (res.data.message === '메세지 작성 완료') {
          setShowNotification(true);
          setShowWrite(false);
          //! 롤링페이퍼 출력 화면이 재렌더링이 되도록 한다.
        }
      });
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl text-gray-800 font-semibold">
                Rollingpaper
              </h3>
              <button
                className="p-1 ml-5 bg-transparent text-gray float-right text-2xl leading-none focus:outline-none"
                onClick={() => setShowWrite(false)}
              >
                <span className="absolute bg-transparent text-4xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="mb-3 relative">
                <label className="text-gray-700">
                  Name
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="name"
                  onChange={handleInputValue('writer')}
                />
              </div>
              <div className="relative">
                <label className="text-gray-700">
                  Message
                  <span className="text-red-500"> *</span>
                </label>
                <textarea
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Love what you do!"
                  rows="5"
                  cols="30"
                  onChange={handleInputValue('message')}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="block w-full bg-blue-700 transition ease-in duration-150 hover:bg-blue-800 py-2 px-4 rounded-lg text-lg text-white font-bold uppercase"
                type="button"
                onClick={SendMessage}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {showNotification ? (
        <Notification
          content="메시지 작성이 완료되었습니다."
          setShowNotification={setShowNotification}
        ></Notification>
      ) : null}
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
