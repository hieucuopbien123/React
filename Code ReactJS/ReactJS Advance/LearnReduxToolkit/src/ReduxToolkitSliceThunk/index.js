// # Module redux-toolkit / Bản mới dùng slice với createAsyncThunk / Dùng với redux-saga

import React from "react";
import ToolkitSliceForm from "./components/ToolkitSliceForm";
import ToolkitSliceText from "./components/ToolkitSliceText";
import { Typography } from "@material-ui/core";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ToolkitSliceThunkButton from "./components/ToolkitSliceThunkButton";
import ToolkitSliceThunkText from "./components/ToolkitSliceThunkText";
import ToolkitSliceSagaButton from "./components/ToolkitSliceSagaButton";
import ToolkitSliceSagaText from "./components/ToolkitSliceSagaText";

//phiên bản gọn nhất

const ReduxToolkitSliceThunk = () => {
    return(
        <Provider store={store}>
            <Typography style={{fontWeight: "bolder"}}>Redux Toolkit Thunk Slice</Typography>
            <ToolkitSliceForm/>
            <ToolkitSliceText/>
            <br></br>
            <ToolkitSliceThunkButton/>
            <ToolkitSliceThunkText/>
            <br></br>
            <ToolkitSliceSagaButton/>
            <ToolkitSliceSagaText/>
            <br/>
        </Provider>
    )
}

export default ReduxToolkitSliceThunk;