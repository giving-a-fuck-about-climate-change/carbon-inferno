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
  const ppmDiff = numChecker(diff.toFixed(2));
  if (diff > 0) {
    return `+${ppmDiff}`;
  }
  return ppmDiff;
};

export const calculatePercentageDiff = (previous, current) => {
	const diff = (current - previous) / current * 100; // eslint-disable-line
  const percentageDiff = numChecker(diff.toFixed(2));
  if (diff > 0) {
    return `+${percentageDiff}`;
  }
  return percentageDiff;
};

const createGraphDataSubset = arr =>
  arr.reduce((sum, item, idx) => {
    if (idx % 2 === 0) {
      const { date, ppm } = item;
      return [
        ...sum,
        {
          d: moment(date).format('MMM DD YYYY'),
          p: parseInt(ppm, 10),
          x: idx,
          y: parseInt(ppm, 10),
        },
      ];
    }
    return sum;
  }, []);

const transformGraphData = arr =>
  arr.map((item, idx) => {
    const { date, ppm } = item;
    return {
      d: moment(date).format('MMM DD YYYY'),
      p: parseInt(ppm, 10),
      x: idx,
      y: parseInt(ppm, 10),
    };
  });

export const createGraphData = (arr = [], rangeType = false) => {
  if (rangeType) {
    return createGraphDataSubset(arr);
  }
  return transformGraphData(arr);
};

export const todaysDate = () => moment().format('YYYY-MM-DD');

export const subDate = range =>
  moment()
    .subtract(1, range)
    .format('YYYY-MM-DD');

export const reverseArray = (arr = []) => arr.reverse();
