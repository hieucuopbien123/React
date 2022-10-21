import { deletePost } from "../actions/index.js";
import List from "../components/Item.js";
import { connect } from "react-redux";

var mapDispatchToProps = (dispatch) => {
    return{
        onDelete: (id) => dispatch(deletePost(id))
    }
}

const mapStateToProps = (state) => {
    return { posts: state };
}

export default connect(mapStateToProps, mapDispatchToProps)(List)