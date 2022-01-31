import { createReducer, createAction } from "@reduxjs/toolkit";

//dùng thunk chay như bình thường

const initialState = {
    text: "Default Thunk text",
    loading: false,
    error: null
}

const fetchThunk = createAction("fetchThunk");
const fetchThunkSuccess = createAction("fetchThunkSuccess");
const fetchThunkFail = createAction("fetchThunkFail");

export function fetchData(name) {
    return async function (dispatch) {
        try{
            dispatch(fetchThunk());
            console.log("Name: ", name);

            const url = "https://jsonplaceholder.typicode.com/posts";
            const response = await fetch(url)
            const responseBody = await response.json();
            dispatch(fetchThunkSuccess({text: responseBody[0].title}));
            //luôn dispatch param là 1 object nhé
        }catch(error){
            dispatch(fetchThunkFail({error: error.toString()}));
        }
    }
}

export const thunk = createReducer(initialState, {
    [fetchThunk]: (state, action) => {
        state.loading = true
        state.error = null
    },
    [fetchThunkSuccess]: (state, action) => {
        state.loading = false
        state.text = action.payload.text
        state.error = ""
    },
    [fetchThunkFail]: (state, action) => {
        state.loading = false
        state.error = action.payload.error
        state.text = ""
    }
})