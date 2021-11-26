import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import postsSaga from '../saga';
import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(postsSaga);

export default store;