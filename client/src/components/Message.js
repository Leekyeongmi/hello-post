import React, { useEffect } from 'react';

export default function Message({ message, index, list }) {
  const parsedDate = new Date(message.createdAt).toLocaleDateString('ko-kr');
  return (
    <li>
      <div
        className={`${
          index % 7 === 0
            ? `rotate-[3deg] bg-red-50 z-50`
            : index % 5 === 0
            ? `rotate-[10deg] bg-lime-50 z-40`
            : index % 4 === 0
            ? `rotate-[-10deg] bg-amber-100 z-30`
            : index % 2 === 0
            ? `rotate-[-15deg] bg-violet-50 z-20`
            : `rotate-[3deg] bg-gray-50 z-10`
        } hover:z-50 overflow-hidden hover:overflow-y-auto opacity-90 shadow-2xl w-64 h-64 rounded-2xl mx-auto my-auto relative duration-1000 ease-in-out mt-8`}
      >
        {index === list.length - 1 ? (
          <span className="absolute bg-red-500 top-0 right-0 text-white text-xs">
            NEW
          </span>
        ) : null}
        <div className="p-5">
          <div className="mb-1 flex justify-between">
            <span className="text-base text-gray-800 font-medium underline">
              {message.username}
            </span>
            <span className="text-gray-700 text-base">{parsedDate}</span>
          </div>

          <div>
            <p className="font-cursive text-base">{message.content}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
