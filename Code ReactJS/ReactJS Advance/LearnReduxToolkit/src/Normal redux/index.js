// # Module redux -> bản cũ (bỏ)
// # Module redux saga

import React from "react";
import { Typography } from "@material-ui/core";
import NormalForm from "./containers/NormalFormContainer";
import NormalText from "./containers/NormalTextContainer";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import { Provider } from "react-redux";
import logger from "redux-logger";
import NormalAsyncButtonContainer from "./containers/NormalAsyncButtonContainer";
import NormalAsyncDataContainer from "./containers/NormalAsyncDataContainer";
import createSagaMiddleware from "redux-saga";
import { catchFetchData } from "./sagas/saga"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(catchFetchData);

//File này chứa redux với sagas cơ bản như ban đầu

const NormalRedux = () => {
    return(
        <Provider store={store}>
            <Typography style={{fontWeight: "bolder"}}>Normal Redux</Typography>
            <NormalForm/>
            <NormalText/>
            <br></br>
            <NormalAsyncButtonContainer/>
            <NormalAsyncDataContainer/>
            <br></br>
        </Provider>
    );
};
export default NormalRedux;