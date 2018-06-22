import { combineReducers } from 'redux';
import issuance from './issuance'

const homeReducer = combineReducers({
  issuance,
});

export default homeReducer;