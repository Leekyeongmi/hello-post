import React, { useEffect, useState } from 'react';
import Message from '../components/Message';
// import dummy from '../static/dummyData';
import Navbar from '../components/Navbar';
import WriteMessage from '../components/WriteMessage';
import axios from 'axios';

export default function Rollingpaper() {
  const [showModal, setShowModal] = useState(false);
  // const [tt, tT] = useState(dummy);

  useEffect(() => {
    setList(list);
  }, []);

  const [list, setList] = useState({
    title: '',
    total_message: '',
    messages: [
      {
        content: '',
        writer: '',
        created_at: new Date(),
      },
    ],
  });

  axios
    .get('https://localhost/5500/posts/${uid}', {
      headers: {
        authorization: { 'Content-Type': 'application/json' },
      },
    })
    .then(res => {
      setList({
        title: res.data.list.title,
        total_message: res.data.list.total_message,
        messages: {
          content: res.data.list.messages.content,
          writer: res.data.list.messages.writer,
          created_at: res.data.list.messages.created_at,
        },
      });
    });

  return (
    <main className="mt-5">
      <Navbar tt={list.total_message}></Navbar>
      <img
        className="absolute bottom-2 left-2 w-1/3 opacity-90"
        src="img/clumsy.svg"
      ></img>
      <ul>
        {list.messages.map((a, index) => {
          return (
            <li key={index}>
              <Message list={a} key={index} />
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => setShowModal(true)}
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
      {showModal ? (
        <WriteMessage setShowModal={setShowModal}></WriteMessage>
      ) : null}
    </main>
  );
}
