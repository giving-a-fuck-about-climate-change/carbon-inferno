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

export const currentPpmSuccess = result => ({
  type: CURRENT_PPM_SUCCESS,
  result,
});

export const allPpmSuccess = result => ({
  type: ALL_PPM_SUCCESS,
  result,
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
// TODO: Update this limit =
export const fetchAllPpms = (endpoint = '/?ordering=-date?&limit=1') => async (
  dispatch,
  getState,
  api,
) => {
  try {
    dispatch(loadingPpms());
    const currentPpmResponse = await fetchData(`${api}${endpoint}`);
    const { count, results: [{ ppm }] = [{}] } = currentPpmResponse;
    dispatch(currentPpmSuccess(ppm));
    const { results } = await fetchData(
      `${api}/?ordering=+date&limit=${count}`,
    );
    dispatch(allPpmSuccess(results));
  } catch (err) {
    dispatch(failedPpmFetch(err));
  }
  return {};
};

export const fetchMonthWeekPpms = ({
  endpoint,
  rangeType,
}) => async (dispatch) => {
  try {
    dispatch(loadingPpms());
    const { results } = await fetchData(`${endpoint}`);
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
export const fetchYearPpms = ({ endpoint, rangeType }) => async (dispatch) => {
  const url = `${endpoint}`;
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
