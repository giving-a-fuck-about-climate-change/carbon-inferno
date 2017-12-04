import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ppmReducer from '../containers/ChartInfo/redux/reducer';

export default combineReducers({
  router: routerReducer,
  ppmInfo: ppmReducer,
});
