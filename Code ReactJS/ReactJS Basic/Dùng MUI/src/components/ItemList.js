import React from 'react';

const ListItem = (props) => {
    return (
        <li>
            <h2>{props.allProps.title}</h2>
            <div>
                {props.allProps.info}
            </div>
        </li>
    )
}

const ItemList = (props) => {
    var itemArray = props.itemList.map((item,index) => (
        <ListItem allProps={item} />
    ))
    //lại mắc cái lỗi dấu () éo phải {} đó là cách làm nhanh.Ta có thể cồng kềnh hơn với map(()=>{return (<component>)})
    //ta k nên truyền như trên mà nên gom vào truyền 1 props object thoi,VD:item.allProps.title, item.allProps.content
    return (
        <ul className="item-list">
            {itemArray}
        </ul>
    )
}

export default ItemList;