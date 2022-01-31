import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const HookText = () => {
    const text = useSelector(state => state.formreducer.text);
    return(
        <Typography>{text}</Typography>
    )
}

export default HookText;