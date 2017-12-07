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
import binarySearch from './utils';

const svgHeight = 350;

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
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null,
      mocLoc: null,
    };
  }

  // FIND CLOSEST POINT TO MOUSE
  getCoords = ({ svgData }) =>
    throttle(250, (e) => {
      e.persist();
      // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
      const svgElement = document.querySelector(
        '[data-ident="ident-ppm-chart"]',
      );
      const svgCoords = svgElement.getScreenCTM();
      const svgPoint = svgElement.createSVGPoint();
      svgPoint.x = e.clientX; // set x coord to x coord pos of the mouse
      svgPoint.y = e.clientY; // set y coord to y coord pos of the mouse
      // http://wesbos.com/destructuring-renaming/
      const { x: hoverXLoc, y: hoverYLoc } = svgPoint.matrixTransform(
        svgCoords.inverse(),
      );
      // Only set the hover state if the y location is not overlapping our hover divs
      if (hoverYLoc > 2 && hoverYLoc < 332) {
        const closestPoint = binarySearch(svgData, hoverXLoc);
        this.setState({
          hoverLoc: hoverXLoc,
          activePoint: closestPoint,
          mouseLoc: e.clientX,
        });
      } else {
        this.setState({ hoverLoc: null, activePoint: null, mocLoc: null });
      }
    });

  /*
  * Because we throttle the mouseMove we could end up in a situation where
  * the mouseMove gets called after stopHover.
  * Adding a debounce to stopHover ensures that the stop event is delayed
  * and always called after mouseMove.
  */
  stopHover = () =>
    debounce(60, (e) => {
      e.persist();
      this.setState({ hoverLoc: null, activePoint: null, mocLoc: null });
    });

  render() {
    const { data, rangeType } = this.props;
    return (
      <div>
        {this.state.hoverLoc ? (
          <ToolTip
            hoverLoc={this.state.mouseLoc}
            text={`${this.state.activePoint.ppm} PPM`}
            style={{
              marginTop: '-20px',
              backgroundColor: '#1ba69c',
              color: '#ffffff',
              fontWeight: 'bold',
            }}
          />
        ) : null}
        <div className="svg-inline">
          <div style={{ width: '10%', display: 'flex' }}>
            <Svg
              className="linechart"
              viewBoxWidth={100}
              viewBoxHeigth={svgHeight}
              width="100%"
              data={data}
            >
              {({ coordFuncs: { getMinY, getMaxY } }) => (
                <AxisLabels
                  svgHeight={svgHeight}
                  getMinY={getMinY}
                  getMaxY={getMaxY}
                />
              )}
            </Svg>
          </div>
          <div style={{ width: '80%', display: 'flex' }}>
            <Svg
              className="linechart"
              width="100%"
              viewBoxWidth={1000}
              viewBoxHeigth={svgHeight}
              data={data}
              data-ident="ident-ppm-chart"
              onMouseMove={this.getCoords}
              onMouseLeave={this.stopHover}
              preserveAspectRatio="none"
            >
              {({ coordFuncs }) => (
                <g>
                  <AreaChart
                    svgData={data}
                    coordFuncs={coordFuncs}
                    svgHeight={svgHeight}
                  />
                  {this.state.hoverLoc ? (
                    <HoverLine
                      x1={this.state.hoverLoc}
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
          </div>
          <div style={{ width: '10%', display: 'flex' }}>
            <Svg
              className="linechart"
              width="100%"
              viewBoxWidth={100}
              viewBoxHeigth={svgHeight}
              data={data}
            >
              {({ coordFuncs: { getMinY, getMaxY } }) => (
                <AxisLabels
                  svgHeight={svgHeight}
                  getMinY={getMinY}
                  getMaxY={getMaxY}
                />
              )}
            </Svg>
          </div>
        </div>
        <div className="graph-filler" />
        {this.state.hoverLoc ? (
          <ToolTip
            hoverLoc={this.state.mouseLoc}
            text={this.state.activePoint.date}
            style={{ marginTop: '-50px' }}
          />
        ) : null}
      </div>
    );
  }
}

export default PpmChart;
PpmChart.propTypes = {
  data: PropTypes.array, //eslint-disable-line
  rangeType: PropTypes.string.isRequired,
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  data: [],
};
