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
  getX() {
    const { data } = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x,
    };
  }
  getY() {
    const { data } = this.props;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
    };
  }
  // GET SVG COORDINATES
  getSvgX(x) {
    const { svgWidth, yLabelSize } = this.props;
    return yLabelSize + x / this.getX().max * (svgWidth - yLabelSize); //eslint-disable-line
  }
  getSvgY(y) {
    const { svgHeight, xLabelSize } = this.props;
    const gY = this.getY();
    return (
      ((svgHeight - xLabelSize) * gY.max - (svgHeight - xLabelSize) * y) / //eslint-disable-line
      (gY.max - gY.min)
    );
  }

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

  // BUILD SVG PATH
  makePath() {
    const { color, data } = this.props;
    const markerTo = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `;

    const linePath = data.reduce(
      (pathString, point) =>
        `${pathString}L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `,
      markerTo,
    );

    return (
      <path className="linechart_path" d={linePath} style={{ stroke: color }} />
    );
  }
  // BUILD SHADED AREA
  makeArea() {
    const { data } = this.props;
    const markerTo = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)} `;

    let linePath = data.reduce(
      (pathString, point) =>
        `${pathString}L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)} `,
      markerTo,
    );

    const x = this.getX();
    const y = this.getY();
    linePath +=
      `L ${this.getSvgX(x.max)} ${this.getSvgY(y.min)} ` +
      `L ${this.getSvgX(x.min)} ${this.getSvgY(y.min)} `;

    return <path className="linechart_area" d={linePath} />;
  }
  // BUILD GRID AXIS
  makeAxis() {
    const { yLabelSize } = this.props;
    const x = this.getX();
    const y = this.getY();

    const topLineXBeginPos = this.getSvgX(x.min) - yLabelSize;
    const topLineYBeginPos = this.getSvgY(y.min);
    const topLineXEndPos = this.getSvgX(x.max);
    const topLineYEndPos = this.getSvgY(y.min);

    const bottomLineXBeginPos = this.getSvgX(x.min) - yLabelSize;
    const bottomLineYBeginPos = this.getSvgY(y.max);
    const bottomLineXEndPos = this.getSvgX(x.max);
    const bottomLineYEndPos = this.getSvgY(y.max);

    return (
      <g className="linechart_axis">
        <line
          x1={topLineXBeginPos}
          y1={topLineYBeginPos}
          x2={topLineXEndPos}
          y2={topLineYEndPos}
          strokeDasharray="5"
        />
        <line
          x1={bottomLineXBeginPos}
          y1={bottomLineYBeginPos}
          x2={bottomLineXEndPos}
          y2={bottomLineYEndPos}
          strokeDasharray="5"
        />
      </g>
    );
  }

  makeLabels() {
    const { svgHeight, svgWidth, xLabelSize, yLabelSize, data } = this.props;
    const padding = 5;
    return (
      <g className="linechart_label">
        {/* Y AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize / 2}, 20)`}
          textAnchor="middle"
        >
          {this.getY().max}
        </text>
        <text
          transform={`translate(${yLabelSize / 2}, ${svgHeight -
            xLabelSize -
            padding})`}
          textAnchor="middle"
        >
          {this.getY().min}
        </text>
        {/* X AXIS LABELS */}
        <text
          transform={`translate(${yLabelSize}, ${svgHeight})`}
          textAnchor="start"
        >
          {this.props.data[0].d}
        </text>
        <text
          transform={`translate(${svgWidth}, ${svgHeight})`}
          textAnchor="end"
        >
          {data[data.length - 1].d}
        </text>
      </g>
    );
  }

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
    const svgHeight = 300;
    const svgWidth = 900;
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
                {this.makePath()}
                {this.makeArea()}
                {this.makeLabels()}
                {this.makeAxis()}
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
