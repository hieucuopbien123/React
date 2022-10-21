import React from "react";

const NormalText = ({ text, asyncData }) => {
    console.log(text);
    return(
        <div>
            <div>{text}</div>
            <div>{asyncData}</div>
        </div>
    );
};
export default NormalText;