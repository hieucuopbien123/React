import NormalText from "../components/NormalText";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return { 
        text: state.formreducer.text
    };
}

export default connect(mapStateToProps, null)(NormalText);
