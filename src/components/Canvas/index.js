import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  curry,
  fromPairs,
  groupBy,
  __,
  last,
  toPairs,
  values,
  equals,
  merge,
  pipe,
  useWith,
  mergeWith,
  map,
  objOf,
  always,
  cond,
  evolve,
  prop,
  has,
  both,
  ifElse,
  apply,
} from 'ramda';

const groupObjBy = curry(
  pipe(
    // Call groupBy with the object as pairs, passing only the value to the key function
    useWith(groupBy, [useWith(__, [last]), toPairs]),
    map(fromPairs),
  ),
);

const diffObjs = pipe(
  useWith(mergeWith(merge), [
    map(objOf('leftValue')),
    map(objOf('rightValue')),
  ]),
  groupObjBy(
    cond([
      [
        both(has('leftValue'), has('rightValue')),
        pipe(
          values,
          ifElse(apply(equals), always('common'), always('difference')),
        ),
      ],
      [has('leftValue'), always('onlyOnLeft')],
      [has('rightValue'), always('onlyOnRight')],
    ]),
  ),
  evolve({
    common: map(prop('leftValue')),
    onlyOnLeft: map(prop('leftValue')),
    onlyOnRight: map(prop('rightValue')),
  }),
);
// Component (TODO: Make it possible to also be a HOC )
class Canvas extends Component {
  componentDidMount() {
    const { canvasReference } = this.props;
    this.ctx = this[canvasReference].getContext('2d');
    this.drawLines();
  }
  // TODO: Just check the lenght of the data ?
  componentDidUpdate(nextProps) {
    const diff = diffObjs(this.props, nextProps);
    if (diff.difference) {
      this.ctx.clearRect(0, 0, this.props.svgWidth, this.props.svgHeight);
      this.drawLines();
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

  updateCanvas() {
    const { canvasReference } = this.props;
    this.ctx = this[canvasReference].getContext('2d');
    this.drawLines();
  }

  drawLines = () => {
    const { data } = this.props;

    const x = this.getX();
    const y = this.getY();

    // Drawing the line graph
    this.ctx.beginPath();
    this.ctx.moveTo(this.getSvgX(data[0].x), this.getSvgY(data[0].y));
    data.forEach((item) => {
      this.ctx.lineTo(this.getSvgX(item.x), this.getSvgY(item.y));
    });
    this.ctx.strokeStyle = '#e96972';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
    this.ctx.closePath();

    // Drawing the area graph
    this.ctx.beginPath();
    this.ctx.moveTo(this.getSvgX(data[0].x), this.getSvgY(data[0].y));
    data.forEach((item) => {
      this.ctx.lineTo(this.getSvgX(item.x), this.getSvgY(item.y));
    });

    this.ctx.lineTo(this.getSvgX(x.max), this.getSvgY(y.min));
    this.ctx.lineTo(this.getSvgX(0), this.getSvgY(0));
    this.ctx.strokeStyle = '#e96972';
    this.ctx.stroke();
    this.ctx.fillStyle = 'rgba(243, 172, 177, 0.3)';

    this.ctx.fill();
    this.ctx.closePath();

    // draw the top axis
    this.ctx.beginPath();
    this.ctx.setLineDash([10, 4]);
    this.ctx.moveTo(this.getSvgX(x.min), this.getSvgY(y.max));
    this.ctx.lineTo(this.getSvgX(x.max), this.getSvgY(y.max));
    this.ctx.strokeStyle = '#bdc3c7';
    this.ctx.stroke();
    this.ctx.lineWidth = 3;
    this.ctx.closePath();

    // draw the bottom axis
    this.ctx.beginPath();
    this.ctx.setLineDash([10, 4]);
    this.ctx.moveTo(this.getSvgX(x.min), 300);
    this.ctx.lineTo(this.getSvgX(x.max), 300);
    this.ctx.strokeStyle = '#bdc3c7';
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.setLineDash([]);

    // draw text
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.fillText(`${this.getY().max} PPM`, 0, 10);
    this.ctx.fillText(`${this.getY().min} PPM`, 0, 300);

    // saving the state of the graph.
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.props.svgWidth,
      this.props.svgHeight,
    );
    this.setState({
      imageData,
    });
  };

  handleMouseLeave = (event) => {
    const { getSvgX, getSvgY } = this;
    this.props.onMouseLeave({ getSvgX, getSvgY }, event);
  };

  handleMouseMove = (event) => {
    const canvas = document
      .getElementsByClassName('changer')[0]
      .getBoundingClientRect();
    const xer = event.clientX - canvas.left;
    this.ctx.putImageData(this.state.imageData, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(xer, -8);
    this.ctx.lineTo(xer, this.props.svgHeight);
    this.ctx.strokeStyle = '#e96972';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
    // const mouseX = parseInt(event.clientX - offsetX);
    // const mouseY = parseInt(event.clientY - offsetY);
  };
  handleMouseLeave = () => {
    this.ctx.putImageData(this.state.imageData, 0, 0);
  };

  render() {
    const { canvasReference } = this.props;
    return (
      <canvas
        className="changer"
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        style={{ width: '100%' }}
        ref={(canvasEl) => {
          this[canvasReference] = canvasEl;
        }}
        width={700} // TODO: Can make responsive ?
        height={300}
      />
    );
  }
}

export default Canvas;
Canvas.propTypes = {
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  data: PropTypes.array, //eslint-disable-line
  onMouseLeave: PropTypes.func,
  onMouseMove: PropTypes.func,
  xLabelSize: PropTypes.number, // TODO: Understand and Investigate to remove from here.
  yLabelSize: PropTypes.number, // TODO: Understand and Investigate to remove from here.
  style: PropTypes.object, // eslint-disable-line
  canvasReference: PropTypes.string,
  margin: PropTypes.object, //eslint-disable-line
};
// DEFAULT PROPS
Canvas.defaultProps = {
  canvasReference: 'myCanvas',
  svgHeight: 300,
  svgWidth: 800,
  data: [],
  className: 'linechart',
  onMouseMove: () => {},
  onMouseLeave: () => {}, // TODO: Possible refactor so that this is never called ? (Look into spreading props top svg)
  xLabelSize: 20,
  yLabelSize: 80,
  style: { display: 'block' },
  margin: {
    top: 40,
    left: 75,
    right: 0,
    bottom: 75,
  },
};
