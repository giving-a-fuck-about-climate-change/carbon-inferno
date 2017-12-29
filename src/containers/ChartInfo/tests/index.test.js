import React from 'react';
import { shallow } from 'enzyme';
import { ChartInfo } from '..';
import { WEEK, MONTH, YEAR, FIVE_YEAR, ALL } from '../../../constants';

const getComponent = (props = {}, withInstance = true) =>
  (withInstance
    ? shallow(<ChartInfo {...props} />).instance()
    : shallow(<ChartInfo {...props} />));

describe('ChartInfo', () => {
  describe('componentDidMount', () => {
    test('should call fetchYearPpms with rangeType of "five_years" when component has mounted', () => {
      const fetchYearPpms = jest.fn();
      getComponent({ fetchYearPpms });
      expect(fetchYearPpms.mock.calls.length).toBe(1);
      expect(fetchYearPpms.mock.calls[0][0].rangeType).toBe(FIVE_YEAR);
    });
  });
  describe('handlePpmClick', () => {
    test('Should not query api if rangeType remains the same', () => {
      const fetchYearPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms }, false);
      comp.instance().handlePpmClick(FIVE_YEAR);
      expect(comp.state().rangeType).toEqual(FIVE_YEAR);
      expect(fetchYearPpms.mock.calls.length).toBe(1); // is 1 because called in componentDidMount
    });
    test('Should query api and update rangeType prop on state if rangeType has changed', () => {
      const fetchYearPpms = jest.fn();
      const fetchAllPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms, fetchAllPpms }, false);
      comp.instance().handlePpmClick(ALL);
      expect(comp.state().rangeType).toEqual(ALL);
      expect(fetchYearPpms.mock.calls.length).toBe(1);
      expect(fetchAllPpms.mock.calls.length).toBe(1);
    });
    // TODO: Add tests for loading
    // TODO: Add tests error handling
  });
  describe('queryApi', () => {
    test('should call fetch for "week" if no data exists', () => {
      const fetchMonthWeekPpms = jest.fn();
      const comp = getComponent({ fetchMonthWeekPpms, week: [] });
      comp.queryApi(WEEK);
      expect(fetchMonthWeekPpms.mock.calls.length).toBe(1);
      expect(fetchMonthWeekPpms.mock.calls[0][0].rangeType).toBe(WEEK);
    });
    test('should not call fetch for "week" if data exists', () => {
      const fetchMonthWeekPpms = jest.fn();
      const comp = getComponent({ fetchMonthWeekPpms, week: [{ data: 1 }] });
      comp.queryApi(WEEK);
      expect(fetchMonthWeekPpms.mock.calls.length).toBe(0);
    });
    test('should call fetch for "month" if no data exists', () => {
      const fetchMonthWeekPpms = jest.fn();
      const comp = getComponent({ fetchMonthWeekPpms, month: [] });
      comp.queryApi(MONTH);
      expect(fetchMonthWeekPpms.mock.calls.length).toBe(1);
      expect(fetchMonthWeekPpms.mock.calls[0][0].rangeType).toBe(MONTH);
    });
    test('should not call fetch for "month" if data exists', () => {
      const fetchMonthWeekPpms = jest.fn();
      const comp = getComponent({ fetchMonthWeekPpms, month: [{ data: 1 }] });
      comp.queryApi(MONTH);
      expect(fetchMonthWeekPpms.mock.calls.length).toBe(0);
    });
    test('should call fetch for "year" if no data exists', () => {
      const fetchYearPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms, year: [] });
      comp.queryApi(YEAR);
      expect(fetchYearPpms.mock.calls.length).toBe(2);
      expect(fetchYearPpms.mock.calls[1][0].rangeType).toBe(YEAR);
    });
    test('should not call fetch for "year" if data exists', () => {
      const fetchYearPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms, year: [{ data: 1 }] });
      comp.queryApi(YEAR);
      expect(fetchYearPpms.mock.calls.length).toBe(1);
    });
    test('should call fetch for "five_years" if no data exists', () => {
      const fetchYearPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms, five_years: [] });
      comp.queryApi(FIVE_YEAR);
      expect(fetchYearPpms.mock.calls.length).toBe(2);
      expect(fetchYearPpms.mock.calls[0][0].rangeType).toBe(FIVE_YEAR);
    });
    test('should not call fetch for "five_years" if data exists', () => {
      const fetchYearPpms = jest.fn();
      const comp = getComponent({ fetchYearPpms, five_years: [{ data: 1 }] });
      comp.queryApi(FIVE_YEAR);
      expect(fetchYearPpms.mock.calls.length).toBe(0);
    });
    test('should call fetch for" "all" if no data exists', () => {
      const fetchAllPpms = jest.fn();
      const comp = getComponent({ fetchAllPpms, all: [] });
      comp.queryApi(ALL);
      expect(fetchAllPpms.mock.calls.length).toBe(1);
    });
    test('should not call fetch for "all" if  data exists', () => {
      const fetchAllPpms = jest.fn();
      const comp = getComponent({ fetchAllPpms, all: [{ data: 1 }] });
      comp.queryApi(ALL);
      expect(fetchAllPpms.mock.calls.length).toBe(0);
    });
  });
});
