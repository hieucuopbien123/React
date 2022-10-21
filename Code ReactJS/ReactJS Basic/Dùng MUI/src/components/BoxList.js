// Basic

import React from 'react';

//chia nhỏ đến mức mỗi component là 1 cấp độ có dữ liệu nhỏ nhất để xử lý. VD các thẻ li bên trong có dữ liệu
//thay đổi->tái sử dụng đc và cần xử lý nên chia ra 1 component mới. Thế nếu bên trong li lại có các thẻ khác thì
//nếu các thẻ khác có dữ liệu thay đổi thì lại tạo class mới, nếu k thì viết bth
const BoxItem = (props) => {
    return (
        <li>{props.content}</li>
    )
}

const BoxList = (props) => {
    var BoxItems = props.itemBox.map((item) => (
        <BoxItem content={item}/>
    ))
    return (
        <ul className="box-list">
            {BoxItems}
        </ul>
    )
}

export default BoxList;