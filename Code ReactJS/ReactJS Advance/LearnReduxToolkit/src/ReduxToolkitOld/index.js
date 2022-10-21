// # Module redux-toolkit / Dùng redux-logger / (bỏ bản cũ) Dùng kết hợp với redux-thunk riêng

import React from "react";
import ToolkitForm from "./components/ToolkitForm";
import ToolkitText from "./components/ToolkitText";
import { Typography } from "@material-ui/core";
import { store } from "./store/store";
import { Provider } from "react-redux";
import TookitSagaButton from "./components/ToolkitSagaButton";
import TookitSagaText from "./components/ToolkitSagaText";
import ToolkitThunkButton from "./components/ToolkitThunkButton";
import ToolkitThunkText from "./components/ToolkitThunkText"

//tối ưu code với toolkit, tạo store và action để dùng cực ngắn

const ReduxToolkitSaga = () => {
    return(
        <Provider store={store}>
            <Typography style={{fontWeight: "bolder"}}>Redux Toolkit Saga</Typography>
            <ToolkitForm/>
            <ToolkitText/>
            <br></br>
            <TookitSagaButton/>
            <TookitSagaText/>
            <br></br>
            <ToolkitThunkButton/>
            <ToolkitThunkText/>
            <br></br>
        </Provider>
    )
}

export default ReduxToolkitSaga;