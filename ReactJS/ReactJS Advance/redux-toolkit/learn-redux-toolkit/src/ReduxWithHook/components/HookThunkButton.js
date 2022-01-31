import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../actions/thunkactions";

const HookThunkButton = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.thunkre.loading);
    const fetch = () => {
        dispatch(setData());
    }
    return(
        <div>
            <Button disabled={loading} onClick={fetch}>Fetch Remote Data</Button>
        </div>
    );
};
export default HookThunkButton;