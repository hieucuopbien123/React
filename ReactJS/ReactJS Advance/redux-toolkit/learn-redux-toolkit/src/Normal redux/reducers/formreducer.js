import { SET } from "../actions/constants";

const initialState = {
    text: "Default Text"
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET: 
            return {
                ...state,
                text: action.payload.text
            }
        default:
            return state;
    }
}