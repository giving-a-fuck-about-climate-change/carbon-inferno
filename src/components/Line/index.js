import React from 'react';
import PropTypes from 'prop-types';

export const Line = ({ className, x1, x2, y1, y2 }) => (
  <line className={className} x1={x1} x2={x2} y1={y1} y2={y2} />
);
Line.propTypes = {
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
  className: PropTypes.string,
};
Line.defaultProps = {
  className: 'hoverLine',
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
};
export default Line;
