import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ className, href, text, onClick }) => (
  <li className={className}>
    {href ? (
      <a onClick={onClick} href={href}>
        {text}
      </a>
    ) : (
      text
    )}
  </li>
);
ListItem.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func, //eslint-disable-line
};
export default ListItem;
