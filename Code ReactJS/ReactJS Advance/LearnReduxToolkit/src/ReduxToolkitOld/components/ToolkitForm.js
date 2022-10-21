import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { set } from "../reducers/formreducer";

const ToolkitForm = () => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(set({text: text})); // Truyền vào 1 object thì nó tự động thành 1 object trong payload
        setText("");
    }
    return(
        <form onSubmit={handleSubmit}>
            <TextField
                valiue={text}
                placeholder="Tookit saga text"
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Change Data</Button>
        </form>
    )
}

export default ToolkitForm;