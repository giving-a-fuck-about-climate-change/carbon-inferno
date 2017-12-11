import React from 'react';
import PropTypes from 'prop-types';

const ShouldShow = Comp => (props) => {
  const { shouldShow, children, ...rest } = props;
  return shouldShow ? <Comp {...rest} /> : null;
};
ShouldShow.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default ShouldShow;
