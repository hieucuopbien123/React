import { combineReducers } from 'redux';
import { waiterReducer } from 'redux-waiters';
import counterReducer from './counter';

export default combineReducers({
  waiter: waiterReducer,
  counter: counterReducer
});
//waiterReducer là reducer của redux-waiters, phải có để dùng reducer này