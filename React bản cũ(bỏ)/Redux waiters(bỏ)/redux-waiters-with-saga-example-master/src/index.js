import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { compose } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import waiter from 'redux-waiters'

import reducers from './reducers'
import rootSaga from './sagas';
import logger from 'redux-logger'

import App from './App';
import * as serviceWorker from './serviceWorker';

const sagaMiddleWare = createSagaMiddleware()

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(waiter, sagaMiddleWare, thunk, logger)
  // other store enhancers if any
);
const store = createStore(reducers, enhancer);

sagaMiddleWare.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
