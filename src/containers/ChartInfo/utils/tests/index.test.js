import {
  createGraphDataSubset,
  transformItem,
  transformGraphData,
  queryDateRange,
} from '..';

const generateData = (num = 0) => {
  const res = [];
  for (let i = 0; i <= num; i++) {
    res.push({ ppm: i, date: '2017-06-23' });
  }
  return res;
};

describe('ChartInfo Utils', () => {
  describe('transformItem', () => {
    test('should transform item to correct format', () => {
      expect(transformItem({ ppm: 223.4, date: '2017-06-23' }, 3)).toEqual({
        date: 'Jun 23 2017',
        ppm: 223,
        x: 3,
        y: 223,
      });
    });
    test('should transform item to correct format even if ppm is typeof string', () => {
      expect(transformItem({ ppm: '223.4', date: '2017-06-23' }, 3)).toEqual({
        date: 'Jun 23 2017',
        ppm: 223,
        x: 3,
        y: 223,
      });
    });
    test('should transform item to default item if no params passed', () => {
      expect(transformItem()).toEqual({
        date: '',
        ppm: 0,
        x: 0,
        y: 0,
      });
    });
  });
  describe('createGraphDataSubset', () => {
    const transfromer = item => item;
    test('Should take every 7th item if threshold not defined', () => {
      const arr = generateData(48);
      expect(createGraphDataSubset(transfromer)(arr).length).toEqual(7);
    });
    test('Should take every 7th item if threshold is zero', () => {
      const arr = generateData(48);
      expect(createGraphDataSubset(transfromer, 0)(arr).length).toEqual(7);
    });
    test('Should transform every item upto threshold, if threshold defined and sample every 7th after threshold', () => {
      const arr = generateData(48);
      expect(createGraphDataSubset(transfromer, 7)(arr).length).toEqual(13);
    });
    test('Should return empty array if no array passed', () => {
      expect(createGraphDataSubset(transfromer, 7)()).toEqual([]);
    });
  });
  describe('transformGraphData', () => {
    const transfromer = item => ({ ...item, ppm: item.ppm + 1 });
    test('Should apply transfomer func to every item in the array', () => {
      const arr = generateData(1);
      expect(transformGraphData(transfromer)(arr)).toEqual([
        { ppm: 1, date: '2017-06-23' },
        { ppm: 2, date: '2017-06-23' },
      ]);
    });
  });
  describe('queryDateRange', () => {
    // TODO: Fix subDate
    xtest('Should create query for querying between date ranges', () => {
      expect(queryDateRange('2017-06-23', 'years', 2)).toEqual(
        '?ordering=+date&date__range=',
      );
    });
  });
});
