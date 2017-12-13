import PropTypes from 'prop-types';

export const coordFuncsPropType = PropTypes.shape({
  getSvgX: PropTypes.func,
  getSvgY: PropTypes.func,
  getMinX: PropTypes.func,
  getMaxX: PropTypes.func,
  getMinY: PropTypes.func,
  getMaxY: PropTypes.func,
});

export const svgDataItem = PropTypes.shape({});

export const svgDataPropTypes = PropTypes.arrayOf(svgDataItem);
