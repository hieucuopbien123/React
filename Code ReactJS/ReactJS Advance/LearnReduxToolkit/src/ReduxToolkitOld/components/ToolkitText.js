import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const ToolkitText = () => {
    const text = useSelector(state => state.setter.text);
    return(
        <Typography>{text}</Typography>
    )
}

export default ToolkitText;