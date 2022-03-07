import React, { useEffect } from 'react';

export default function Message({ list, index }) {
  // 색깔 배열 만들기
  // 인덱스 임의로 추출하기

  const number = ['1/2', '1/3', '1/4', '2/3', '40'];
  const getRandomIdx = () => parseInt(Math.random() * number.length);
  const randomNum = number[getRandomIdx()];
  console.log(randomNum);
  const rotate = parseInt(randomNum);

  const parsedDate = new Date(list.created_at).toLocaleDateString('ko-kr');
  return (
    <li>
      {index >= 7 ? (
        <div
          className={`relative rotate-12 bottom-1/2 hover:translate-x-full duration-1000 ease-in-out mx-4 bg-amber-100 shadow-xl w-72 h-64`}
        >
          <div className="m-5">
            <br></br>
            <span className="">작성자</span>
            <span>2020.2.22</span>
            <p className="font-cursive text-2xl">zz?</p>
          </div>
        </div>
      ) : (
        <div
          className={`relative hover:translate-y-full duration-1000 ease-in-out mx-4 bg-amber-100 shadow-xl w-72 h-64`}
        >
          <div className="m-5">
            <br></br>
            <span className="">작성자</span>
            <span>2020.2.22</span>
            <p className="font-cursive text-2xl">안녕 반갑구나?</p>
          </div>
        </div>
      )}
    </li>
  );
}
