import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectText } from "../redux/thunkTest/thunk-slice";

const TookitSliceThunkText = () => {
    const {error, loading} = useSelector(state => state.thunkSlice);
    const text = useSelector(state => selectText(state));
    return(
        <Typography>{error ? ("Error appear: " + error) : (loading ? "Loading..." : text)}</Typography>
    )
}

export default TookitSliceThunkText;