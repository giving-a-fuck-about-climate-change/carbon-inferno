import React from 'react';
import PropTypes from 'prop-types';
import './ToolTip.css';

const ToolTip = ({
  hoverLoc,
  text,
  documentDependency,
  classToFind,
  width,
}) => {
  const svgLocation = documentDependency
    .getElementsByClassName(classToFind)[0]
    .getBoundingClientRect();
  const placementStyles = {
    width: `${width}px`,
    left: hoverLoc + svgLocation.left,
  };
  return (
    <div className="hover" style={placementStyles}>
      <div className="ppm">{text}</div>
    </div>
  );
};
ToolTip.propTypes = {
  hoverLoc: PropTypes.number.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  documentDependency: PropTypes.object, //eslint-disable-line
  classToFind: PropTypes.string,
  width: PropTypes.number,
};
ToolTip.defaultProps = {
  documentDependency: document, // dependency injection (makes it easier to test)
  classToFind: 'linechart',
  width: 150,
};
export default ToolTip;
