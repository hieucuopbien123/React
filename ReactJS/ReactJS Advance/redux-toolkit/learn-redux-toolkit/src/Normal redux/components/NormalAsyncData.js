import { Typography } from "@material-ui/core";
import React from "react";

const NormalAsyncData = ({ text, loading }) => {
    return(
        <div>
            <Typography>{loading ? "Loading..." : text}</Typography>
        </div>
    );
};
export default NormalAsyncData;