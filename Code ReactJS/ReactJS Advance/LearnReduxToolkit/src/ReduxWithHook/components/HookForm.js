import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setData } from "../actions/index";

const HookForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setData(text));
        setText("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <TextField
                value={text}
                placeholder={"Default hook text"}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Change text</Button>
        </form>
    )
}

export default HookForm;