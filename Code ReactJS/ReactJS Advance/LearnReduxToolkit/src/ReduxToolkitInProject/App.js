// # Module redux-toolkit / Bản mới dùng slice với createAsyncThunk chuẩn nhất

import React from "react";
import { Typography, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegistry, selectText, updateNumber } from "./redux/slices/slice.js";

const ReduxToolkitSliceThunk = () => {
    //cái trap lớn nhất ở đây là cái useSelector thì cái tên slice là tên ta dùng trong store chứ kp tên trong
    //file redux
    const { loading, number } = useSelector(state => state.reducerSlice);
    const { text } = useSelector(state => selectText(state));
    const dp = useDispatch();
    const fetch = async () => {
        dp(updateNumber());
        await Promise.all[dp(fetchRegistry({ expMin: 1 }))];
    }
    return(
        <div>
            <Button onClick={fetch}>Fetch Trava API</Button>
            <Typography>{loading ? "Loading..." : text}</Typography>
            <Typography>Number: {number}</Typography>
        </div>
    )
}

export default ReduxToolkitSliceThunk;