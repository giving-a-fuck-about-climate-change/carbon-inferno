import moment from 'moment';

const transformItem = (item, count) => {
  const { date, ppm } = item;
  return {
    date: moment(date).format('MMM DD YYYY'),
    ppm: parseInt(ppm, 10),
    x: count, // where to appear on x axis.
    y: parseInt(ppm, 10), // where to appear on y axis.
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

const todaysDate = () => moment().format('YYYY-MM-DD');

const subDate = (range, amount = 1) =>
  moment()
    .subtract(amount, range)
    .format('YYYY-MM-DD');

export const dateRangQuery = (timePeriod, amount) =>
  `?ordering=+date&date__range=${subDate(timePeriod, amount)},${todaysDate()}`;
