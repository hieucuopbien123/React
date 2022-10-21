import { combineReducers } from 'redux'
import { waiterReducer } from 'redux-waiters'
import counterReducer from './counter'
import loginReducer from './login'
import appReducer from './app'

export default combineReducers({
  waiter: waiterReducer,
  counter: counterReducer,
  login: loginReducer,
  app: appReducer
})
//gom reducer