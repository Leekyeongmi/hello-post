import React, { useState } from 'react';
import axios from 'axios';

export default function WriteMessage({ setShowWrite }) {
  // 메세지 작성자, 이름 스테이트
  // 메세지 인풋 핸들러
  // 작성 내용 서버에 전송하기

  const [msg, setMsg] = useState({
    owner_id: '',
    message: '',
    writer: '',
  });

  const handleInputValue = key => e => {
    setMsg({ ...msg, [key]: e.target.value });
  };

  const SendMessage = () => {
    axios
      .post('https://localhost/5500/posts/message', {
        headers: {
          authorization: { 'Content-Type': 'application/json' },
        },
      })
      .then(res => {
        setMsg({
          owner_id: res.data.msg.owner_id,
          message: res.data.msg.message,
          writer: res.data.msg.writer,
        });
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
              <h3 className="text-2xl text-gray-800 font-semibold">
                Rollingpaper
              </h3>
              <button
                className="p-1 ml-5 bg-transparent text-gray float-right text-3xl leading-none  focus:outline-none"
                onClick={() => setShowWrite(false)}
              >
                <span className="absolute bg-transparent text-4xl leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="mb-3 relative ">
                <label className="text-gray-700">
                  Name
                  <span className="text-red-500 required-dot"> *</span>
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
                  <span className="text-red-500 required-dot"> *</span>
                </label>
                <textarea
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Love what you do!"
                  rows="5"
                  cols="40"
                  onChange={handleInputValue('message')}
                ></textarea>
              </div>
            </div>
            {/* footer*/}
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
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
