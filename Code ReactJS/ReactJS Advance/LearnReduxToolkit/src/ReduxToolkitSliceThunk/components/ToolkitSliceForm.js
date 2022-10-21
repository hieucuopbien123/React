import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setData } from "../redux/form/form-slice";

const ToolkitSliceForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setData({text: text}));//k cần chơi object
        setText("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <TextField
                value={text}
                placeholder="Defalt text toolkit slice"
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Change Data</Button>
        </form>
    )
}

export default ToolkitSliceForm;