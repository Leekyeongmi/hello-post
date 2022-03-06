import React from 'react';

export default function Message({ list }) {
  const parsedDate = new Date(list.created_at).toLocaleDateString('ko-kr');
  console.log(list);
  return (
    <li className="li">
      <div className="div">
        <span className="username">{list.writer}</span>
        <span>{parsedDate}</span>
        <div className="div-one">{list.content}</div>
      </div>
    </li>
  );
}
