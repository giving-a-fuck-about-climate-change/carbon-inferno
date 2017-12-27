import React from 'react';
import { shallow } from 'enzyme';
import { ChartInfo } from '..';
import { FIVE_YEAR, ALL } from '../../../constants';

const getComponent = (props = {}, withInstance = true) =>
  (withInstance
    ? shallow(<ChartInfo {...props} />).instance()
    : shallow(<ChartInfo {...props} />));

describe('ChartInfo', () => {
  describe('componentDidMount', () => {
    test('should call queryApi when component has mounted', () => {
      const queryApiMock = jest.fn();
      getComponent({ queryApi: queryApiMock });
      expect(queryApiMock.mock.calls.length).toBe(1);
    });
  });
  describe('handlePpmClick', () => {
    test('Should not query api if rangeType remains the same', () => {
      const queryApiMock = jest.fn();
      const comp = getComponent({ queryApi: queryApiMock }, false);
      comp.instance().handlePpmClick(ALL);
      expect(comp.state().rangeType).toEqual(ALL);
      expect(queryApiMock.mock.calls.length).toBe(1); // is 1 because called in componentDidMount
    });
    test('Should query api and update rangeType prop on state if rangeType has changed', () => {
      const queryApiMock = jest.fn();
      const comp = getComponent({ queryApi: queryApiMock }, false);
      comp.instance().handlePpmClick(FIVE_YEAR);
      expect(comp.state().rangeType).toEqual(FIVE_YEAR);
      expect(queryApiMock.mock.calls.length).toBe(2);
    });
    // TODO: Add tests for loading
    // TODO: Add tests error handling
  });
});
