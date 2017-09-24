import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = ({ hoverLoc, text }) => {
  // TODO: {Type:GrpahLib} Make a helper function for this ?
  const svgLocation = document
    .getElementsByClassName('linechart')[0]
    .getBoundingClientRect();
  const placementStyles = {};
  const width = 100;
  const hoverLocLeft = hoverLoc + svgLocation.left;
  const halfWidth = width / 2;

  placementStyles.width = `${150}px`;
  placementStyles.left = hoverLocLeft - halfWidth;
  return (
    <div className="hover" style={placementStyles}>
      <div className="ppm">{text}</div>
    </div>
  );
};
ToolTip.propTypes = {
  hoverLoc: PropTypes.number.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ToolTip;
