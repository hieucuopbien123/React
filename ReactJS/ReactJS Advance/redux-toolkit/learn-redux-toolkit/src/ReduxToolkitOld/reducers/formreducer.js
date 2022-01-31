import { createReducer } from "@reduxjs/toolkit";
import { createAction } from '@reduxjs/toolkit';

export const set = createAction('SET')

console.log(set());//{type: "SET", payload: undefined}
console.log(set);//ra hàm action creator
console.log(set.toString());//"SET"
console.log(set.type);//"SET"

const initialState = {
    text: "Default text toolkit"
}

//VD: nhiều action type khác nhưng xử lý như nhau
const isErrorAction = (action) => {
    return action.type.endsWith('FAIL')
}

//tạo reducer bằng object
// export const setter = createReducer(initialState, {
//     // [set.type]: state => ({ text: state.text + " Hello:))" })
//     [set]: (state, action) => ({ text: action.payload.text })//thật ra nó tự động gọi set.toString() ở đây
// })
//tạo reducer bằng builder callback
export const setter = createReducer(initialState, (builder) => {
    builder
        .addCase(set, (state, action) => ({ text: action.payload.text }))
        .addMatcher(isErrorAction, (state, action) => {
            state.errors = action.payload
        })
        .addDefaultCase((state, action) => {})
})
