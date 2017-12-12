import { createSelector } from 'reselect';
import {
  createGraphDataSubset,
  transformGraphData,
  transformItem,
} from '../utils';

const ppmInfoAllSelected = (state, type) => state.ppmInfo[type];
const ppmInfoSelected = (state, type) => state.ppmInfo[type];

export const ppmInfoAllSelector = createSelector(
  ppmInfoAllSelected,
  createGraphDataSubset(transformItem, 790),
);

export const ppmInfoSelector = createSelector(
  ppmInfoSelected,
  transformGraphData(transformItem),
);
