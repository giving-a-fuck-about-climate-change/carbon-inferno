import React from 'react';
import ListItem from './ListItem';

const ListWrapper = ({ className, items}) => {
  return (
    <div className={className}>
      <ul>
        {items.map((item) => {
          return (
            <ListItem item= {item}/>
          );
        })}
      </ul>
    </div>
  );
}


export default ListWrapper;
