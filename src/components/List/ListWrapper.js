import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from './ListItem';

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

export class ActiveListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
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
};

export default ListWrapper;
