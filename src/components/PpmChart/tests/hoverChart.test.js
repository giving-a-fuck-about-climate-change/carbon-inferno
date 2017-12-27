import React from 'react';
import { shallow } from 'enzyme';

import HoverChart from '../hoverChart';

const getComponent = (props = {}) => shallow(<HoverChart {...props} />);
// TODO: How to actually test render functions ??
describe('HoverChart Component', () => {
  describe('setSvgData', () => {
    test('Should return an empty array if no items passed', () => {
      const comp = getComponent();
      expect(comp.state().svgData).toEqual([]);
    });
  });
});
