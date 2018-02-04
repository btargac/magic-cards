import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import lister from './lister';

export default combineReducers({
  router: routerReducer,
  lister
})
