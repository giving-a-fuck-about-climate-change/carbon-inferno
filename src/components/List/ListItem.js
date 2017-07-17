import React from 'react';

const ListItem = ({ item }) => {
  return (
    <li className={item.className}>
      {item.href ? <a href={item.href}>{item.text}</a> : item.text}
    </li>
  );
}

export default ListItem;
