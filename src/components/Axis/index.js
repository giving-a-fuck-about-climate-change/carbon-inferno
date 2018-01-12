import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Axis.css';
/**
 Our axis will have 6 labels.
 Which are:
 - 1st items
 - last item
 - every fifth item in between
 - only sample data if its greater than 5 in length
* */
export const createLabels = (items = []) => {
  // we only want 6 labels so only sample when its greater than 6
  if (items.length > 0 && items.length >= 5) {
    const sampleRate = Math.round(items.length / 5); // calculate a 5th of the array
    let rate = sampleRate;
    const res = [items[0]];
    for (let i = 0; i <= 3; i++) {
      const item = items[rate];
      if (item) {
        res.push(items[rate]);
      }
      rate += sampleRate;
    }
    res.push(items[items.length - 1]);
    return res;
  }
  return items;
};

export const formatLabel = (label, rangeType) => {
  const dateLabel = new Date(label);
  if (rangeType === 'week') {
    return moment(dateLabel).format('DD/MM/YY');
  }
  if (rangeType === 'month') {
    return moment(dateLabel).format('MMM DD');
  }
  return moment(dateLabel).format('MMM YYYY');
};

export const XAxis = ({ getSvgX, data, rangeType, viewBoxWidth }) => {
  const labels = createLabels(data, rangeType);
  return (
    <div className="x-axis-container">
      <svg
        className="x-axis"
        width="80%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${40}`}
        preserveAspectRatio={`xMidYMax ${
          viewBoxWidth < 1000 ? 'meet' : 'slice'
        }`}
        overflow="visible"
      >
        <g>
          {labels.map(({ date, x }, idx) => (
            <text
              key={`x-axis-${date}-${x}-${idx}`}
              transform={`translate(${getSvgX(x)}, 20)`}
              textAnchor="middle"
              className="x-axis-labels"
            >
              {formatLabel(date, rangeType)}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

XAxis.propTypes = {
  data: PropTypes.array, //eslint-disable-line
  viewBoxWidth: PropTypes.number,
  getSvgX: PropTypes.func,
  rangeType: PropTypes.string,
};
XAxis.defaultProps = {
  data: [],
  viewBoxWidth: 1000,
  getSvgX: () => {},
  rangeType: '',
};

export const YAxis = ({ containerClass, labelClass, minLabel, maxLabel }) => (
  <div className={containerClass}>
    <div className="y-labels">{maxLabel} PPM</div>
    <div className={labelClass}>{minLabel} PPM</div>
  </div>
);
YAxis.defaultProps = {
  containerClass: 'y-axis',
  labelClass: 'y-labels',
  minLabel: 0,
  maxLabel: 0,
};
YAxis.propTypes = {
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  minLabel: PropTypes.number,
  maxLabel: PropTypes.number,
};
