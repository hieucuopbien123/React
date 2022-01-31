import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import {selectText} from "../redux/form/form-slice";

const ToolkitSliceText = () => {
    const text = useSelector(selectText);
    return(
        <Typography>{text}</Typography>
    )
}

export default ToolkitSliceText;