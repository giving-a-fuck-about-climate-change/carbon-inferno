import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SvgCoords } from 'react-svg-coordfuncs'; //eslint-disable-line

import './PpmChart.css';
import { Point as ActivePoint } from '../Point';
import { Line } from '../Line';
import AreaChart from '../../components/AreaChart';
import ShouldShow from '../../components/ShouldShow';

const svgHeight = 350;
const HoverActivePoint = ShouldShow(ActivePoint);
const HoverLine = ShouldShow(Line);

// Component
class HoverChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgData: this.setSvgData(props.data),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      this.setState({ svgData: this.setSvgData(this.props.data) }); //eslint-disable-line
    }
  }

  setSvgData = (data = []) => {
    const { getSvgX, getSvgY } = this.props.coordFuncs;
    return data.reduce((svgPointArr, point) => {
      const { x, y, ...rest } = point;
      const currCord = {
        svgX: getSvgX(x),
        svgY: getSvgY(y),
        ...rest,
      };
      return [currCord, ...svgPointArr];
    }, []);
  };

  render() {
    const {
      data,
      coordFuncs,
      onMouseMove,
      onMouseLeave,
      hoverLoc,
      activePoint,
      shouldShowPoint,
    } = this.props;
    const { svgData } = this.state;
    return (
      <svg
        onMouseMove={onMouseMove(svgData)}
        onMouseLeave={onMouseLeave}
        className="linechart"
        width="100%"
        viewBox={`0 0 ${1000} ${svgHeight}`}
        data-ident="ident-ppm-chart"
        preserveAspectRatio="none"
      >
        <g>
          <AreaChart
            svgData={data}
            coordFuncs={coordFuncs}
            svgHeight={svgHeight}
          />
          <HoverLine
            shouldShow={hoverLoc}
            x1={hoverLoc}
            x2={hoverLoc}
            y2={svgHeight}
          />
          <HoverActivePoint
            shouldShow={shouldShowPoint}
            xCoord={activePoint.svgX}
            yCoord={activePoint.svgY}
          />
        </g>
      </svg>
    );
  }
}

export default HoverChart;
HoverChart.propTypes = {
  data: PropTypes.array, //eslint-disable-line
  coordFuncs: PropTypes.shape({
    getSvgX: PropTypes.func,
    getSvgY: PropTypes.func,
    getMinX: PropTypes.func,
    getMaxX: PropTypes.func,
    getMinY: PropTypes.func,
    getMaxY: PropTypes.func,
  }),
  onMouseMove: PropTypes.func,
  onMouseLeave: PropTypes.func,
  hoverLoc: PropTypes.number,
  activePoint: PropTypes.shape({
    ppm: PropTypes.number,
    date: PropTypes.string,
  }),
  shouldShowPoint: PropTypes.bool,
};
// DEFAULT PROPS
HoverChart.defaultProps = {
  data: [],
  coordFuncs: {},
  onMouseMove: () => {},
  onMouseLeave: () => {},
  hoverLoc: null,
  activePoint: { ppm: 0, date: '' },
  shouldShowPoint: false,
};
