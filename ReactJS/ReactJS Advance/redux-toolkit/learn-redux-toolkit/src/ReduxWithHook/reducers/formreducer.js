import { SET } from "../../Normal redux/actions/constants";

const initialState = {
    text: "Default text"
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET: 
            return{
                ...state,
                text: action.payload.text
            }
        default:
            return state;
    }
}