import React from 'react';
import { shallow } from 'enzyme';
import InfoColumnHOC, { InfoColDiv } from '..';
import { ALL, FIVE_YEAR } from '../../../constants';

const getComponent = (props = {}) => shallow(<InfoColumnHOC {...props} />);

describe('InfoColumnHOC Component', () => {
  describe('InfoColumnHOC render', () => {
    test('Should only render one info column div when rangeType is all', () => {
      const component = getComponent({ rangeType: ALL, currentPpm: 22 });
      expect(component.find(InfoColDiv).length).toEqual(1);
    });
    test('Should render three info column div when rangeType is not all', () => {
      const component = getComponent({ rangeType: FIVE_YEAR, currentPpm: 22 });
      expect(component.find(InfoColDiv).length).toEqual(3);
    });
  });
  describe('InfoColumnHOC willRecieveProps', () => {
    test('Should Update state if rangeType has changed', () => {
      const component = getComponent({ rangeType: ALL, currentPpm: 22 });
      expect(component.state()).toEqual({
        ppmDiff: 0,
        diffPPMSubHeader: 'IN THE PAST ',
        ppmPercentDiff: 0,
        diffPercentSubHeader: 'IN THE PAST  (%)',
      }); // confirm initalstate
      component.setProps({
        rangeType: FIVE_YEAR,
        data: [{ ppm: 12 }],
        current: 8,
      });
      expect(component.state()).toEqual({
        ppmDiff: '+10.00 PPM',
        diffPPMSubHeader: 'IN THE PAST five years',
        ppmPercentDiff: '+45.45 %',
        diffPercentSubHeader: 'IN THE PAST five years (%)',
      }); // confirm initalstate
    });
  });
  test('Should not update state if rangeType has not changed', () => {
    const component = getComponent({ rangeType: ALL, currentPpm: 22 });
    expect(component.state()).toEqual({
      ppmDiff: 0,
      diffPPMSubHeader: 'IN THE PAST ',
      ppmPercentDiff: 0,
      diffPercentSubHeader: 'IN THE PAST  (%)',
    }); // confirm initalstate
    component.setProps({
      rangeType: ALL,
      data: [{ ppm: 12 }],
      current: 8,
    });
    expect(component.state()).toEqual({
      ppmDiff: 0,
      diffPPMSubHeader: 'IN THE PAST ',
      ppmPercentDiff: 0,
      diffPercentSubHeader: 'IN THE PAST  (%)',
    });
  });
});
