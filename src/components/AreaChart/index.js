import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Path, ShadedPath } from '../Path';

class AreaChart extends Component {
  // When we render 'all' its very expensive, so only render when the chart changes
  shouldComponentUpdate(nextProps) {
    if (nextProps.svgData.length !== this.props.svgData.length) {
      return true;
    }
    return false;
  }

  render() {
    const { cordFuncs, svgData } = this.props;
    return (
      <g>
        <ShadedPath {...cordFuncs} data={svgData} />
        <Path {...cordFuncs} data={svgData} />
      </g>
    );
  }
}
AreaChart.propTypes = {
  cordFuncs: PropTypes.object, // eslint-disable-line
  svgHeight: PropTypes.number, // eslint-disable-line
  svgData: PropTypes.array, // eslint-disable-line
};

AreaChart.defaultProps = {
  cordFuncs: {},
  svgHeight: 0,
  svgData: [],
};

export default AreaChart;
