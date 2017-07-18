import moment from 'moment'

export const calculateAverage = (arr) => {
  const totalAmount = arr.reduce((total, item) => {
    return total + item.ppm;
  },0);
  return (totalAmount / arr.length);
}

export const calculateDiff = (previous, current) => {
  return previous > current ?
    `- ${(previous - current).toFixed(2)}` :
    `+ ${(current - previous).toFixed(2)}`;
}

export const calculatePercentageDiff = (previous, current) => {
  const diff = ((previous/current) / previous) * 100;
  return diff.toFixed(2);
}

export const getData = (label, weekData) => {
  const { results } = weekData;
  return results.map((data) => data[label]);
}

export const todaysDate = () => moment().format('YYYY-MM-DD');

export const subDate = (range) => moment().subtract(1, range).format('YYYY-MM-DD');
