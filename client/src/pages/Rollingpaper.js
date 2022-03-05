import React, { useEffect, useState } from 'react';
import Message from '../components/Message';
import dummy from '../static/dummyData';
import Navbar from '../components/Navbar';

export default function Rollingpaper() {
  const [tt, tT] = useState(dummy);

  useEffect(() => {
    tT(dummy);
  }, []);

  return (
    <main>
      <Navbar tt={tt}></Navbar>
      <img
        className="absolute bottom-2 left-1 w-1/3 opacity-90"
        src="img/clumsy.png"
      ></img>
      <ul>
        {tt.map((a, index) => {
          return (
            <li key={index}>
              <Message list={a} key={a.id} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}
