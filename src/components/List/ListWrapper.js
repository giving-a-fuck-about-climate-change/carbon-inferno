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
  className: '',
};
ListWrapper.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any),
};

export const updateItem = (currentType, items = []) =>
  items.map(
    item =>
      (item.type === currentType
        ? { ...item, className: 'selected' }
        : { ...item, className: '' }),
  );

export class ActiveListWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: updateItem(props.defaultSelected, props.items),
    };
  }

  setSelected = type => (event) => {
    event.preventDefault();
    const { items } = this.state;
    this.setState({ items: updateItem(type, items) }, () =>
      this.props.onClick(type),
    );
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
              onClick={this.setSelected(item.type)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ActiveListWrapper.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func,
  defaultSelected: PropTypes.string,
};

ActiveListWrapper.defaultProps = {
  items: [],
  defaultSelected: ALL,
  onClick: () => {},
  className: '',
};

export default ListWrapper;
