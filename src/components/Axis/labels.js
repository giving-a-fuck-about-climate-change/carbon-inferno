import React from 'react';
import PropTypes from 'prop-types';

const AxisLabels = ({ yLabelSize, getY, className, padding }) => (
  <g className={className}>
    {/* Y AXIS LABELS */}
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, 20)`}
      textAnchor="middle"
    >
      {`${getY().max} PPM`}
    </text>
    <text
      className="axis-labels"
      transform={`translate(${yLabelSize / 2}, ${350 - padding})`}
      textAnchor="middle"
    >
      {`${getY().min} PPM`}
    </text>
  </g>
);
AxisLabels.propTypes = {
  getY: PropTypes.func.isRequired,
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
