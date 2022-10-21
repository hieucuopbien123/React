import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const HookAsyncText = () => {
    const { text, loading } = useSelector(state => state.fetchreducer);
    return(
        <div>
            <Typography>{loading ? "Loading..." : text}</Typography>
        </div>
    );
};
export default HookAsyncText;