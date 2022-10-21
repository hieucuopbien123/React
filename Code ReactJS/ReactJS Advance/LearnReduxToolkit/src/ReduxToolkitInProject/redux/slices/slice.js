// # Request API / Dùng axios

import Axios from "axios";
const { createSlice, createAsyncThunk, createDraftSafeSelector } = require("@reduxjs/toolkit");

const client = Axios.create({
    baseURL: "https://backend-nft-app.trava.finance",
    // Có thể custom nhiều thứ
    // headers: {
    //     "Custom-Language": "en"
    // },
    withCredentials: true
});

//người ta muốn dispatch nhiều action khác nhau 1 lúc thì sẽ gọi luôn hàm này chứ k gọi dp nhiều lần
//dùng Promise.all chỉ với các hàm xử lý mất tg
export const fetchAll = createAsyncThunk("slice/fetchData", async (_, thunkAPI) => {
    await Promise.all([
        thunkAPI.dispatch(fetchMeta()), 
        thunkAPI.dispatch(fetchRegistry({ expMin: 1 }))
    ]);
});
export const fetchMeta = createAsyncThunk("slice/fetchMeta", async () => {
    // 2 cách axios
    // const res = await client.get("/v1/cores/meta").then((res) => res.data);
    const res = await client.request({
        url: "/v1/cores/meta",
        method: "GET"
    }).then((res) => res.data);
    return res;
});
export const fetchRegistry = createAsyncThunk("slice/fetchRegistry", async (params) => {
    const { expMin = 1 } = params;
    const res = await client
        .get("/v1/cores", { params: { page: 1, limit: 5, expmin: expMin, expmax: 100000 }})
        .then((res) => res.data);
    return res;
});

const initialState = {
    loading: false,
    text: "Ấn để fetch",
    number: 0
};

const armourySlice = createSlice({
    name: "slice",
    initialState: initialState,
    reducers: {
        updateNumber: (state) => {
            state.number++;
        },
    },
    extraReducers: {
        [fetchAll.pending](state, _) {
            state.loading = true;
        },
        [fetchAll.fulfilled](state, _) {
            state.loading = false;
        },
        [fetchAll.rejected](state, _) {
            state.loading = false;
        },

        [fetchMeta.fulfilled](state, action) {
            state.loading = false;
        },
        [fetchMeta.rejected](state, _) {
            state.loading = false;
        },
        [fetchMeta.pending](state, _) {
            state.loading = true;
        },

        [fetchRegistry.pending](state, action) {
            state.loading = true;
        },
        [fetchRegistry.fulfilled](state, action) {
            state.text = action.payload.totalDocs;
            state.loading = false;
        },
        [fetchRegistry.rejected](state, error) {
            state.text = error.error.message;
            state.loading = false;
        },
    },
});

export default armourySlice.reducer;

//các hàm bình thường k xử lý mất tg thì dùng như action bth
export const { updateNumber } = armourySlice.actions;

//con mẹ nó cái selector phải dùng tên slice ghi trong store chứ éo phải file này vì cái cho vào store nó mới thành
//global
export const selectArmourySlice = state => state.reducerSlice;
export const selectText = createDraftSafeSelector(
    (state) => selectArmourySlice(state).text,
    (text) => {
        if (!text) return null;
        return {
            text
        };
    }
);
