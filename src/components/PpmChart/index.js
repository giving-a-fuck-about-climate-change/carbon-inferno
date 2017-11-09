import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '../ToolTip';
import Svg from '../Svg';
import { Point as ActivePoint } from '../Point';
import { Line as HoverLine } from '../Line';
import AreaChart from '../../components/AreaChart';
import { WEEK, MONTH } from '../../constants';

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

  // FIND CLOSEST POINT TO MOUSE
  getCoords = (svgData, e) => {
    const { yLabelSize, documentDependency } = this.props;
    // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
    const svgElement = documentDependency.getElementsByClassName(
      'linechart',
    )[0];
    const svgCoords = svgElement.getScreenCTM();
    const svgPoint = svgElement.createSVGPoint();
    svgPoint.x = e.clientX; // set x coord to x coord pos of the mouse
    // http://wesbos.com/destructuring-renaming/
    const { x: hoverLoc } = svgPoint.matrixTransform(svgCoords.inverse());

    let closestPoint = {};
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - hoverLoc);
        closestPoint = svgData[i];
      }
    }
    if (hoverLoc - yLabelSize < 0) {
      // TODO stop hover on right side of graph.
      this.stopHover();
    } else {
      this.setState({
        hoverLoc,
        activePoint: closestPoint,
        mouseLoc: e.clientX,
      });
    }
  };

  // STOP HOVER
  stopHover = () => {
    this.setState({ hoverLoc: null, activePoint: null, mocLoc: null });
  };

  render() {
    const { data, rangeType } = this.props;
    console.log(this.props);
    return (
      <div>
        <div className="graph-container">
          <div className="row">
            <div className="popup">
              {this.state.hoverLoc ? (
                <ToolTip
                  hoverLoc={this.state.mouseLoc}
                  text={this.state.activePoint.p}
                />
              ) : null}
            </div>
          </div>
          <Svg
            data={data}
            onMouseMove={this.getCoords}
            onMouseLeave={this.stopHover}
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
                    y1={-8} // TODO: Understand Why -8 ???
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
          <div className="row">
            <div className="popup">
              {this.state.hoverLoc ? (
                <ToolTip
                  hoverLoc={this.state.mouseLoc}
                  text={this.state.activePoint.d}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PpmChart;
PpmChart.propTypes = {
  yLabelSize: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  documentDependency: PropTypes.object, //eslint-disable-line
  rangeType: PropTypes.string.isRequired,
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  yLabelSize: 80,
  data: [],
  documentDependency: document, // dependency injection (makes it easier to test)
};
