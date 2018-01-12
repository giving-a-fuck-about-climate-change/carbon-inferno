import fetchData from '../../../utils/request';

import {
  PPM_LOAD_ITEMS,
  CURRENT_PPM_SUCCESS,
  PPM_LOAD_ITEMS_FAILURE,
  ALL_PPM_SUCCESS,
  YEARS_PPM_SUCCESS,
  WEEK_MONTH_PPM_SUCCESS,
} from './commands';

export const failedPpmFetch = error => ({
  error,
  type: PPM_LOAD_ITEMS_FAILURE,
});

export const loadingPpms = () => ({
  type: PPM_LOAD_ITEMS,
});

export const currentPpmSuccess = (currentPpm, totalPpmCount) => ({
  type: CURRENT_PPM_SUCCESS,
  results: {
    currentPpm,
    totalPpmCount,
  },
});

export const allPpmSuccess = results => ({
  type: ALL_PPM_SUCCESS,
  results,
});

export const weekMonthPpmsSuccess = ({ results, rangeType }) => ({
  type: WEEK_MONTH_PPM_SUCCESS,
  results,
  rangeType,
});

export const yearsPpmsSuccess = ({ results, rangeType }) => ({
  type: YEARS_PPM_SUCCESS,
  results,
  rangeType,
});

export const fetchCurrentPpms = (
  endpoint = '/?ordering=-date?&limit=1',
) => async (dispatch, getState, api) => {
  try {
    dispatch(loadingPpms());
    const currentPpmResponse = await fetchData(`${api}${endpoint}`);
    const { count, results: [{ ppm }] = [{}] } = currentPpmResponse;
    dispatch(currentPpmSuccess(parseFloat(ppm, 10), count));
  } catch (err) {
    dispatch(failedPpmFetch(err));
  }
  return {};
};

export const fetchAllPpms = (endpoint = '/?ordering=+date&limit=') => async (
  dispatch,
  getState,
  api,
) => {
  try {
    const { ppmInfo: { totalPpmCount } } = getState();
    dispatch(loadingPpms());
    const { results } = await fetchData(`${api}${endpoint}${totalPpmCount}`);
    dispatch(allPpmSuccess(results));
  } catch (err) {
    dispatch(failedPpmFetch(err));
  }
  return {};
};

export const fetchMonthWeekPpms = ({ endpoint, rangeType }) => async (
  dispatch,
  getState,
  api,
) => {
  try {
    dispatch(loadingPpms());
    const { results } = await fetchData(`${api}/${endpoint}`);
    dispatch(weekMonthPpmsSuccess({ results, rangeType }));
  } catch (err) {
    dispatch(failedPpmFetch(err));
  }
  return {};
};

/*
 The api does not return all entries for a given time period,
 if we want all entries for a time period we need to sepcify a count, here we query
 for the amount of entries for a time period and then make another query
 specifying that we want all the entries for that date range by using
 the count param.
*/
export const fetchYearPpms = ({ endpoint, rangeType }) => async (
  dispatch,
  getState,
  api,
) => {
  const url = `${api}/${endpoint}`;
  try {
    dispatch(loadingPpms());
    const { count } = await fetchData(`${url}`);
    const { results } = await fetchData(`${url}&limit=${count}`); // query for ppms limiting to count result
    dispatch(yearsPpmsSuccess({ results, rangeType }));
  } catch (err) {
    dispatch(failedPpmFetch(err));
  }
  return {};
};
