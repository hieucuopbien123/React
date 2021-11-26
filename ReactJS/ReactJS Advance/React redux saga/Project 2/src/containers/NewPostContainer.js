import { addPost } from "../actions/index.js";
import NewPost from "../components/NewPost.js";
import { connect } from "react-redux"

var mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (text) => dispatch(addPost(text)),
    }
}
//kết quả trả về của hàm dispatch 1 action là action được gửi đi

export default connect(null, mapDispatchToProps)(NewPost)