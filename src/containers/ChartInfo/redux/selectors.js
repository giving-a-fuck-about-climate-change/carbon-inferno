import { createSelector } from 'reselect';
import { createGraphDataSubset, transformGraphData } from '../../../utils';

const ppmInfoAllSelected = (state, type) => state.ppmInfo[type];
const ppmInfoSelected = (state, type) => state.ppmInfo[type];

export const ppmInfoAllSelector = createSelector(
  ppmInfoAllSelected,
  createGraphDataSubset,
);

export const ppmInfoSelector = createSelector(
  ppmInfoSelected,
  transformGraphData,
);
