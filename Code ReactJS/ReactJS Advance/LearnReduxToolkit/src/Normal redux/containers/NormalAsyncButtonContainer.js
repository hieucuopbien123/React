import NormalAsyncButton from "../components/NormalAsyncButton";
import { connect } from "react-redux";
import { fetchData } from "../actions/index.js";

const mapStateToProps = (state) => {
    return { 
        loading: state.fetchreducer.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch: () => {
            dispatch(fetchData());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NormalAsyncButton);
