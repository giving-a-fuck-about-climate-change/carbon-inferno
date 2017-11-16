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
  // TODO INVESTIGATE THIS ONE
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

      this.setState({ svgData }); //eslint-disable-line
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
    return x / this.getX().max * svgWidth; //eslint-disable-line
  };
  getSvgY = (y) => {
    const { svgHeight } = this.props;
    const gY = this.getY();
    return (
      (svgHeight * gY.max - svgHeight * y) / //eslint-disable-line
      (gY.max - gY.min)
    );
  };

  handleMouseMove = (event) => {
    event.persist();
    const { svgData } = this.state;
    this.props.onMouseMove(svgData, event);
  };

  handleMouseLeave = (event) => {
    event.persist();
    const { getSvgX, getSvgY } = this;
    this.props.onMouseLeave({ getSvgX, getSvgY }, event);
  };

  render() {
    const {
      svgHeight,
      svgWidth,
      className,
      style,
      widthPercent,
      preserveAspectRatio,
    } = this.props; // TODO: spread props here?
    return (
      <svg
        preserveAspectRatio={preserveAspectRatio} // TODO: Spread props here.
        width={widthPercent}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`} // TODO: Different props for this.
        style={style}
        className={className}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children({
          cordFuncs: {
            getX: this.getX,
            getY: this.getY,
            getSvgX: this.getSvgX,
            getSvgY: this.getSvgY,
          },
          svgHeight,
          svgWidth,
          svgData: this.state.svgData,
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
};
// DEFAULT PROPS
Svg.defaultProps = {
  svgHeight: 350,
  svgWidth: 800,
  data: [],
  className: 'linechart',
  onMouseMove: () => {},
  onMouseLeave: () => {}, // TODO: Possible refactor so that this is never called ? (Look into spreading props top svg)
  style: { display: 'block' },
  widthPercent: '100%',
  preserveAspectRatio: '',
};
