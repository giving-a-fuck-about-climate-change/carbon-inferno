import React from 'react';
import PropTypes from 'prop-types';

export const Path = ({ getSvgX, getSvgY, color, data, className }) => {
  const markerTo = `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `;

  const linePath = data.reduce(
    (pathString, point) =>
      `${pathString}L ${getSvgX(point.x)} ${getSvgY(point.y)} `,
    markerTo,
  );

  return <path className={className} d={linePath} style={{ stroke: color }} />;
};
Path.defaultProps = {
  data: [],
  className: 'linechart_path',
  color: '#f3acb1',
};
Path.propTypes = {
  getSvgX: PropTypes.func.isRequired,
  getSvgY: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.array, //eslint-disable-line
  className: PropTypes.string,
};

export const ShadedPath = ({
  getSvgX,
  getSvgY,
  getX,
  getY,
  data,
  className,
}) => {
  const markerTo = `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)} `;

  let linePath = data.reduce(
    (pathString, point) =>
      `${pathString}L ${getSvgX(point.x)} ${getSvgY(point.y)} `,
    markerTo,
  );

  const x = getX();
  const y = getY();
  linePath +=
    `L ${getSvgX(x.max)} ${getSvgY(y.min)} ` +
    `L ${getSvgX(x.min)} ${getSvgY(y.min)} `;

  return <path className={className} d={linePath} />;
};

ShadedPath.propTypes = {
  getSvgX: PropTypes.func.isRequired,
  getSvgY: PropTypes.func.isRequired,
  getX: PropTypes.func.isRequired,
  getY: PropTypes.func.isRequired,
  data: PropTypes.array, //eslint-disable-line
  className: PropTypes.string,
};

ShadedPath.defaultProps = {
  data: [],
  className: 'linechart_area',
};
// TODO: React 16 not needed to wrap within a div ;) I think ?
// const AreaChart = ({}) => {
//   return (
//
//   );
// };
