import NormalForm from "../components/NormalForm";
import { connect } from "react-redux";
import { setData } from "../actions/index.js";

const mapDispatchToProps = (dispatch) => {
    return {
        setText: (data) => {
            dispatch(setData(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(NormalForm);
