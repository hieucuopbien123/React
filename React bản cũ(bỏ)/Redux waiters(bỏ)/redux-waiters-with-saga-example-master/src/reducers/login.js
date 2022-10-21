import { createReducer, createActionResources } from 'redux-waiters'

export const loginAction = createActionResources('login');

const initialState = {
  login: false
};

export default createReducer({
  [loginAction.success]: (state) => {
    console.log("login reducer is working");
    console.log(state);
    return { ...state, login: true }
  }
}, initialState)
//tạo 2 thứ cho login là reducer và cái dùng cho isWaiting(k có thứ để dispatch vì login ta chơi kiểu khác)
//Tuy nhiên bất cứ cái gì khi tạo createActionResources như này đều sinh ra 1 reducer ngầm trong waiterReducer bắt
//3 action start, error, success