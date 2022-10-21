import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./slices/slice";

export default configureStore({
    reducer: {
        reducerSlice
    },
    devTools: process.env.NODE_ENV === "development",
});
