import { configureStore } from "@reduxjs/toolkit";
import formreducer from "./form/form-slice";
import thunkSlice from "./thunkTest/thunk-slice";
import createSagaMiddleware from "redux-saga";
import sagaSlice from "./sagaTest/sagaTest-slice";
import { fetchDataSaga } from "./sagaTest/sagaTest-slice";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

// getDefaultMiddleware bh k cần import nx mà tự là params của field middleware
export const store = configureStore({
    reducer: {
        formSlice: formreducer,
        thunkSlice,
        sagaSlice
    },
    //TH muốn bỏ 1 default middleware, vẫn dùng các default khác và dùng thêm các middleware của ta
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

//thg nhét như này vào file index.js saga riêng
function* rootSaga(){
    yield all([fetchDataSaga()]);
}

