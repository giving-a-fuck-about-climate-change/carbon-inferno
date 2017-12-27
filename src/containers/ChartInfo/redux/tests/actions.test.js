import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { fetchMonthWeekPpms } from '../actions';
import config from '../../../../config';
import { WEEK } from '../../../../constants';
import {
  PPM_LOAD_ITEMS,
  PPM_LOAD_ITEMS_FAILURE,
  WEEK_MONTH_PPM_SUCCESS,
} from '../commands';

const { apiEndpoint } = config;
const middlewares = [thunk.withExtraArgument(`${apiEndpoint}/api/co2`)]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);

describe('ChartInfo Actions', () => {
  describe('fetchMonthWeekPpms', () => {
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });
    test('Should dispatch loading and success with result and correct rangeType when week/month req succeceds', () => {
      fetchMock.getOnce(`${apiEndpoint}/api/co2/weekMonth`, {
        results: [{ one: 1 }],
      });
      const store = mockStore();
      store
        .dispatch(
          fetchMonthWeekPpms({ endpoint: 'weekMonth', rangeType: WEEK }),
        )
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: PPM_LOAD_ITEMS },
            {
              rangeType: WEEK,
              results: [{ one: 1 }],
              type: WEEK_MONTH_PPM_SUCCESS,
            },
          ]);
        });
    });
    test('Should dispatch loading and error with error when week/month req fails', () => {
      fetchMock.mock(`${apiEndpoint}/api/co2/weekMonth`, { throws: 'err' });
      const store = mockStore();
      store
        .dispatch(
          fetchMonthWeekPpms({ endpoint: 'weekMonth', rangeType: WEEK }),
        )
        .then(() => {
          expect(store.getActions()).toEqual([
            { type: PPM_LOAD_ITEMS },
            {
              error: 'err',
              type: PPM_LOAD_ITEMS_FAILURE,
            },
          ]);
        });
    });
  });
});
