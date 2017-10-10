import moment from 'moment';

export const calculateAverage = (arr = []) => {
  const totalAmount = arr.reduce(
    (total, item) => total + parseInt(item.ppm, 10),
    0,
  );
  return totalAmount / arr.length;
};

export const numChecker = num => (isNaN(num) ? 0 : num);

export const calculateDiff = (previous, current) => {
  const diff = current - previous;
  return `${numChecker(diff.toFixed(2))}`;
};

export const calculatePercentageDiff = (previous, current) => {
  const diff = (current - previous) / current * 100;
  return numChecker(diff.toFixed(2));
};

export const createGraphData = (arr = []) =>
  arr.map((item, idx) => {
    const { date, ppm } = item;
    return {
      d: moment(date).format('MMM DD YYYY'),
      p: parseInt(ppm, 10),
      x: idx,
      y: parseInt(ppm, 10),
    };
  });

export const todaysDate = () => moment().format('YYYY-MM-DD');

export const subDate = range =>
  moment()
    .subtract(1, range)
    .format('YYYY-MM-DD');

export const reverseArray = (arr = []) => arr.reverse();
