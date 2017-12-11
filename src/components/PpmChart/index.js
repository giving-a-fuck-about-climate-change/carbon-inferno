import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { throttle, debounce } from 'throttle-debounce';

import { SvgCoords } from 'react-svg-coordfuncs';

import './PpmChart.css';
import ToolTip from '../ToolTip';
import AxisLabels from '../../components/Axis/labels';
import ShouldShow from '../../components/ShouldShow';
import HoverChart from './hoverChart';
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

const SvgAxis = ({ getMinY, getMaxY }) => (
  <svg className="linechart" width="100%" viewBox={`0 0 ${100} ${svgHeight}`}>
    <AxisLabels
      viewBox={`0 0 ${100} ${svgHeight}`}
      svgHeight={svgHeight}
      getMinY={getMinY}
      getMaxY={getMaxY}
    />
  </svg>
);
SvgAxis.propTypes = {
  getMinY: PropTypes.func.isRequired,
  getMaxY: PropTypes.func.isRequired,
};

const HoverToolTip = ShouldShow(ToolTip);

// Component
class PpmChart extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    hoverLoc: null,
    activePoint: {
      ppm: 0,
      date: '',
    },
    mouseLoc: 0,
  });

  // FIND CLOSEST POINT TO MOUSE
  getCoords = svgData =>
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
        this.setState(this.getInitialState());
      }
    });

  /*
  * Because we throttle the mouseMove we could end up in a situation where
  * the mouseMove gets called after stopHover.
  * Adding a debounce to stopHover ensures that the stop event is delayed
  * and always called after mouseMove.
  */
  stopHover = debounce(60, (e) => {
    e.persist();
    this.setState(this.getInitialState());
  });

  render() {
    const { data, rangeType } = this.props;
    const { hoverLoc, mouseLoc, activePoint } = this.state;
    return (
      <div>
        <HoverToolTip
          hoverLoc={mouseLoc}
          text={`${activePoint.ppm} PPM`}
          className="top-tooltip "
          shouldShow={hoverLoc}
        />
        <SvgCoords
          viewBoxWidth={1000}
          viewBoxHeigth={svgHeight}
          data={data}
          render={({ coordFuncs }) => (
            <div className="svg-inline">
              <div className="axis-wrapper">
                <SvgAxis {...coordFuncs} />
              </div>
              <div className="chart-wrapper">
                <HoverChart
                  data={data}
                  coordFuncs={coordFuncs}
                  onMouseMove={this.getCoords}
                  onMouseLeave={this.stopHover}
                  hoverLoc={hoverLoc}
                  activePoint={activePoint}
                  shouldShowPoint={shouldShowActivePoint(hoverLoc, rangeType)}
                />
              </div>
              <div className="axis-wrapper">
                <SvgAxis {...coordFuncs} />
              </div>
            </div>
          )}
        />
        <div className="graph-filler" />
        <HoverToolTip
          shouldShow={hoverLoc}
          hoverLoc={mouseLoc}
          text={activePoint.date}
          className="bottom-tooltip"
        />
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
