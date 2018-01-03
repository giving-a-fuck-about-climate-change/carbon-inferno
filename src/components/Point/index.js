import React from 'react';
import PropTypes from 'prop-types';

import './Point.css';

export const Point = ({ color, className, pointRadius, xCoord, yCoord }) => (
  <circle
    className={className}
    style={{ stroke: color }}
    r={pointRadius}
    cx={xCoord}
    cy={yCoord}
  />
);
Point.propTypes = {
  xCoord: PropTypes.number.isRequired,
  yCoord: PropTypes.number.isRequired,
  pointRadius: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Point.defaultProps = {
  className: 'linechart_point',
  color: '#1ba69c',
  pointRadius: 5,
};
export default Point;
