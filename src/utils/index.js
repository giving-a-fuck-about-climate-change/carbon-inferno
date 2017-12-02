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

const transformItem = (item, count) => {
  const { date, ppm } = item;
  return {
    d: moment(date).format('MMM DD YYYY'),
    p: parseInt(ppm, 10),
    x: count,
    y: parseInt(ppm, 10),
  };
};
/*
 * Upto 1974 (790th item) we only have weekly results
 * so we want to show every item until then.
 * After that we sample the data weekly ( every 7th item)
 */
export const createGraphDataSubset = (arr = []) => {
  let count = 0;
  return arr.reduce((sum, item, idx) => {
    if (idx < 790) {
      count += 1;
      return [...sum, transformItem(item, count)];
    }
    if (idx % 7 === 0) {
      count += 1;
      return [...sum, transformItem(item, count)];
    }
    return sum;
  }, []);
};

export const transformGraphData = (arr = []) => arr.map(transformItem);

export const todaysDate = () => moment().format('YYYY-MM-DD');

export const subDate = range =>
  moment()
    .subtract(1, range)
    .format('YYYY-MM-DD');

export const reverseArray = (arr = []) => arr.reverse();

export const binarySearch = (data = [{}], target = 0) => {
  const end = data.length - 1;
  if (target >= data[0].svgX) {
    return data[0];
  }
  if (target <= data[end].svgX) {
    return data[end];
  }
  let middle = Math.round(data.length / 2);
  while (middle <= end) {
    // debugger; //eslint-disable-line
    if (target >= data[middle].svgX) {
      if (target <= data[middle - 1].svgX) {
        return data[middle];
      }
      middle -= 1;
    } else if (target <= data[middle].svgX) {
      if (target >= data[middle + 1].svgX) {
        return data[middle];
      }
      middle += 1;
    } else {
      return data[middle];
    }
  }
  return {};
};
