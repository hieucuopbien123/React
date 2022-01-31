import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/sagaTest/sagaTest-slice";

const ToolkitSliceSagaButton = () => {
    const loading = useSelector(state => state.sagaSlice.loading)
    const dispatch = useDispatch();
    const fetchDataSaga = () => {
        dispatch(fetchData())
    }
    return(
        <Button disabled={loading} onClick={fetchDataSaga}>Toolkit Saga Fetch</Button>
    )
}

export default ToolkitSliceSagaButton;