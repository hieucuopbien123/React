import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from '../components/Post';
import { deletePost } from '../actions';

function PostList({newPosts, onDelete}) {
  return (
    <div>
      {newPosts.map(post => {
        return (
          <Post post={ post } key={ post.id } onDelete={ onDelete } />
        );
      })}
    </div>
  );
}

function mapDispatchToProps(dispatch){
  return{
    onDelete(id){
      console.log(`Second: hàm số này gọi đến hàm onDelete với cái đối sô kia`);
      dispatch(deletePost(id));
      console.log("Third: sau khi có actions nó dispatch action đó=>chưa kịp kết thúc hàm tức là \
      đang dispatch dở thì reducer bắt và làm luôn nên cả quá trình coi như hàm onAddNumber còn chưa kết thúc");
    }
  } 
}

function mapStateToProps(state, ownProps){
  var res = { newPosts: state.posts };
  console.log(`Fifth: hàm mapStateToProps gắn với object đó sẽ bắt state mới từ reducer ${state} kết hợp với ownProps
    ${ownProps} để tạo ra 1 props cuối cùng mới cho component ${res}`);
  console.log(state); console.log(ownProps); console.log(res);
  return res;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);