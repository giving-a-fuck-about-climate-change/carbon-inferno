import React from 'react';
import PropTypes from 'prop-types';
import './loading.css';

export const LoadingWrapper = ({ loading, renderLoading, renderDiv }) =>
  (loading ? renderLoading() : renderDiv());

export const Loading = () => (
  <div>
    <img className="loadingIcon" src="/skull-grey.png" alt="Loading" />
    <div className="loadingText">Gathering Data</div>
  </div>
);

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  renderLoading: PropTypes.func,
  renderDiv: PropTypes.func,
};
export default LoadingWrapper;
