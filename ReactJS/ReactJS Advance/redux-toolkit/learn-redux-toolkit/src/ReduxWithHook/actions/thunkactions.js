import {
    THUNK,
    THUNK_SUCCESS,
    THUNK_FAIL,
} from './thunk';

export const setData = () => async dispatch => {
    try {
        dispatch({ type: THUNK });

        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await fetch(url)
        const responseBody = await response.json();
        dispatch({
            type: THUNK_SUCCESS,
            payload: {
                text: responseBody[0].title
            }
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: THUNK_FAIL,
            payload: {
                text: error.toString()
            }
        });
    }
}