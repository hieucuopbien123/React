import React, { Component } from "react";

class Item extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div>
                <h3><b>{this.props.text}</b></h3>
                <button className=" btn btn-outline-warning"
                    onClick={this.props.onDelete.bind(this,this.props.id)}>Remove Item</button>
            </div>
        )
    }
}

class ItemList extends Component{
    constructor(props){
        super(props);
    }
    render() {
        console.log("props of list phải có onDelete và mảng text, id: ", this.props);
        return(
            <div>
                {this.props.posts.map( item => (
                    <Item key={item.id} id={item.id} text={item.text} onDelete={this.props.onDelete}/>
                ))}
            </div>
        )
    }
}

export default ItemList;