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
  // When we render 'all' its very expensive, so only render when the chart changes
  shouldComponentUpdate(nextProps) {
    if (nextProps.svgData.length !== this.props.svgData.length) {
      return true;
    }
    return false;
  }

  render() {
    const {
      coordFuncs: { getSvgX, getSvgY, getMaxX, getMinX, getMinY },
      svgData,
    } = this.props;
    // Where the line of the graph will start from
    const markerTo = getMarkerTo(getSvgX, getSvgY, svgData);
    // The actual line of the graph
    const linePath = getLinePath(getSvgX, getSvgY, svgData, markerTo);
    // We need to draw another path which which we can fill for the shaded area
    let shadedPath = linePath;
    shadedPath +=
      `L ${getSvgX(getMaxX())} ${getSvgY(getMinY())} ` +
      `L ${getSvgX(getMinX())} ${getSvgY(getMinY())} `;
    return (
      <React.Fragment>
        <Path linePath={shadedPath} className="linechart_area" />
        <Path linePath={linePath} className="linechart_path" />
      </React.Fragment>
    );
  }
}
AreaChart.propTypes = {
  coordFuncs: PropTypes.object, // eslint-disable-line
  svgData: PropTypes.array, // eslint-disable-line
};

AreaChart.defaultProps = {
  coordFuncs: {},
  svgData: [{}],
};

export default AreaChart;
