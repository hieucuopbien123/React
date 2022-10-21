import { combineReducers } from "redux";
import formreducer from "./formreducer";
import fetchreducer from "./fetchreducer";
import thunkreducer from "./thunkreducer";

export default combineReducers({
    formreducer,
    fetchreducer,
    thunkre: thunkreducer
})
