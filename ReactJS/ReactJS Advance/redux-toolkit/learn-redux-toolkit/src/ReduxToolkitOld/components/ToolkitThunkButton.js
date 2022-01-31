import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../reducers/thunkreducer";

const TookitThunkButton = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.thunkre.loading)
    const fetchDataThunk = () => {
        dispatch(fetchData("Hieu"));
    }
    return(
        <Button disabled={loading} onClick={fetchDataThunk}>Toolkit Thunk Fetch</Button>
    )
}

export default TookitThunkButton;