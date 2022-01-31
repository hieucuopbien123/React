import { Button } from "@material-ui/core";
import React from "react";

const NormalAsyncButton = ({ fetch, loading }) => {
    return(
        <div>
            <Button disabled={loading} onClick={fetch}>Fetch Remote Data</Button>
        </div>
    );
};
export default NormalAsyncButton;