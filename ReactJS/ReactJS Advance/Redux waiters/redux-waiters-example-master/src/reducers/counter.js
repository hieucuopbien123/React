import { createActionResources, createReducer } from 'redux-waiters';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms, ms));

const initialState = {
  counter: 0,
  error: false,
  msg: ''
};

export const addNumberAction = createActionResources('add number');
export const minusNumberAction = createActionResources('minus number');
//hàm createActionResources tạo ra 1 action resource đặt tên action thay cho cái hằng số ADD_NUMBER, MINUS_NUMBER thôi
console.log(addNumberAction);
console.log(minusNumberAction);

export default createReducer({
  [addNumberAction.start]: (state, extraVar) => {
    console.log('Start doing thing: ', state);
    console.log("extraVar: ", extraVar.api);
    console.log("Param: ", extraVar.param);
    return {
    ...state,
    error: false,
    msg: '1'
  }},
  [minusNumberAction.start]: (state) => ({
    ...state,
    error: false,
    msg: ''
  }),
  [addNumberAction.success]: (state) => {
    console.log("Success doing thing")
    return {
    ...state,
    counter: state.counter + 1,
    msg: '2'
  }},
  [minusNumberAction.error]: (state, msg) => ({
    ...state,
    error: true,
    msg
  })
}, initialState);
//đây là nội dung xử lý của reducer, khi start/success/error thì return ra state là gì=> ta có thể viết arrow function
//bth cx đc=> rõ ràng vẫn là reducer bth chỉ có cú pháp thay đổi chút thôi
//createReducer({object 3 TT mỗi action},defaultState)

export const addNumberCreator=(param)=>addNumberAction.waiterAction(async (dispatch, getState,{whatever,api})=>{
  console.log("call waiterAction: ", param);
  dispatch(addNumberAction.start({api, param}));
    //kể từ đối số thứ 2 là optional. 2 là getState lấy ra state hiện tại, lấy ra api và các biến đã truyền vào waiter
    //bằng hàm withExtraArgument. Muốn dùng đối số 3 truyền vào thì buộc khai báo đối số 2
    console.log(whatever);
    console.log(getState());
  await delay(1000);
  dispatch(addNumberAction.success());
});
//nếu gọi dispatch(addNumberCreator) thì nó sẽ chạy hàm trên dispatch cái action gì theo 3 trạng thái

export const minusNumberCreator = () => minusNumberAction.waiterAction(async (dispatch) => {
  try {
    dispatch(minusNumberAction.start());
    await delay(2000);
    throw new Error('error ocurred when minus number');
  } catch (error) {
    dispatch(minusNumberAction.error());
  }
});
//Ở ví dụ này nó cố tình để lỗi bằng cách k dispatch cái success

//Chú ý là việc dùng redux-waiter đã làm thay đổi luồng dữ liệu của redux ta biết: 
//Ở lần đầu tiên hiện lên: nó tạo resource, tạo các thứ store, reducer các kiểu,..r cuối cùng cx như luồng bth đó là 
//2 hàm map và render.
//Nó tạo ra 1 cái reducer ngầm thực hiện 2 action là start và end bao quanh action thực hiện là start của ta
//Khi có action, ví dụ hàm add thành công đi: đầu tiên gọi hàm dispatch đầu tiên-> mapStateToPropps->reducer ngầm thực
//hiện action start ngầm->bắt đầu gọi vào waiterAction->gọi vào reducer tự tạo hàm start bên trên->mapStateToProps
//thực hiện action start của ta là lệnh add và render lên->mapstateToProps->render->reducer ngầm thực hiện action end
//->reducer của ta chạy lệnh success->mapstatetoprops->render->thực hiện action success

//=>Các đặc điểm hay: hàm mapStateToProps được gọi rất nhiều lần giúp cho biến isWaiting được cập nhập trạng thái liên
//tục trong quá trình. Reducer ngầm được lập trình tự thực hiện tất cả theo thứ tự: start->add->end->success/error việc
//của ta chỉ là khai báo hàm start(là add trong reducer ngầm) và success(là end trong reducer ngầm). Sau đó các biến
//isWaiting và anyWaiting của mỗi action đều được tự động hết r, ta chỉ cần lấy ra dùng true thì hiện load mà thôi.
//Về khởi tọa: Dùng waiter thì nó tạo ra 1 reducer ngầm và k còn phát signal INIT như redux bth nx. Nó sẽ chạy vào saga 
//và xem có hàm waitActionForSaga được gọi không thì lưu lại r chạy 2 hàm map.
//Bản chất: reducer ngầm thực hiện nhiều action như v để phục vụ cho 2 biến waiting ta dùng. 
//Cái hàm add và success ta dùng bên trên thật ra kp là reducer thật mà là hàm return state của reducer để sau đó ông
//reducer ngầm mới chạy đơn giản là return dữ liệu đó. Reducer ngầm cũng tự tạo type riêng cho nó
//Redux waiter làm ẩn đi type của action-> nó cụ thể thành 1 hàm số truyền vào dispatch là xong.

//Việc xử lý code logic chỉ có duy nhất ở 3 chỗ-> start/success/error; waiting trong component app; hàm creator;
//Còn lại đều theo mẫu mà code thôi, dễ vl

//Chú ý về tính chặt chẽ: thông thường ta dispatch 1 action thì reducer sẽ dùng thông tin ta dispatch đó là 
//action.payload và state cũ để cho ra state mới. Thế nhưng với redux-waiters nó đã bỏ đi action.payload,ta vẫn có thể
//dùng bằng cách bind or thông qua function khác như trên. Thêm vào đó nó cho phép thêm các biến số ta custom vào 
//sẽ tự lưu ở đối số thứ 2 sau state của reducer tự tạo vd hàm add.start bên trên. Để có đối số đó có thể dùng 
//state hiện tại qua getState or biến ở ngoài qua withExtraArgument