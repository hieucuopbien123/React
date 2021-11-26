import { connect } from 'react-redux';
import { createPost } from '../actions';
import NewPost from '../components/NewPost';

const mapDispatchToProps = dispatch => {
  return {
    onAddPost(post){
      dispatch(createPost(post));
    }
  };
};

// function mapStateToProps(state){
//   console.log("map của create");
//   console.log(state)
//   return {
//     state
//   };
// };

export default connect(
  null,
  mapDispatchToProps
)(NewPost);