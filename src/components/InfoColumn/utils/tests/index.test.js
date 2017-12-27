import { calculateDiff, calculatePercentageDiff, numChecker } from '..';

describe('Info Column Utils', () => {
  describe('calculateDiff', () => {
    test('Should return diff with "+" if greater than zero', () => {
      expect(calculateDiff(3, 5)).toBe('+2.00');
    });
    test('Should return diff with no plus sign if less than or equal to zero', () => {
      expect(calculateDiff(6, 5)).toBe('-1.00');
    });
    test('Should return zero if no params passed', () => {
      expect(calculateDiff()).toBe('0.00');
    });
  });
  describe('calculatePercentageDiff', () => {
    test('Should return diff with "+" if greater than zero', () => {
      expect(calculatePercentageDiff(2, 10)).toBe('+80.00');
    });
    test('Should return diff with no plus sign if less than or equal to zero', () => {
      expect(calculatePercentageDiff(10, 9)).toBe('-11.11');
    });
    test('Should return zero if no params passed', () => {
      expect(calculatePercentageDiff()).toBe('0');
    });
  });
  describe('numChecker', () => {
    test('Should zero if passed NaN', () => {
      expect(numChecker(NaN)).toBe(0);
    });
    test('Should parameter passed if not NaN', () => {
      expect(numChecker(9)).toBe(9);
    });
  });
});
