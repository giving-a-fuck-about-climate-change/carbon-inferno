import { createStore, applyMiddleware, compose } from 'redux';

import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers';
import config from '../config';

const { apiEndpoint } = config;

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk.withExtraArgument(`${apiEndpoint}/api/co2`),
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
