import moment from 'moment';

export const transformItem = (item = {}, count = 0) => {
  const { date = '', ppm = 0 } = item;
  return {
    date: date ? moment(date).format('MMM DD YYYY') : date,
    ppm: parseInt(ppm, 10),
    x: count, // where to appear on x axis.
    y: parseInt(ppm, 10), // where to appear on y axis.
  };
};
/*
 * Upto 1974 we only have weekly results
 * so we want to show every item until then.
 * After that we sample the data weekly ( every 7th item)
 * Our thershold is 790 (weekly data upto 1974)
 */
export const createGraphDataSubset = (transformer, threshold = 0) => (
  arr = [],
) => {
  let count = 0;
  return arr.reduce((sum, item, idx) => {
    if (threshold && idx < threshold) {
      count += 1;
      return [...sum, transformer(item, count)];
    }
    if (idx % 7 === 0) {
      count += 1;
      return [...sum, transformer(item, count)];
    }
    return sum;
  }, []);
};

export const transformGraphData = transformer => (arr = []) =>
  arr.map(transformer);

const subDate = (range, amount = 1) =>
  moment()
    .subtract(amount, range)
    .format('YYYY-MM-DD');
// TODO: Fix subDate
export const queryDateRange = (to, period, amount) =>
  `?ordering=+date&date__range=${subDate(period, amount)},${to}`;
