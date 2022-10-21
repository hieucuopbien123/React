import { createSlice } from "@reduxjs/toolkit";
import { put, takeLatest } from "redux-saga/effects";

function* handleFetchData(){
    try{
        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = yield fetch(url);//yield mọi hàm async trong function* ntn
        const responseBody = yield response.json();
        yield put(fetchDataSuccess({text: responseBody[0].title}));
    }catch(error){
        console.error(error);
        yield put(fetchDataFail({error: error.toString()}));
    }
}
export function* fetchDataSaga() {
    yield takeLatest(fetchData, handleFetchData);
}

const initialState = {
    text: "Default Toolkit Slice Saga Text",
    loading: false,
}

const sagaSlice = createSlice({
    name: "saga",
    initialState: initialState,
    reducers:{
        fetchData: state => {
            console.log("thi");
            state.loading = true
        },
        fetchDataSuccess: (state, action) => {
            state.loading = false
            state.text = action.payload.text
        },
        fetchDataFail: (state, action) => {
            state.loading = false
            state.text = action.payload.error
        }
    }
})

export default sagaSlice.reducer;
export const { fetchData, fetchDataSuccess, fetchDataFail } = sagaSlice.actions
//phải export như này thì hàm function* handleFetchData bên trên mới dùng được vì nó coi như là đặt thành các 
//biến có tên như v ở trong file để dùng fetchDataSuccess, fetchDataFail. Tương tự dùng trong thunk cũng phải export
