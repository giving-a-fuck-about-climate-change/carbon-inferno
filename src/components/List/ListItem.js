import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ className, href, text, onClick }) => (
  <li className={className}>
    {href ? (
      <a className="item-class" onClick={onClick} href={href}>
        {text}
      </a>
    ) : (
      text
    )}
  </li>
);
ListItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};
ListItem.defaultProps = {
  className: '',
  text: '',
  href: '',
  onClick: () => {},
};
export default ListItem;
