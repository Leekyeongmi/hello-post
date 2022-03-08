import React, { useEffect } from 'react';

export default function Message({ list, index, array }) {
  const parsedDate = new Date(list.created_at).toLocaleDateString('ko-kr');
  return (
    <li>
      <div
        className={`${
          index % 7 === 0
            ? `rotate-[4deg] bg-red-50 z-50`
            : index % 5 === 0
            ? `rotate-[2deg] bg-lime-50 z-40`
            : index % 4 === 0
            ? `rotate-[7deg] bg-amber-100 z-30`
            : index % 2 === 0
            ? `rotate-[8deg] bg-violet-50 z-20`
            : `rotate-[3deg] bg-gray-50 z-10`
        } ${
          index % 2 === 0 ? 'hover:translate-y-40' : 'hover:translate-x-full'
        } opacity-90 shadow-2xl w-64 h-64 rounded-2xl mx-auto my-auto relative duration-1000 ease-in-out`}
      >
        <div className="m-5">
          <br></br>
          <span className="">작성자</span>
          <span>2020.2.22</span>
          {index === array.length - 1 ? (
            <span className="ml-20 text-red-500">NEW</span>
          ) : null}
          <p className="font-cursive text-2xl">안녕 반갑구나?</p>
        </div>
      </div>
    </li>
  );
}

// const number = ['1/2', '1/3', '1/4', '2/3', '40'];
// const getRandomIdx = () => parseInt(Math.random() * number.length);
// const randomNum = number[getRandomIdx()];
// const rotate = parseInt(randomNum);
