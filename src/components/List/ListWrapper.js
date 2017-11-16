import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';
import { ALL } from '../../constants';

const ListWrapper = ({ className, items }) => (
  <div className={className}>
    <ul>
      {items.map((item, index) => (
        <ListItem
          key={`item.text-${index}`}
          className={item.className}
          href={item.href}
          text={item.text}
        />
      ))}
    </ul>
  </div>
);
ListWrapper.defaultProps = {
  items: [],
};
ListWrapper.propTypes = {
	className: PropTypes.string, //eslint-disable-line
	items: PropTypes.array, //eslint-disable-line
};
// create defaultSelected prop
// alue of defaultSelected prop = "ALL"
// in constructor map over items update className for item if type = all

export class ActiveListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items.map((item) => {
        if (item.type === props.defaultSelected) {
          item.className = 'selected';
          return item;
        }
        return item;
      }),
    };
  }

 updateItem = (type, submitClick) => (event) => {
   event.preventDefault();
   this.state.items.map((item) => {
     if (item.type === type) {
       item.className = 'selected';
       return item;
     }
     item.className = '';
     return item;
   });
   submitClick(event);
 };

 render() {
   return (
     <div className={this.props.className}>
       <ul>
         {this.state.items.map((item, index) => (
           <ListItem
             key={`item.text-${index}`}
             className={item.className}
             href={item.href}
             text={item.text}
             onClick={this.updateItem(item.type, item.onClick)}
           />
         ))}
       </ul>
     </div>
   );
 }
}

ActiveListWrapper.propTypes = {
  className: PropTypes.string.isRequired,
	items: PropTypes.array, //eslint-disable-line
};

ActiveListWrapper.defaultProps = {
  items: [],
  defaultSelected: ALL,
};

export default ListWrapper;
