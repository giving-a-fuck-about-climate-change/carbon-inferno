import ppmReducer, { initialState } from '../reducer';
import {
  PPM_LOAD_ITEMS,
  CURRENT_PPM_SUCCESS,
  WEEK_MONTH_PPM_SUCCESS,
  ALL_PPM_SUCCESS,
  PPM_LOAD_ITEMS_FAILURE,
  YEARS_PPM_SUCCESS,
} from '../commands';
import { WEEK, MONTH, YEAR, FIVE_YEAR, ALL } from '../../../../constants';

describe('ppmReducer', () => {
  test('ppmReducer with no action', () => {
    expect(ppmReducer()).toEqual(initialState);
  });
  test('ppmReducer with PPM_LOAD_ITEMS action should update correct state', () => {
    expect(ppmReducer(initialState, { type: PPM_LOAD_ITEMS })).toEqual(
      initialState,
    );
  });
  test('ppmReducer with CURRENT_PPM_SUCCESS action should update correct state', () => {
    expect(
      ppmReducer(initialState, {
        type: CURRENT_PPM_SUCCESS,
        results: { currentPpm: 2, totalPpmCount: 10 },
      }),
    ).toEqual({ ...initialState, error: '', currentPpm: 2, totalPpmCount: 10 });
  });
  test('ppmReducer with WEEK_MONTH_PPM_SUCCESS action should update week results if type is WEEK', () => {
    expect(
      ppmReducer(initialState, {
        type: WEEK_MONTH_PPM_SUCCESS,
        results: [1, 2],
        rangeType: WEEK,
      }),
    ).toEqual({ ...initialState, loading: false, error: '', [WEEK]: [1, 2] });
  });
  test('ppmReducer with WEEK_MONTH_PPM_SUCCESS action should update week results if type is MONTH', () => {
    expect(
      ppmReducer(initialState, {
        type: WEEK_MONTH_PPM_SUCCESS,
        results: [1, 2],
        rangeType: MONTH,
      }),
    ).toEqual({ ...initialState, loading: false, error: '', [MONTH]: [1, 2] });
  });
  test('ppmReducer with YEARS_PPM_SUCCESS action should update week results if type is YEAR', () => {
    expect(
      ppmReducer(initialState, {
        type: YEARS_PPM_SUCCESS,
        results: [1, 2],
        rangeType: YEAR,
      }),
    ).toEqual({ ...initialState, loading: false, error: '', [YEAR]: [1, 2] });
  });
  test('ppmReducer with YEARS_PPM_SUCCESS action should update week results if type is YEAR', () => {
    expect(
      ppmReducer(initialState, {
        type: YEARS_PPM_SUCCESS,
        results: [1, 2],
        rangeType: FIVE_YEAR,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      [FIVE_YEAR]: [1, 2],
    });
  });
  test('ppmReducer with YEARS_PPM_SUCCESS action should update week results if type is YEAR', () => {
    expect(
      ppmReducer(initialState, {
        type: ALL_PPM_SUCCESS,
        results: [1, 2],
        rangeType: ALL,
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      [ALL]: [1, 2],
    });
  });
  test('ppmReducer with YEARS_PPM_SUCCESS action should update week results if type is YEAR', () => {
    expect(
      ppmReducer(initialState, {
        type: PPM_LOAD_ITEMS_FAILURE,
        error: 'error',
      }),
    ).toEqual({
      ...initialState,
      loading: false,
      error: 'error',
    });
  });
});
