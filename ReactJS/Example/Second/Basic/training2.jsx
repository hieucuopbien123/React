const { CSSTransition, TransitionGroup, Transition } = ReactTransitionGroup;
class TransitionClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            transition: true
        }
    }
    change = () => {
        this.setState({
            transition: !this.state.transition
        })
    }
    onEnterHandler()  {
        this.setState({message: 'Begin Enter...'});
    }
    onEnteredHandler ()  {
        this.setState({message: 'OK Entered!'});
    }
    onEnteringHandler() {
        this.setState({message: 'Entering... (Wait timeout!)'});
    }
    onExitHandler() {
        this.setState({message: 'Begin Exit...'});
    }
    onExitingHandler() {
        this.setState({message: 'Exiting... (Wait timeout!)'});
    }
    onExitedHandler() {
        this.setState({message: 'OK Exited!'});
    }

    render(){
        return(
            <div>
                <button onClick={this.change}>Switch</button>
                <CSSTransition
                    classNames="transition"
                    in={this.state.transition}
                    enter
                    appear
                    exit
                    unmountOnExit
                    timeout={{enter: 500}}
                    addEndListener = {(node, done) => {
                        node.addEventListener("transitioned", done, false);
                    }}
                    onEnter = {() =>  this.onEnterHandler()}
                    onEntering = {() =>  this.onEnteringHandler()}
                    onEntered={() =>  this.onEnteredHandler()}
                    onExit={() =>  this.onExitHandler()}
                    onExiting={() =>  this.onExitingHandler()}
                    onExited={() =>  this.onExitedHandler()}
                >
                    {<div>Check Transition</div>}
                </CSSTransition>
            </div>
        )
    }
}
ReactDOM.render(<TransitionClass />, document.getElementById("1"));

class ReduxClass extends React.Component{
    constructor(props){
        super(props);
        this.bindOnDecrease = Redux.bindActionCreators(this.props.decrease,this.props.dispatch)
    }
    handleDec = (number) => {
        this.bindOnDecrease(number);
    }
    handleInc = (number) => {
        this.props.onIncrease(number);
    }
    render(){
        var number = this.props.number;
        return (
            <div>
                {number}
                <button onClick={this.handleInc.bind(this,number)}>Increase</button>
                <button onClick={this.handleDec.bind(this,number)}>Decrease</button>
            </div>
        )
    }
}
const increase = number => {
    return {
        type: "INC",
        data: number
        //data:number ??? ????y th???a v?? reducer n?? c?? state l?? d??ng number r, c??i data trong action ki???u n??y ch??? dung
        //khi ta c???n truy???n th??m d??? li???u g?? kh??c c???a component c???n thi???t d??? thay ?????i c??i number trong state m?? th??i
        //ch??? number trong action ch??? d??ng. VD ta add 1 post m???i toanh v??o listpost th?? data ???? ms ph???i d??ng action
    }
}
const decrease = number => {
    return {
        type: "DEC",
        data: number
    }
}
const mapDispatchToProps = (dispatch,props) => {
    return {
        onIncrease: (number) => dispatch(increase(number)),
        dispatch,
        decrease
    }
}
var reducer = (state = {number: 1}, actions) => {
    var number = state.number;
    switch(actions.type){
        case "INC":
            number++;
            break;
        case "DEC":
            number--;
            break;
    }
    return {number: number};
}
var combinedReducer = Redux.combineReducers({
    reducer
})
const mapStateToProps = (state, props) => {
    return {
        number: state.reducer.number
    }
}
function loggerMiddleware({getState, dispatch}){
    return next => action => {
        console.log("Before: ", getState());
        next(action);
        console.log("After: ", getState());
    }
}
let store = Redux.createStore(combinedReducer, {reducer: {number: 1}}, 
    Redux.compose(Redux.applyMiddleware(loggerMiddleware)));
function mergeProps(stateProps, dispatchProps,ownProps) {
    return Object.assign({},stateProps,dispatchProps,ownProps);
}
const CopyReduxClass = ReactRedux.connect(mapStateToProps,mapDispatchToProps,mergeProps)(ReduxClass)
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <CopyReduxClass />
    </ReactRedux.Provider>,
    document.getElementById("2")
)
store.dispatch({
    type: "INC",
});

function AddAttribute(){
    //1 c??ch kh??c ????? add attribute v??o th??? ch??? d??ng cho funcion component
    const attributes = {
        type: 'text',
        name: 'address',
        value: "hello"
    }
    return(
        <div>
            <input {...attributes} />
        </div>
    )
}
ReactDOM.render(<AddAttribute />, document.getElementById("5"));