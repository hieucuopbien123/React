import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

//tại sao phải onChange gán title. Ta muốn khi ấn submit thì giá trị của của cái input được gửi đi. Ta có 2 cách 1 là dùng
//DOM lấy input đó đã biết. 2 là lưu lại vào title mỗi lần change-> rõ ràng là dùng DOM nó phức tạp, ta nên sử dụng kiểu
//lưu động tức là title thay đổi thì giá trị input cũng đổi như này sẽ ok hơn. Muốn sửa input value chỉ cần sửa title
//làm cho state thay đổi sẽ tự render lại
class NewPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.title){
            this.props.onSubmit(this.state.title);
        }
        this.setState({
            title: ""
        })
    }
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render(){
        // form inline k hoạt động trong react nx
        //flex giúp loại bỏ margin của các cái bên trong. inline thì bỏ margin chính nó
        //inline flex sẽ biến thẻ block thành inline
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <div className="d-flex my-2">
                        <input className="form-control d-inline-flex w-75" type="text" placeholder="Title..."
                            value={ this.state.title } onChange={ this.handleChange }/>
                        <button className="btn btn-outline-primary" type="submit">Add Post</button>
                    </div>
                </form>
            </div>
        )
    }
}
//redux cho phép gửi đi dữ liệu và action để nhận lại dữ liệu mới-> ta có thể gửi title đi r nhận về 1 title rỗng gán
//vào đây thoải mái-> nhưng như thế để làm gì đâu thà gán mẹ title rỗng ở đây như này. Còn gửi đi để cho cái list bắt là
//đc r
export default NewPost;