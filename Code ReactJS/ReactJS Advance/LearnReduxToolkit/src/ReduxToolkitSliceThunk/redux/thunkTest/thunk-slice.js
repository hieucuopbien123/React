import { createSlice, createAsyncThunk, createDraftSafeSelector } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchData = createAsyncThunk(
    'testThunk/fetchData',
    async(data, thunkParams) => {//hàm async arrow
        console.log(data.name);
        console.log(thunkParams);
        //hàm async trong createAsyncThunk có 2 tham số. 1 là data truyền vào, nếu muốn truyền
        //nhiều biến buộc nhét vào object
        //2 là biến object chứa các giá trị mặc định có thể cần dùng để thao tác thêm, gồm:
        /*dispatch của store, getState lấy state hiện tại, extra là tham số truyền vào lúc thiết
        lập redux-thunk middleware(thg là k dùng), requestId là giá trị string lạ sinh ra khi thunk
        được gọi, signal cho biết liệu 1 phần khác trong logic có đánh dấu yêu cầu này cần hủy hay k
        (phức tạp), rejectWithValue là 1 hàm tiện ích cho phép ta ép luồng trả về rejected với 1
        giá trị payload nào  */

        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await fetch(url)
        const responseBody = await response.json();
        
        if(responseBody[0].title){
            return {text: responseBody[0].title};
        }else{
            throw Error("Data undefined rồi");
        }
        //kiểm lỗi nó tự động bắt lỗi các hàm bất đồng bộ. Nếu ta fetch thành công thì nó sẽ k báo lỗi
        //nếu sau đó data ta lấy bị sai nó cx k báo lỗi mà đơn giản là undefined => ta có thể tự check nếu
        //thích nhưng thg là chả cần vì chỉ cần kiểm lỗi lúc fetch k thành công. saga cx v
        //Ở đây nếu title k tồn tại nó k báo lỗi mà chỉ trả ra undefined
    }
)

const initialState = {
    text: "Default Toolkit Slice Thunk Text",
    loading: false,
    error: null
}

///khi dùng createAsyncThunk phải nhét vào extraReducer.
//nó tạo ra 3 type action tương ứng với 3 trạng thái của biến promise và tự động dispatch bắt bên dưới
//Cấu trúc kiểu này thường sử dụng. export createAsyncThunk luôn chứ k export action
const thunkSlice = createSlice({
    name: "thunk",
    initialState: initialState,
    extraReducers: {
        [fetchData.pending]: (state, action) => {
            state.loading = true
        },
        //thực ra là "testThunk/fetchData/pending" ở đây
        [fetchData.fulfilled]: (state, action) => {
            state.loading = false
            state.text = action.payload.text
        },
        [fetchData.rejected]: (state, action) => {
            console.error(action)
            state.loading = false
            state.error = "Error"
        }
    }
})

export default thunkSlice.reducer;

export const selectThunkSlice = state => state.thunkSlice;

export const selectText = createDraftSafeSelector(
    selectThunkSlice,
    selectedSlice => {
        return selectedSlice.text;
    }
)

// # Dùng thư viện reselect
//test createSelector của thư viện reselect. Nó là hàm dùng chung của JS chứ kp chỉ của dự án react nên dùng
//ez như này cx đc
let exampleState = {
    getUsersOptions: 'all',
    users: [
        { name: 'a', age: 12 },
        { name: 'b', value: 19 },
    ]
}
const selectUsers = state => state.users;
const selectGetUsersOptions = state => state.getUsersOptions;
const getStateSelector = createSelector(
    [selectUsers, selectGetUsersOptions],//có thể truyền dưới dạng mảng
    (users, getUsersOptions) => ({ users, getUsersOptions })
)
console.log (getStateSelector(exampleState));
