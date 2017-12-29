import React from 'react';
import moment from 'moment';

const createLabels = (items = []) => {
  if (items.length > 0) {
    const sampleRate = Math.round(items.length / 5);
    let rate = sampleRate;
    const res = [];
    for (let i = 0; i <= 4; i++) {
      const item = items[rate];
      if (item) {
        res.push(items[rate]);
      }
      rate += sampleRate;
    }
    if (res.length === 4) {
      res.push(items[items.length - 1]);
    }
    return res;
  }
  return items;
};

const formatLabel = (label, rangeType) => {
  if (rangeType === 'week') {
    return moment(label).format('DD/MM/YY');
  }
  if (rangeType === 'month') {
    return moment(label).format('MMM DD');
  }
  return moment(label).format('MMM YYYY');
};

const XAxis = ({ getSvgX, data, rangeType }) => {
  const labels = createLabels(data);
  return (
    <svg
      className="x-axis"
      width="80%"
      height="100%"
      viewBox={`0 0 ${1000} ${40}`}
      preserveAspectRatio="none"
    >
      <g>
        {labels.map(({ date, x }) => {
          const xPos = getSvgX(x) - 40;
          return (
            <text
              transform={`translate(${xPos}, 20)`}
              textAnchor="middle"
              className="x-axis-labels"
            >
              {formatLabel(date, rangeType)}
            </text>
          );
        })}
      </g>
    </svg>
  );
};

export default XAxis;
XAxis.defaultProps = {
  data: [],
};
