import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component (TODO: Make it possible to also be a HOC )

class Svg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgData: props.data.reduce((svgPointArr, point) => {
        const { x, y, ...rest } = point;
        const currCord = {
          svgX: this.getSvgX(x),
          svgY: this.getSvgY(y),
          ...rest,
        };
        return [currCord, ...svgPointArr];
      }, []),
    };
  }

  getMinX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[0].x : 0;
  };

  getMaxX = () => {
    const { data } = this.props;
    return data.length > 0 ? data[data.length - 1].x : 0;
  };

  getMinY = () => {
    const { data } = this.props;
    return data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y);
  };

  getMaxY = () => {
    const { data } = this.props;
    return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
  };

  // GET SVG COORDINATES
  getSvgX = (x) => {
    const { viewBoxWidth } = this.props;
    const xPoint = x / this.getMaxX();
    return xPoint * viewBoxWidth;
  };

  getSvgY = (y) => {
    const { viewBoxHeigth } = this.props;
    const minY = this.getMinY();
    const maxY = this.getMaxY();
    return (
      (viewBoxHeigth * maxY - viewBoxHeigth * y) / //eslint-disable-line
      (maxY - minY)
    );
  };

  getChartHelpers = () => ({
    coordFuncs: {
      getMinX: this.getMinX,
      getMaxX: this.getMaxX,
      getMinY: this.getMinY,
      getMaxY: this.getMaxY,
      getSvgX: this.getSvgX,
      getSvgY: this.getSvgY,
    },
    svgData: this.state.svgData,
  });

  // partially apply event handler func's with data and coordFuncs
  handleEvent = (eventHandler) => {
    if (eventHandler) {
      return eventHandler(this.getChartHelpers());
    }
    return () => {};
  };

  render() {
    const {
      viewBoxWidth,
      viewBoxHeigth,
      onMouseMove,
      onMouseLeave,
      onClick,
      children,
      data,
      ...nativeSvgProps
    } = this.props;
    return (
      <svg
        {...nativeSvgProps}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeigth}`}
        onClick={this.handleEvent(onClick)}
        onMouseMove={this.handleEvent(onMouseMove)}
        onMouseLeave={this.handleEvent(onMouseLeave)}
      >
        {children(this.getChartHelpers())}
      </svg>
    );
  }
}
Svg.propTypes = {
  viewBoxWidth: PropTypes.number,
  viewBoxHeigth: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  children: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  onClick: PropTypes.func,
};
// DEFAULT PROPS
Svg.defaultProps = {
  viewBoxWidth: 0,
  viewBoxHeigth: 0,
  data: [],
  onMouseMove: () => {},
  onMouseLeave: () => {},
  onClick: () => {},
};
export default Svg;
