// @flow

import {
  PPM_LOAD_ITEMS,
  CURRENT_PPM_SUCCESS,
  PPM_LOAD_ITEMS_FAILURE,
  ALL_PPM_SUCCESS,
  YEARS_PPM_SUCCESS,
  WEEK_MONTH_PPM_SUCCESS,
} from '../redux/commands';

import { ALL, FIVE_YEAR, YEAR, WEEK, MONTH } from '../../../constants';

// ppm points we use to map over the chart
export type PpmPoint = {
  d: string, // Represents the date the ppm was recorded.
  p: number, // Represents the ppm value.
  x: number, // Represents where item will appear on x axis.
  y: number, // Represents where item will appear on y axis
};

// Type of item object we recieve from the api
export type PpmItem = {
  date: string,
  ppm: string,
};

// Used when querying the api
export type QueryAction = {
  endpoint: string, // which endpoint on the api we want to hit
  rangeType: string, // what is the range we are searching : TODO: update with a union
};

// redux actions

type RangeType = ALL | FIVE_YEAR | YEAR | WEEK | MONTH;

export type LoadAction = {
  type: PPM_LOAD_ITEMS,
};

export type CurrentPpmAction = {
  type: CURRENT_PPM_SUCCESS,
  result: number,
};
export type AllPpmAction = {
  type: ALL_PPM_SUCCESS,
  result: Array<PpmItem>,
};

export type WeekMonthAction = {
  type: WEEK_MONTH_PPM_SUCCESS,
  results: Array<PpmItem>,
  rangeType: RangeType,
};
export type YearsAction = {
  type: YEARS_PPM_SUCCESS,
  results: Array<PpmItem>,
  rangeType: RangeType,
};

export type PpmFailedAction = {
  type: PPM_LOAD_ITEMS_FAILURE,
  error: string,
};
