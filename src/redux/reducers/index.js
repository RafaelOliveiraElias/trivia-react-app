import { combineReducers } from 'redux';
import token from './token';
import user from './user';

const rootReducer = combineReducers({
  user,
  token,
});

export default rootReducer;
