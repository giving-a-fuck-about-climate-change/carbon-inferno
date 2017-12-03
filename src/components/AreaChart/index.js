import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const Path = ({ linePath, className }) => (
  <path className={className} d={linePath} />
);
Path.defaultProps = {
  linePath: '',
  className: 'linechart_path',
};
Path.propTypes = {
  linePath: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export const getMarkerTo = (getSvgX, getSvgY, data = [{}]) =>
  `M ${getSvgX(data[0].x)} ${getSvgY(data[0].y)}`;

export const getLinePath = (getSvgX, getSvgY, data = [{}], markerTo = '') =>
  data.reduce(
    (pathString, point) =>
      `${pathString}L ${getSvgX(point.x)} ${getSvgY(point.y)} `,
    markerTo,
  );

class AreaChart extends Component {
  // constructor(props) {
  //   super(props);
  //   const { cordFuncs: { getSvgX, getSvgY, getX, getY }, svgData } = props;
  //   // Where the line of the graph will start from
  //   const markerTo = getMarkerTo(getSvgX, getSvgY, svgData);
  //   // The actual line of the graph
  //   const linePath = getLinePath(getSvgX, getSvgY, svgData, markerTo);
  //   // We need to draw another path which which we can fill for the shaded area
  //   const x = getX();
  //   const y = getY();
  //   let shadedPath = linePath;
  //   shadedPath +=
  //     `L ${getSvgX(x.max)} ${getSvgY(y.min)} ` +
  //     `L ${getSvgX(x.min)} ${getSvgY(y.min)} `;
  //   this.state = {
  //     markerTo,
  //     linePath,
  //     shadedPath,
  //   };
  // }

  // When we render 'all' its very expensive, so only render when the chart changes
  shouldComponentUpdate(nextProps) {
    if (nextProps.svgData.length !== this.props.svgData.length) {
      return true;
    }
    return false;
  }

  render() {
    const { cordFuncs: { getSvgX, getSvgY, getX, getY }, svgData } = this.props;
    // Where the line of the graph will start from
    const markerTo = getMarkerTo(getSvgX, getSvgY, svgData);
    // The actual line of the graph
    const linePath = getLinePath(getSvgX, getSvgY, svgData, markerTo);
    // We need to draw another path which which we can fill for the shaded area
    const x = getX();
    const y = getY();
    let shadedPath = linePath;
    shadedPath +=
      `L ${getSvgX(x.max)} ${getSvgY(y.min)} ` +
      `L ${getSvgX(x.min)} ${getSvgY(y.min)} `;
    return (
      <g>
        <Path linePath={shadedPath} className="linechart_area" />
        <Path linePath={linePath} className="linechart_path" />
      </g>
    );
  }
}
AreaChart.propTypes = {
  cordFuncs: PropTypes.object, // eslint-disable-line
  svgData: PropTypes.array, // eslint-disable-line
};

AreaChart.defaultProps = {
  cordFuncs: {},
  svgData: [{}],
};

export default AreaChart;
