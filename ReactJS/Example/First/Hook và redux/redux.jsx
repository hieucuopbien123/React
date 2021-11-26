class ClassRedux extends React.Component{
    decreaseActionCreator = Redux.bindActionCreators(this.props.onDecreaseNumber, this.props.dispatch);
    increase = (number) => {
        this.props.onAddNumber(number);
    }
    decrease = (number) => {
        this.decreaseActionCreator(number);
    }
    multiple = (number) => {
        this.props.multipleNumber(number);
    }
    divide = (number) => {
        this.props.divideNumber(number);
    }
    squareroot = (number) => {
        this.props.dispatch({
            number: number,
            type: "SQRT"
        })
    }
    render() {
        var number = this.props.number;
        var age = this.props.age;
        return (
            <div>
                <div>Fixed: {age}</div>
                <div>{number}</div>
                <button onClick={this.increase.bind(null, number)}>Increase</button>
                <button onClick={this.decrease.bind(null, number)}>Decrease</button>
                <button onClick={this.multiple.bind(this, number)}>Multiple</button>
                <button onClick={this.divide.bind(this, number)}>Divide</button>
                <button onClick={this.squareroot.bind(this, number)}>Sqrt</button>
            </div>
        )
    }
}

const reducer1 = (state = {number: 10}, action) => {
    console.log(state);
    console.log(action);
    var result = state;
    switch(action.type){
        case "INCREASE": 
            result.number++;
            break;
        case "DECREASE":
            result.number--;
            break;
        case "MULTIPLE":
            result.number *= 2;
            break;
        case "DIVIDE":
            result.number /= 2;
            break;
        case "SQRT":
            result.number = Math.sqrt(result.number);
            break;
        default:
            break;
    }
    return {number: result.number};
}

const reducer2 = (state = {number: 10}, action) => {
    var result = state;
    switch(action.type){
        case "SQRT": 
            result.number = Math.sqrt(result.number);
            break;
        default:
            break;
    }
    return {number: result.number};
}

var reducer = Redux.combineReducers({
    reducer1, 
    reducer2
})

const logger = ({ getState }) => {
    return next => action => {
        const returnValue = next(action);
        console.log("After dispatch: ");
        console.log(getState());
        return returnValue;
    }
}
let store = Redux.createStore(reducer, {
    reducer1: {number: 10},
    reducer2: {number: 10}
}, Redux.compose(Redux.applyMiddleware(logger)));

const mapStateToProps = (state, props) => {
    return {
        number: state.reducer1.number,
        age: props.age
    };
}

const addNumber = (number) => ({
    number: number,
    type: "INCREASE"
})
const minusNumber = (number) => ({
    number: number,
    type: "DECREASE"
})
const multipleNumber = (number) => ({
    number: number, 
    type: "MULTIPLE"
})
const divideNumber = (number) => ({
    number: number, 
    type: "DIVIDE"
})
const actionCreators = {
    multipleNumber,
    divideNumber
}

const mapDispatchToProps = (dispatch, props) => {
    console.log("Ownprops: ");
    console.log(props);
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)) },
        onDecreaseNumber: minusNumber,
        ...Redux.bindActionCreators(actionCreators, dispatch),
        dispatch
    }
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
}

const TestReduxClass = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClassRedux);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <TestReduxClass age={15}/>
    </ReactRedux.Provider>, 
    document.getElementById("redux")
);
