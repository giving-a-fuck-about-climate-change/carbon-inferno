import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle, debounce } from 'throttle-debounce';

import ToolTip from '../ToolTip';
import Svg from '../Svg';
import { Point as ActivePoint } from '../Point';
import { Line as HoverLine } from '../Line';
import AreaChart from '../../components/AreaChart';
import AxisLabels from '../../components/Axis/labels';
import { WEEK, MONTH } from '../../constants';
import { binarySearch } from '../../utils';

const shouldShowActivePoint = (hoverState, type) => {
  if (hoverState) {
    if (type === WEEK || type === MONTH) {
      return false;
    }
    return true;
  }
  return false;
};

// Component
class PpmChart extends Component {
  state = {
    hoverLoc: null,
    activePoint: null,
    mocLoc: null,
  };

  componentDidMount() {
    this.setSvgCords();
  }

  setSvgCords = () => {
    const { documentDependency } = this.props;
    // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
    const svgElement = documentDependency.getElementsByClassName(
      'linechart',
    )[1];
    const svgCoords = svgElement.getScreenCTM();
    const svgPoint = svgElement.createSVGPoint();
    this.setState({
      svgCoords,
      svgPoint,
    });
  };

  // FIND CLOSEST POINT TO MOUSE
  getCoords = throttle(60, (svgData, e) => {
    const { svgPoint, svgCoords } = this.state;
    // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
    svgPoint.x = e.clientX; // set x coord to x coord pos of the mouse
    // http://wesbos.com/destructuring-renaming/
    const { x: hoverLoc } = svgPoint.matrixTransform(svgCoords.inverse());
    const closestPoint = binarySearch(svgData, hoverLoc);

    this.setState({
      hoverLoc,
      activePoint: closestPoint,
      mouseLoc: e.clientX,
    });
  });

  // STOP HOVER
  stopHover = debounce(100, () => {
    this.setState({ hoverLoc: null, activePoint: null, mocLoc: null });
  });

  render() {
    // Reduce number of <g> tags, improve render props. or react 16 support [] ????
    const { data, rangeType } = this.props;
    return (
      <div>
        <div className="graph-container">
          {this.state.hoverLoc ? (
            <ToolTip
              hoverLoc={this.state.mouseLoc}
              text={`${this.state.activePoint.p} PPM`}
              style={{
                marginTop: '-20px',
                backgroundColor: '#1ba69c',
                color: '#ffffff',
                fontWeight: 'bold',
              }}
            />
          ) : null}
          <div className="svg-inline">
            <Svg svgWidth={100} widthPercent="10%" data={data}>
              {({ cordFuncs, svgHeight }) => (
                <AxisLabels svgHeight={svgHeight} getY={cordFuncs.getY} />
              )}
            </Svg>
            <Svg
              svgWidth={1000}
              data={data}
              onMouseMove={this.getCoords}
              onMouseLeave={this.stopHover}
              widthPercent="80%"
              preserveAspectRatio="none"
            >
              {({ cordFuncs, svgHeight }) => (
                <g>
                  <AreaChart
                    svgData={data}
                    cordFuncs={cordFuncs}
                    svgHeight={svgHeight}
                  />
                  {this.state.hoverLoc ? (
                    <HoverLine
                      x1={this.state.hoverLoc}
                      y1={-2} // TODO: Understand Why -8 ???
                      x2={this.state.hoverLoc}
                      y2={svgHeight}
                    />
                  ) : null}
                  {shouldShowActivePoint(this.state.hoverLoc, rangeType) ? (
                    <ActivePoint
                      xCoord={this.state.activePoint.svgX}
                      yCoord={this.state.activePoint.svgY}
                    />
                  ) : null}
                </g>
              )}
            </Svg>
            <Svg svgWidth={100} widthPercent="10%" data={data}>
              {({ cordFuncs, svgHeight }) => (
                <AxisLabels svgHeight={svgHeight} getY={cordFuncs.getY} />
              )}
            </Svg>
          </div>
          <div className="graph-filler" />
          {this.state.hoverLoc ? (
            <ToolTip
              hoverLoc={this.state.mouseLoc}
              text={this.state.activePoint.d}
              style={{ marginTop: '-50px' }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default PpmChart;
PpmChart.propTypes = {
  data: PropTypes.array, //eslint-disable-line
  documentDependency: PropTypes.object, //eslint-disable-line
  rangeType: PropTypes.string.isRequired,
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  data: [],
  documentDependency: document, // dependency injection (makes it easier to test) TODO: REMOVE
};
