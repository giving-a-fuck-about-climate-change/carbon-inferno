import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '../ToolTip';

// Component
class PpmChart extends Component {
  state = {
    hoverLoc: null,
    activePoint: null,
  };

  // GET X & Y || MAX & MIN
  getX = () => {
    const { data } = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x,
    };
  };
  getY = () => {
    const { data } = this.props;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
    };
  };
  // GET SVG COORDINATES
  getSvgX = (x) => {
    const { svgWidth, yLabelSize } = this.props;
    return yLabelSize + x / this.getX().max * (svgWidth - yLabelSize); //eslint-disable-line
  };
  getSvgY = (y) => {
    const { svgHeight, xLabelSize } = this.props;
    const gY = this.getY();
    return (
      ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / //eslint-disable-line
      (gY.max - gY.min)
    );
  };

  // FIND CLOSEST POINT TO MOUSE
  getCoords = (e) => {
    const { svgWidth, yLabelSize, data } = this.props;
    const svgLocation = document
      .getElementsByClassName('linechart')[0]
      .getBoundingClientRect();
    const adjustment = (svgLocation.width - svgWidth) / 2; // takes padding into consideration
    const relativeLoc = e.clientX - svgLocation.left - adjustment;

    const svgData = data.reduce((svgPointArr, point) => {
      const currCord = {
        svgX: this.getSvgX(point.x),
        svgY: this.getSvgY(point.y),
        d: point.d,
        p: point.p,
      };
      return [currCord, ...svgPointArr];
    }, []);

    let closestPoint = {};
    for (let i = 0, c = 500; i < svgData.length; i++) {
      if (Math.abs(svgData[i].svgX - this.state.hoverLoc) <= c) {
        c = Math.abs(svgData[i].svgX - this.state.hoverLoc);
        closestPoint = svgData[i];
      }
    }

    if (relativeLoc - yLabelSize < 0) {
      this.stopHover();
    } else {
      this.setState({
        hoverLoc: relativeLoc,
        activePoint: closestPoint,
      });
    }
  };

  // STOP HOVER
  stopHover = () => {
    this.setState({ hoverLoc: null, activePoint: null });
  };
  // MAKE ACTIVE POINT
  makeActivePoint() {
    const { color, pointRadius } = this.props;
    return (
      <circle
        className="linechart_point"
        style={{ stroke: color }}
        r={pointRadius}
        cx={this.state.activePoint.svgX}
        cy={this.state.activePoint.svgY}
      />
    );
  }
  // MAKE HOVER LINE
  createLine() {
    const { svgHeight, xLabelSize } = this.props;
    return (
      <line
        className="hoverLine"
        x1={this.state.hoverLoc}
        y1={-8}
        x2={this.state.hoverLoc}
        y2={svgHeight - xLabelSize}
      />
    );
  }

  render() {
    const { yLabelSize, xLabelSize, svgHeight, svgWidth, data } = this.props;
    return (
      <div>
        <div className="row">
          <div className="popup">
            {this.state.hoverLoc ? (
              <ToolTip
                hoverLoc={this.state.hoverLoc}
                activePoint={this.state.activePoint}
              />
            ) : null}
          </div>
        </div>
        <div className="graph-container">
          {this.props.data.length > 0 ? (
            <svg
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className={'linechart'}
              onMouseMove={this.getCoords}
              onMouseLeave={this.stopHover}
            >
              <g>
                {this.state.hoverLoc ? this.createLine() : null}
                {this.state.hoverLoc ? this.makeActivePoint() : null}
                {this.props.children({
                  cordFuncs: {
                    getX: this.getX,
                    getY: this.getY,
                    getSvgX: this.getSvgX,
                    getSvgY: this.getSvgY,
                  },
                  svgHeight,
                  svgWidth,
                  xLabelSize,
                  yLabelSize,
                  svgData: data,
                })}
              </g>
            </svg>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PpmChart;
PpmChart.propTypes = {
  color: PropTypes.string,
  pointRadius: PropTypes.number,
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  xLabelSize: PropTypes.number,
  yLabelSize: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  children: PropTypes.func.isRequired,
};
// DEFAULT PROPS
PpmChart.defaultProps = {
  color: '#2196F3',
  pointRadius: 5,
  svgHeight: 300,
  svgWidth: 900,
  xLabelSize: 20,
  yLabelSize: 80,
  data: [],
};
