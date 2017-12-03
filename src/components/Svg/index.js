import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Component (TODO: Make it possible to also be a HOC )
class Svg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgData: props.data.reduce((svgPointArr, point) => {
        const currCord = {
          svgX: this.getSvgX(point.x),
          svgY: this.getSvgY(point.y),
          d: point.d,
          p: point.p,
        };
        return [currCord, ...svgPointArr];
      }, []),
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.length !== prevProps.data.length) {
      const svgData = this.props.data.reduce((svgPointArr, point) => {
        const currCord = {
          svgX: this.getSvgX(point.x),
          svgY: this.getSvgY(point.y),
          d: point.d,
          p: point.p,
        };
        return [currCord, ...svgPointArr];
      }, []);
      this.setState({ svgData });
    }
  }

  // GET X & Y || MAX & MIN
  getX = () => {
    const { data } = this.props;
    return {
      min: data[0].x,
      max: data[data.length - 1].x,
    };
  };
  // TODO: Refactor this !!!!!
  getY = () => {
    const { data } = this.props;
    return {
      min: data.reduce((min, p) => (p.y < min ? p.y : min), data[0].y),
      max: data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y),
    };
  };
  // GET SVG COORDINATES
  getSvgX = (x) => {
    const { svgWidth } = this.props;
    const xPoint = x / this.getX().max;
    return xPoint * svgWidth;
  };
  getSvgY = (y) => {
    const { svgHeight } = this.props;
    const gY = this.getY();
    return (
      (svgHeight * gY.max - svgHeight * y) / //eslint-disable-line
      (gY.max - gY.min)
    );
  };

  cordFuncs = {
    getX: this.getX,
    getY: this.getY,
    getSvgX: this.getSvgX,
    getSvgY: this.getSvgY,
  };

  handleEvent = eventHandler => (event) => {
    if (eventHandler) {
      if (this.props.persistEvent) {
        event.persist();
      }
      eventHandler(event, {
        cordFuncs: this.cordFuncs,
        data: this.state.svgData,
      });
    }
  };

  render() {
    const {
      svgHeight,
      svgWidth,
      className,
      widthPercent,
      preserveAspectRatio,
      onMouseMove,
      onMouseLeave,
    } = this.props;
    return (
      <svg
        preserveAspectRatio={preserveAspectRatio}
        width={widthPercent}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className={className}
        onMouseMove={this.handleEvent(onMouseMove)}
        onMouseLeave={this.handleEvent(onMouseLeave)}
      >
        {this.props.children({
          cordFuncs: {
            getX: this.getX,
            getY: this.getY,
            getSvgX: this.getSvgX,
            getSvgY: this.getSvgY,
          },
          data: this.state.svgData,
        })}
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
  style: PropTypes.object, //eslint-disable-line
  widthPercent: PropTypes.string,
  preserveAspectRatio: PropTypes.any, //eslint-disable-line
  persistEvent: PropTypes.bool,
};
// DEFAULT PROPS
Svg.defaultProps = {
  svgHeight: 350,
  svgWidth: 800,
  data: [],
  className: 'linechart',
  onMouseMove: () => {},
  onMouseLeave: () => {},
  style: { display: 'block' },
  widthPercent: '100%',
  preserveAspectRatio: '',
  persistEvent: false,
};
