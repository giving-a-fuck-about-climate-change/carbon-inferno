import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = ({ hoverLoc, text, width, className }) => {
  const placementStyles = {
    width: `${width}px`,
    left: hoverLoc - width / 2, //eslint-disable-line
  };

  return (
    <div className={`hover ${className}`} style={{ ...placementStyles }}>
      <div className="ppm">{text}</div>
    </div>
  );
};
ToolTip.propTypes = {
  hoverLoc: PropTypes.number.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.number,
  className: PropTypes.string,
};
ToolTip.defaultProps = {
  width: 125,
  className: '',
};
export default ToolTip;
