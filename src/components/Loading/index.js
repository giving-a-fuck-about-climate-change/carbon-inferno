import React from 'react';

const loadingStyle = { opacity: '.5' };
const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return (
      <div style={loadingStyle}>
        {children}
      </div>
    );
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default LoadingWrapper;
