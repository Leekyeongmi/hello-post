import React from 'react';

export default function Message({ list }) {
  const parsedDate = new Date(list.createdAt).toLocaleDateString('ko-kr');

  return (
    <li className="li" id={list.id}>
      <div className="div">
        <span className="username">{list.username}</span>
        <span>{parsedDate}</span>
        <div className="div-one">{list.content}</div>
      </div>
    </li>
  );
}
