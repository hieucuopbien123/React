//module form
import { createSlice ,createAction } from '@reduxjs/toolkit';

//nếu slice này cần bắt action khác bên ngoài thì dùng extraReducers + build.addCase => khi đó truyền vào type action
//bên ngoài đó đối số 1 của addCase. VD action được tạo bằng createAction bên dưới or export từ createSlice khác
export const otherAction = createAction("testOtherAction");

const initialState = {
    text: "Default toolkit slice text"
}
//create slice cũng chỉ là 1 cách viêt gộp createAction và createReducer bằng cách gom vào 1 module
const formSlice = createSlice({
    name: 'form',
    initialState: initialState,
    reducers: {
        setData: (state, action) => { 
            state.text = action.payload.text
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(otherAction, (state, action) => {
    //             console.log("Handle action bên ngoài")
    //         })
    //         .addDefaultCase((state, action) => {})
    // }
    //Tương tự extraReducers cũng có thể dùng object, tự động có default
    extraReducers: {
        [otherAction]: (state, action) => {
            state.text = action.payload.text;
        }
    }
})

export const { setData } = formSlice.actions
export default formSlice.reducer

//người ta còn export kiểu này để useSlector cho nhanh nhưng thực ra càng khó hiểu thôi
export const selectText = state => state.formSlice.text;