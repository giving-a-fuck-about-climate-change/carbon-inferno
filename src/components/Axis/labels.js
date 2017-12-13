import React from 'react';
import PropTypes from 'prop-types';
// TODO Pass values not functions
const AxisLabels = ({ yLabelSize, minY, maxY, className, padding }) => (
  <g className={className}>
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, 20)`}
      textAnchor="middle"
    >
      {`${maxY} PPM`}
    </text>
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, ${350 - padding})`}
      textAnchor="middle"
    >
      {`${minY} PPM`}
    </text>
  </g>
);
AxisLabels.propTypes = {
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  yLabelSize: PropTypes.number.isRequired,
  data: PropTypes.array, //eslint-disable-line
  className: PropTypes.string,
  padding: PropTypes.number,
};
AxisLabels.defaultProps = {
  className: 'linechart_label',
  xLabelSize: 20,
  yLabelSize: 80,
  padding: 5,
};
export default AxisLabels;
