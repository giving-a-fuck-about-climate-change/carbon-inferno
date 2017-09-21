import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = (props) => {
  const { hoverLoc, activePoint } = props;
  // TODO: {Type:GrpahLib} Make a helper function for this :)
  const svgLocation = document
    .getElementsByClassName('linechart')[0]
    .getBoundingClientRect();

  const placementStyles = {};
  const width = 100;
  const hoverLocLeft = hoverLoc + svgLocation.left;
  const halfWidth = width / 2;

  placementStyles.width = `${width}px`;
  placementStyles.left = hoverLocLeft - halfWidth;
  return (
    <div className="hover" style={placementStyles}>
      <div className="date">{activePoint.d}</div>
      <div className="price">{activePoint.p} ppm</div>
    </div>
  );
};
ToolTip.propTypes = {
  hoverLoc: PropTypes.number.isRequired,
  activePoint: PropTypes.object.isRequired, //eslint-disable-line
};

export default ToolTip;
