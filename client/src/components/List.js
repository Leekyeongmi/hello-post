import React from 'react';
import './List.css';
import PropTypes from 'prop-types';

const List = ({ list }) => {
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
};

List.propTypes = {
  list: PropTypes.string.isRequired,
};

export default List;
