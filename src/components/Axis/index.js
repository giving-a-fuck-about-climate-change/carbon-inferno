import React from 'react';
import PropTypes from 'prop-types';

const Axis = ({ getX, getY, getSvgX, getSvgY, className, strokeDasharray }) => {
  const x = getX();
  const y = getY();

  const topLineXBeginPos = getSvgX(x.min);
  const topLineYBeginPos = getSvgY(y.min);
  const topLineXEndPos = getSvgX(x.max);
  const topLineYEndPos = getSvgY(y.min);

  const bottomLineXBeginPos = getSvgX(x.min);
  const bottomLineYBeginPos = getSvgY(y.max);
  const bottomLineXEndPos = getSvgX(x.max);
  const bottomLineYEndPos = getSvgY(y.max);

  return (
    <g className={className}>
      <line
        x1={topLineXBeginPos}
        y1={topLineYBeginPos}
        x2={topLineXEndPos}
        y2={topLineYEndPos}
        strokeDasharray={strokeDasharray}
      />
      <line
        x1={bottomLineXBeginPos}
        y1={bottomLineYBeginPos}
        x2={bottomLineXEndPos}
        y2={bottomLineYEndPos}
        strokeDasharray={strokeDasharray}
      />
    </g>
  );
};
Axis.propTypes = {
  getX: PropTypes.func.isRequired,
  getY: PropTypes.func.isRequired,
  getSvgY: PropTypes.func.isRequired,
  getSvgX: PropTypes.func.isRequired,
  strokeDasharray: PropTypes.number,
  className: PropTypes.string,
};
Axis.defaultProps = {
  className: 'linechart_axis',
  strokeDasharray: 5,
  yLabelSize: 80,
};

export default Axis;
