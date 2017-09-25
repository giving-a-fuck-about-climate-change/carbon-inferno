import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '../ToolTip';
import Svg from '../Svg';
import Axis from '../Axis';
import AxisLabels from '../Axis/labels';
import { ShadedArea, SvgPath } from '../../components/AreaChart';
import { Point as ActivePoint } from '../Point';
import { Line as HoverLine } from '../Line';

// Component
class PpmChart extends Component {
  state = {
    hoverLoc: null,
    activePoint: null,
  };

  // FIND CLOSEST POINT TO MOUSE
  getCoords = ({ getSvgY, getSvgX }, e) => {
    const { yLabelSize, data, documentDependency } = this.props;
    // http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/
    const svgElement = documentDependency.getElementsByClassName(
      'linechart',
    )[0];
    const svgCoords = svgElement.getScreenCTM();
    const svgPoint = svgElement.createSVGPoint();
    svgPoint.x = e.clientX; // set x coord to x coord pos of the mouse
    // http://wesbos.com/destructuring-renaming/
    const { x: hoverLoc } = svgPoint.matrixTransform(svgCoords.inverse());

    const svgData = data.reduce((svgPointArr, point) => {
      const currCord = {
        svgX: getSvgX(point.x),
        svgY: getSvgY(point.y),
        d: point.d,
        p: point.p,
      };
      return [currCord, ...svgPointArr];
    }, []);

    let closestPoint = {};
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if (hoverLoc - yLabelSize < 0) {
      this.stopHover();
    } else {
      this.setState({
        hoverLoc,
        activePoint: closestPoint,
      });
    }
  };

  // STOP HOVER
  stopHover = () => {
    this.setState({ hoverLoc: null, activePoint: null });
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className="graph-container">
          <div className="row">
            <div className="popup">
              {this.state.hoverLoc ? (
                <ToolTip
                  hoverLoc={this.state.hoverLoc}
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
            {({ cordFuncs, svgHeight, svgData }) => (
              <g>
                <Axis {...cordFuncs} />
                <AxisLabels svgHeight={svgHeight} getY={cordFuncs.getY} />
                <ShadedArea {...cordFuncs} data={svgData} />
                <SvgPath {...cordFuncs} data={svgData} />
                {this.state.hoverLoc ? (
                  <HoverLine
                    x1={this.state.hoverLoc}
                    y1={-8} // TODO: Understand Why -8 ???
                    x2={this.state.hoverLoc}
                    y2={svgHeight}
                  />
                ) : null}
                {this.state.hoverLoc ? (
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
                  hoverLoc={this.state.hoverLoc}
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
  color: PropTypes.string,
  pointRadius: PropTypes.number,
  xLabelSize: PropTypes.number,
  yLabelSize: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  documentDependency: PropTypes.object, //eslint-disable-line
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  color: '#2196F3',
  pointRadius: 5,
  xLabelSize: 20,
  yLabelSize: 80,
  data: [],
  documentDependency: document, // dependency injection (makes it easier to test)
};
