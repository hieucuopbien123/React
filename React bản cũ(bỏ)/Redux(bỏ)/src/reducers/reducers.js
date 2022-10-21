import { EVENT1 } from "../actions/const.js"

var post = [{number: 1}]
const reducer = (state = post, action) =>{
    let copyState = state[0].number;
    switch(action.type){
        case EVENT1: 
            copyState += 1;
            break;
    }
    var res = [{number: copyState}]
    console.log(res)
    console.log("1", [{number: copyState}])
    console.log(`Fourth: reducer sẽ bắt được và dùng state ${state} và action ${action} để tạo ra state mới ${res}`);
    console.log(state); console.log(action); console.log(res); console.log(copyState);
    return res;
}

export default reducer;

//chú ý xử lý là độc lập, VD: ta làm 1 cái list và 1 cái nút-> ấn thì thêm vào list, ấn xóa thì xóa khỏi list, v thì ta
//k quan tâm cái list kia nó làm cái mẹ gì, chỉ cần biết là ta có state của nó và ta phải xử lý return 1 cái state có
//list mới. Còn trong mapStateToProps của list nó lấy cái state mới đó ra và chuyển đổi thành object lưu TT trong props.