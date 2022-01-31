import { FETCHING, FETCH_SUCCESS, FETCH_FAIL } from "../actions/constants";

const initialState = {
    text: "Default Text Remote",
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case FETCHING:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                text: action.payload.text,
                loading: false
            }
        case FETCH_FAIL:
            return {
                ...state,
                text: action.payload.text,
                loading: false
            }
        default:
            return state;
    }
}