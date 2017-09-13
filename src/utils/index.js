import moment from 'moment';

export const calculateAverage = (arr = []) => {
  const totalAmount = arr.reduce((total, item) => total + parseInt(item.ppm, 10), 0);
  return (totalAmount / arr.length);
};

export const calculateDiff = (previous, current) => (previous > current ?
  `- ${numChecker((previous - current).toFixed(2))}` :
  `+ ${numChecker((current - previous).toFixed(2))}`);

export const calculatePercentageDiff = (previous, current) => {
  const diff = ((previous - current) / previous) * 100;
  return numChecker(diff.toFixed(2));
};

export const getData = (label, statData = []) => statData.map(data => data[label]);

export const todaysDate = () => moment().format('YYYY-MM-DD');

export const subDate = range => moment().subtract(1, range).format('YYYY-MM-DD');


export const numChecker = num => (isNaN(num) ? 0 : num);

export const reverseArray = (arr = []) => arr.reverse();
