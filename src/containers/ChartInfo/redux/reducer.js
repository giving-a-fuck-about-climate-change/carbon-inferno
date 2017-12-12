import {
  PPM_LOAD_ITEMS,
  CURRENT_PPM_SUCCESS,
  WEEK_MONTH_PPM_SUCCESS,
  ALL_PPM_SUCCESS,
  PPM_LOAD_ITEMS_FAILURE,
  YEARS_PPM_SUCCESS,
} from './commands';

import { WEEK, MONTH, YEAR, FIVE_YEAR, ALL } from '../../../constants';

export const initialState = {
  loading: true,
  error: '',
  [WEEK]: [],
  [MONTH]: [],
  [YEAR]: [],
  [FIVE_YEAR]: [],
  [ALL]: [],
  currentPpm: 0,
};
// TODO: Update consitant naming (action.result , action.results) choose one!
function ppmReducer(state = initialState, action = {}) {
  switch (action.type) {
    case PPM_LOAD_ITEMS: {
      return {
        ...state,
        loading: true,
      };
    }
    case CURRENT_PPM_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        currentPpm: action.result,
      };
    }
    case WEEK_MONTH_PPM_SUCCESS: {
      const { results, rangeType } = action;
      return {
        ...state,
        loading: false,
        error: '',
        [rangeType]: results,
      };
    }
    case YEARS_PPM_SUCCESS: {
      const { results, rangeType } = action;
      return {
        ...state,
        loading: false,
        error: '',
        [rangeType]: results,
      };
    }
    case ALL_PPM_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        [ALL]: action.result,
      };
    }
    case PPM_LOAD_ITEMS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export default ppmReducer;
