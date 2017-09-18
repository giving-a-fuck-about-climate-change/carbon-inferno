import React from 'react';
import PropTypes from 'prop-types';

const loadingStyle = { opacity: '.5' };
const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return <div style={loadingStyle}>{children}</div>;
  }
  return <div>{children}</div>;
};

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node, //eslint-disable-line
};
export default LoadingWrapper;
