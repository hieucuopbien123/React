import { createStore, applyMiddleware } from 'redux';
import waiter from 'redux-waiters';
import reducer from '../reducers';
import logger from 'redux-logger';
//dùng thêm đối số với withExtraArgument()
const api = "http://localhost:3000/";
const whatever = 42;

//chú ý withExtraArgument luôn là 1 biến, do có 2 biến nên ta gom làm 1 object
const middlewares = [waiter.withExtraArgument({api,whatever})];
const store = createStore(reducer, {}, applyMiddleware(...middlewares, logger));

export default store;

