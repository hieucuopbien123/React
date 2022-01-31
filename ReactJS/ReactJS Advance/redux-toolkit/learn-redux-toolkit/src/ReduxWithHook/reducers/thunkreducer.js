import { THUNK, THUNK_SUCCESS, THUNK_FAIL } from "../actions/thunk.js";

const initialState = {
    text: "Default Text THUNK",
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case THUNK:
            return {
                ...state,
                loading: true
            }
        case THUNK_SUCCESS:
            return {
                ...state,
                text: action.payload.text,
                loading: false
            }
        case THUNK_FAIL:
            return {
                ...state,
                text: action.payload.text,
                loading: false
            }
        default:
            return state;
    }
}