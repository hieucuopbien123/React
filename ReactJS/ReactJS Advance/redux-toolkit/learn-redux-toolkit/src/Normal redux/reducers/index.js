import { combineReducers } from "redux";
import formreducer from "./formreducer";
import fetchreducer from "./fetchreducer";

export default combineReducers({
    formreducer, 
    fetchreducer
})
