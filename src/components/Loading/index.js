import React from 'react';
import PropTypes from 'prop-types';

const LoadingWrapper = ({ loading, renderLoading, renderDiv }) =>
  (loading ? renderLoading() : renderDiv());

export const Loading = () => (
  <div>
    <div className="loadingIcon" />
    <div className="loadingText">Gathering Data</div>
  </div>
);

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  renderLoading: PropTypes.func,
  renderDiv: PropTypes.func,
};
export default LoadingWrapper;
