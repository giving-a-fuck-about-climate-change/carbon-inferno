import React from 'react';
import PropTypes from 'prop-types';

const LoadingWrapper = ({ loading, renderLoading, renderDiv }) => {
  if (loading) {
    return renderLoading();
  }
  return renderDiv();
};

export const Loading = () => (
  <div>
    <div className="loadingIcon" />
    <div className="loadingText">Gathering Data</div>
  </div>
);

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
	renderLoading: PropTypes.func, //eslint-disable-line
	renderDiv: PropTypes.func, //eslint-disable-line
};
export default LoadingWrapper;
