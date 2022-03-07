import React from 'react';

export default function Message({ list }) {
  const parsedDate = new Date(list.created_at).toLocaleDateString('ko-kr');
  return (
    <li>
      <div className="bg-amber-100 shadow-xl w-72 h-72 ">
        <span>{list.writer}</span>
        <span>{parsedDate}</span>
        <div>{list.content}</div>
      </div>
    </li>
  );
}
