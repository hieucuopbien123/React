import { takeLatest, put, call } from "redux-saga/effects";
import { FETCHING } from "../actions/constants";
import { fetchDataSuccess, fetchDataFail } from "../actions/index";
import { getData } from "../api/callAPI";

function* handleFetchData(){
    try{
        const data = yield call(getData,"https://jsonplaceholder.typicode.com/posts");
        yield put(fetchDataSuccess(data.data[0].title));
    }catch(error){
        yield put(fetchDataFail(error.toString()));
    }
}

export function* catchFetchData(){
    yield takeLatest(FETCHING, handleFetchData);
}