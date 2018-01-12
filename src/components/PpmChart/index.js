import React, { Component } from "react";
import PropTypes from "prop-types";
import { throttle, debounce } from "throttle-debounce";
import { SvgCoords } from "react-svg-coordfuncs";

import "./PpmChart.css";
import ToolTip from "../ToolTip";
import { XAxis, YAxis } from "../../components/Axis";
import ShouldShow from "../../components/ShouldShow";
import HoverChart from "./hoverChart";
import { WEEK, MONTH } from "../../constants";
import binarySearch from "./utils";

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

const HoverToolTip = ShouldShow(ToolTip);

class PpmChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewBoxWidth: props.windowWidth,
      ...this.getInitialHoverState()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.determineViewPortSize(nextProps.windowWidth);
  }

  getInitialHoverState = () => ({
    hoverLoc: null,
    activePoint: {
      ppm: 0,
      date: ""
    },
    mouseLoc: 0
  });

  // FIND CLOSEST POINT TO MOUSE
  getCoords = svgData =>
    throttle(250, e => {
      e.persist();
      // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
      const svgElement = document.querySelector(
        '[data-ident="ident-ppm-chart"]'
      );
      const svgCoords = svgElement.getScreenCTM();
      const svgPoint = svgElement.createSVGPoint();
      svgPoint.x = e.clientX; // set x coord to x coord pos of the mouse
      svgPoint.y = e.clientY; // set y coord to y coord pos of the mouse
      // http://wesbos.com/destructuring-renaming/
      const { x: hoverXLoc, y: hoverYLoc } = svgPoint.matrixTransform(
        svgCoords.inverse()
      );
      // Only set the hover state if the y location is not overlapping our hover divs
      if (hoverYLoc > 2 && hoverYLoc < 332) {
        const closestPoint = binarySearch(svgData, hoverXLoc);
        this.setState({
          hoverLoc: hoverXLoc,
          activePoint: closestPoint,
          mouseLoc: e.clientX
        });
      } else {
        this.setState(this.getInitialHoverState());
      }
    });

  /*
  * Because we throttle the mouseMove we could end up in a situation where
  * the mouseMove gets called after stopHover.
  * Adding a debounce to stopHover ensures that the stop event is delayed
  * and always called after mouseMove.
  */
  stopHover = debounce(60, e => {
    e.persist();
    this.setState(this.getInitialHoverState());
  });

  /**
  We need to determine the window size so that
  the x axis and tooltip can be respond to which ever size
  the window may be
  * */

  determineViewPortSize = windowSize =>
    this.setState({
      viewBoxWidth: windowSize <= 1000 ? windowSize : 1000
    });

  render() {
    const { data, rangeType } = this.props;
    const { hoverLoc, mouseLoc, activePoint, viewBoxWidth } = this.state;
    return (
      <div>
        <HoverToolTip
          viewBoxWidth={viewBoxWidth}
          hoverLoc={mouseLoc}
          text={`${activePoint.ppm} PPM`}
          className="top-tooltip "
          shouldShow={hoverLoc}
        />
        <SvgCoords
          viewBoxWidth={1000}
          viewBoxHeigth={svgHeight}
          data={data}
          render={({
            getMinX,
            getMaxX,
            getMinY,
            getMaxY,
            getSvgX,
            getSvgY
          }) => (
            <div>
              <div className="svg-inline">
                <YAxis minLabel={getMinY().y} maxLabel={getMaxY().y} />
                <div className="chart-wrapper">
                  <HoverChart
                    data={data}
                    coordFuncs={{
                      getMinX,
                      getMaxX,
                      getMinY,
                      getMaxY,
                      getSvgX,
                      getSvgY
                    }}
                    onMouseMove={this.getCoords}
                    onMouseLeave={this.stopHover}
                    hoverLoc={hoverLoc}
                    activePoint={activePoint}
                    shouldShowPoint={shouldShowActivePoint(hoverLoc, rangeType)}
                  />
                </div>
                <YAxis minLabel={getMinY().y} maxLabel={getMaxY().y} />
              </div>
            </div>
          )}
        />
        <HoverToolTip
          viewBoxWidth={viewBoxWidth}
          shouldShow={hoverLoc}
          hoverLoc={mouseLoc}
          text={activePoint.date}
          className="bottom-tooltip"
        />
        <div className="graph-filler" />
        <div>
          <SvgCoords
            viewBoxWidth={viewBoxWidth}
            viewBoxHeigth={svgHeight}
            data={data}
            render={({ getSvgX }) => (
              <XAxis
                data={data}
                getSvgX={getSvgX}
                rangeType={rangeType}
                viewBoxWidth={viewBoxWidth}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default PpmChart;
PpmChart.propTypes = {
  data: PropTypes.array, //eslint-disable-line
  rangeType: PropTypes.string.isRequired,
  windowWidth: PropTypes.number
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  data: [],
  windowWidth: 1000
};
