import React from 'react';
import PropTypes from 'prop-types';

const AxisLabels = ({ yLabelSize, getMinY, getMaxY, className, padding }) => (
  <g className={className}>
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, 20)`}
      textAnchor="middle"
    >
      {`${getMaxY()} PPM`}
    </text>
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, ${350 - padding})`}
      textAnchor="middle"
    >
      {`${getMinY()} PPM`}
    </text>
  </g>
);
AxisLabels.propTypes = {
  getMinY: PropTypes.func.isRequired,
  getMaxY: PropTypes.func.isRequired,
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
