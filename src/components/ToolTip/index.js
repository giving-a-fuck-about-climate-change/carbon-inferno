import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = ({ hoverLoc, text, width, style }) => {
  const placementStyles = {
    width: `${width}px`,
		left: hoverLoc - width / 2, //eslint-disable-line
  };

  return (
    <div className="hover" style={{ ...placementStyles, ...style }}>
      <div className="ppm">{text}</div>
    </div>
  );
};
ToolTip.propTypes = {
  hoverLoc: PropTypes.number.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.number,
	style: PropTypes.object, //eslint-disable-line
};
ToolTip.defaultProps = {
  width: 125,
};
export default ToolTip;
