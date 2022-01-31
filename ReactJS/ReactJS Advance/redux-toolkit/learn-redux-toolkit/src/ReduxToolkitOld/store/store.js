import { configureStore } from "@reduxjs/toolkit";
import { setter } from "../reducers/formreducer";
import { thunk as thunkre } from "../reducers/thunkreducer";
import thunk from 'redux-thunk';
import logger from "redux-logger";

export const store = configureStore({
    reducer: {
        setter,
        thunkre: thunkre
    },//k đặt vào 1 object thì chỉ khi có 1 reducer thì các components có thể lấy data trực tiếp từ reducer đó
    middleware: [thunk, logger],//thêm nhiều vào mảng
    devTools: process.env.NODE_ENV !== 'production',
})