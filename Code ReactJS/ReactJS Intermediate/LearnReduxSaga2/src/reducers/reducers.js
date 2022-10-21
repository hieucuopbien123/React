// # Dùng các thư viện chức năng / Dùng uuid

import { ADD_POST, REMOVE_POST } from "../actions/const.js"
import uuidv4 from "uuid/v4"

var defaultPost = [
    { text: "Default title", id: uuidv4() }
]
export default (state = defaultPost, action) => { // éo cần copy
    console.log(state)
    switch(action.type){
        case ADD_POST: 
            return [...state, ...[{ text: action.text, id: uuidv4() }]];
        case REMOVE_POST:
            return state.filter(item => (item.id != action.id) ? item : null);
        default:
            return state;
    }
}

//chú ý có list là phải có id k cần biết có thẻ li hay k. Ví dụ mỗi lần addPost bên cạnh text ta nhận cần thêm các thứ
//khác như id chẳng hạn thì phần reducer là phần nhận state và trả ra thông tin thì ta phải thêm vào sao cho thông tin 
//trả ra có id để khi render list phải có props key như ta đã biết. 