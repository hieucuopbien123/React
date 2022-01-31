import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const ToolkitSliceSagaText = () => {
    const {loading, text} = useSelector(state => state.sagaSlice)
    return(
        <Typography>{loading ? "Loading..." : text}</Typography>
    )
}

export default ToolkitSliceSagaText;