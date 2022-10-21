import NormalAsyncData from "../components/NormalAsyncData";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { 
        text: state.fetchreducer.text,
        loading: state.fetchreducer.loading
    };
}

export default connect(mapStateToProps, null)(NormalAsyncData);
