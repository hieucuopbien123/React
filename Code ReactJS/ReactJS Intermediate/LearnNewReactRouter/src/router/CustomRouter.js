import React, { useState, useLayoutEffect } from "react";
import { Router } from "react-router";

const CustomRouter = ({history, ...props}) => {
    const [state, setState] = useState({
        action: history.action,
        location: history.location
    })
    useLayoutEffect(() => history.listen(setState), [history]); // sai vì k unlisten
    return (
        <Router
            location={state.location}
            navigationtype={state.action}
            navigator={history}
        >{props.children}</Router>
    )
}
export default CustomRouter;