import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListItem = ({ className, href, text, onClick }) => (
  <li className={className}>
    {href ? (
      <Link className="item-class" onClick={onClick} to={href}>
        {text}
      </Link>
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
