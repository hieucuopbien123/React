import { SET, SET_FETCH } from "./constants";

export const setData = (data) => ({
    type: SET,
    payload: {
        text: data
    }
})

export const setFetchData = (data) => ({
    type: SET_FETCH,
    payload: {
        text: data.text,
        loading: data.loading
    }
})
