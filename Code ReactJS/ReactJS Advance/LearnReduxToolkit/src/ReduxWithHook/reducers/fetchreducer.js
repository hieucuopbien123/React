import { SET_FETCH } from "../actions/constants";

const initialState = {
    text: "Default Text Remote",
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_FETCH:
            return {
                ...state,
                text: action.payload.text,
                loading: action.payload.loading
            }
        default:
            return state;
    }
}