import React from 'react';

const List = ({ className, href, text, onClick }) => {
  return (
    <li className={className}>
      {href ? <a onClick={onClick} href={href}>{text}</a> : text}
    </li>
  );
}

export default List;
