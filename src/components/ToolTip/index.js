import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = ({ hoverLoc, text, className, viewBoxWidth }) => {
  const width = viewBoxWidth / 8;
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
  className: PropTypes.string,
  viewBoxWidth: PropTypes.number,
};
ToolTip.defaultProps = {
  viewBoxWidth: 100,
  className: '',
  toolTipRatio: 8, // tooltip will always be 8 times smaller in length than the chart
};
export default ToolTip;
