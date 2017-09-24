import React from 'react';
import PropTypes from 'prop-types';

// figure +20
export const Line = ({ className, x1, x2, y1, y2 }) => (
  <line className={className} x1={x1} y1={y1} x2={x2} y2={y2 + 20} />
);
Line.propTypes = {
  x1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  className: PropTypes.string,
};
Line.defaultProps = {
  className: 'hoverLine',
  yLoc: 50, // TODO: Why -8 ???
};
export default Line;
