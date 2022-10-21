import React from "react";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import App from "./App.js";

const Project = () => {
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default Project;