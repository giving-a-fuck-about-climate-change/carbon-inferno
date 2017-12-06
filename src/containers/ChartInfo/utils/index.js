// @flow
import moment from 'moment';

import type { PpmPoint, PpmItem } from '../types';

const transformItem = (item, count: number): PpmPoint => {
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
export const createGraphDataSubset = (
  arr: Array<PpmItem> = [],
): Array<PpmPoint> => {
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
export const transformGraphData = (arr: Array<PpmItem> = []): Array<PpmPoint> =>
  arr.map(transformItem);

const todaysDate = (): string => moment().format('YYYY-MM-DD');

const subDate = (range: string, amount: number = 1): string =>
  moment()
    .subtract(amount, range)
    .format('YYYY-MM-DD');

export const dateRangQuery = (timePeriod: string, amount: number): string =>
  `?ordering=+date&date__range=${subDate(timePeriod, amount)},${todaysDate()}`;
