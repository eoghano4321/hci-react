// reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './AuthReducer';

const RootReducer = combineReducers({
  auth: authReducer,
  // add more reducers for additional slices
});

export default RootReducer;
