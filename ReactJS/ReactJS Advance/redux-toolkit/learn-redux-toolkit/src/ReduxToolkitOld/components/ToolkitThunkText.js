import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const TookitThunkText = () => {
    const {text, loading, error} = useSelector(state => state.thunkre);
    return(
        <Typography>{error ? ("Error appear: " + error) : (loading ? "Loading..." : text)}</Typography>
    )
}

export default TookitThunkText;