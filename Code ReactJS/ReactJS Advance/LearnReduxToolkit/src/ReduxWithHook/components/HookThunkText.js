import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const HookThunkText = () => {
    const { text, loading } = useSelector(state => state.thunkre);
    return(
        <div>
            <Typography>{loading ? "Loading..." : text}</Typography>
        </div>
    );
};
export default HookThunkText;