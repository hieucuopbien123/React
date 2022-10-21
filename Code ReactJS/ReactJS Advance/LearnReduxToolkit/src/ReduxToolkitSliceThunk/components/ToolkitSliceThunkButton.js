import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/thunkTest/thunk-slice";

const TookitSliceThunkButton = () => {
    const loading = useSelector(state => state.thunkSlice.loading)
    const dispatch = useDispatch();
    const fetchDataThunk = () => {
        dispatch(fetchData({name: "Hieu"}))
    }
    return(
        <Button disabled={loading} onClick={fetchDataThunk}>Toolkit Thunk Fetch</Button>
    )
}

export default TookitSliceThunkButton;