import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component (TODO: Make it possible to also be a HOC )
class Svg extends Component {
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

  handleMouseMove = (event) => {
    const { getSvgX, getSvgY } = this;
    this.props.onMouseMove({ getSvgX, getSvgY }, event);
  };

  handleMouseLeave = (event) => {
    const { getSvgX, getSvgY } = this;
    this.props.onMouseLeave({ getSvgX, getSvgY }, event);
  };

  render() {
    const { svgHeight, svgWidth, data, className, style } = this.props;
    return (
      <svg
        width={'100%'} // TODO: Make prop
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} // TODO: Different props for this.
        style={style}
        className={className}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <g>
          {this.props.children({
            cordFuncs: {
              getX: this.getX,
              getY: this.getY,
              getSvgX: this.getSvgX,
              getSvgY: this.getSvgY,
            },
            svgHeight,
            svgWidth,
            svgData: data,
          })}
        </g>
      </svg>
    );
  }
}

export default Svg;
Svg.propTypes = {
  className: PropTypes.string,
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  children: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  xLabelSize: PropTypes.number, // TODO: Understand and Investigate to remove from here.
  yLabelSize: PropTypes.number, // TODO: Understand and Investigate to remove from here.
  style: PropTypes.object, //eslint-disable-line
};
// DEFAULT PROPS
Svg.defaultProps = {
  svgHeight: 300,
  svgWidth: 800,
  data: [],
  className: 'linechart',
  onMouseMove: () => {},
  onMouseLeave: () => {}, // TODO: Possible refactor so that this is never called ? (Look into spreading props top svg)
  xLabelSize: 20,
  yLabelSize: 80,
  style: { display: 'block' },
};
