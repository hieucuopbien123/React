// # Dùng các thư viện chức năng / Dùng react-transition-group 
// Dùng CSSTransition
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


// # Module redux (bỏ bản cũ)
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
        //data:number ở đây thừa vì reducer nó có state là dùng number r, cái data trong action kiểu này chỉ dung
        //khi ta cần truyền thêm dữ liệu gì khác của component cần thiết dể thay đổi cái number trong state mà thôi
        //chứ number trong action chả dùng. VD ta add 1 post mới toanh vào listpost thì data đó ms phải dùng action
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
function mergeProps(stateProps, dispatchProps, ownProps) {
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


// # Basic / Truyền vào component các attribute bằng {...}
function AddAttribute(){
    //1 cách khác để add attribute vào thẻ chỉ dùng cho funcion component
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