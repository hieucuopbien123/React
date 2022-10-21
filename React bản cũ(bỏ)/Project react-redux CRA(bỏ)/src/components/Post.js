import React, {Component} from 'react';

class Post extends Component{
  handleEvent = (onDelete, data) => {
    console.log(`First: truyền đi data ${data} và hàm số ${this.props.onAddNumber}`)
    console.log(data); console.log(this.props.onDelete);
    onDelete(data);
  }
  render(){
    console.log(`Finally: có props mới rồi ${this.props} thì tiến hành render cập nhật lại`)
    console.log(this.props);
    let {post, onDelete} = this.props
    return(
      <div>
        <h2>{ post.title }</h2>
        <button className="btn btn-danger" type="button" onClick={this.handleEvent.bind(this, onDelete, post.id)}>
          Remove
        </button>
        <hr/>
      </div>
    )
  }
}

export default Post;

