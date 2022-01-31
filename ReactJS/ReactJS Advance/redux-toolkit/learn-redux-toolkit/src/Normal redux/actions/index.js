import { SET, FETCHING, FETCH_SUCCESS, FETCH_FAIL } from "./constants";

export const setData = (data) => ({
    type: SET,
    payload: {
        text: data
    }
})

export const fetchData = () => ({
    type: FETCHING
})

export const fetchDataSuccess = (data) => ({
    type: FETCH_SUCCESS,
    payload: {
        text: data
    }
})

export const fetchDataFail = (error) => ({
    type: FETCH_FAIL,
    payload: {
        text: error
    }
})