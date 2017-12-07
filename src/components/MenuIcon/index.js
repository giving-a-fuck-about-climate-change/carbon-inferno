import React from 'react';
import PropTypes from 'prop-types';

const MenuIcon = ({ onClick, icon }) => (
  <div role="button" tabIndex={0} onClick={onClick}>
    {icon}
  </div>
);

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};
export default MenuIcon;
