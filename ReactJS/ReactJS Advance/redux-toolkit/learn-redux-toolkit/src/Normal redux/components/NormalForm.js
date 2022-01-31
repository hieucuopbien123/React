import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";

const NormalForm = ({ setText }) => {
    const [submitData, setSubmitData] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        setText(submitData);
        setSubmitData("");
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    value={submitData}
                    onChange={(e) => setSubmitData(e.target.value)}
                    placeholder="Normal Text"
                />
                <Button type="submit">Change Data</Button>
            </form>
        </div>
    );
};
export default NormalForm;