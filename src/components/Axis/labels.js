import React from 'react';
import PropTypes from 'prop-types';

const AxisLabels = ({
  svgHeight,
  svgWidth,
  xLabelSize,
  yLabelSize,
  data,
  getY,
  className,
}) => {
  const padding = 5;
  return (
    <g className={className}>
      {/* Y AXIS LABELS */}
      <text transform={`translate(${yLabelSize / 2}, 20)`} textAnchor="middle">
        {getY().max}
      </text>
      <text
        transform={`translate(${yLabelSize / 2}, ${svgHeight -
          xLabelSize -
          padding})`}
        textAnchor="middle"
      >
        {getY().min}
      </text>
      {/* X AXIS LABELS */}
      <text
        transform={`translate(${yLabelSize}, ${svgHeight})`}
        textAnchor="start"
      >
        {data[0].d}
      </text>
      <text transform={`translate(${svgWidth}, ${svgHeight})`} textAnchor="end">
        {data[data.length - 1].d}
      </text>
    </g>
  );
};
AxisLabels.propTypes = {
  getY: PropTypes.func.isRequired,
  svgHeight: PropTypes.number.isRequired,
  svgWidth: PropTypes.number.isRequired,
  xLabelSize: PropTypes.number.isRequired,
  yLabelSize: PropTypes.number.isRequired,
  data: PropTypes.array, //eslint-disable-line
  className: PropTypes.string,
};
AxisLabels.defaultProps = {
  data: [],
  className: 'linechart_label',
};
export default AxisLabels;
