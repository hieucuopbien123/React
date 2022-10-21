// # Module redux (bỏ) / Dùng redux thuần

console.log("1");

class Test extends React.Component {
    constructor (props) {
        super(props);
        console.log("9");
    }

    handleEvent = (data) => {
        console.log("10");
        this.props.onAddNumber(data);
    }

    handleEvent1 = (data) => {
        console.log("10");
        this.props.onAddNumberTest(data);
    }

    render () {
        var number = this.props.number;
        var numberTest = this.props.numberTest;
        console.log("11");
        return (
            <div>
                {number}
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
                {numberTest}
                <button onClick={this.handleEvent1.bind(null, number)}>Test</button>
            </div>
        )
    }
}

console.log("2");
var counter = 0;
function increaseCounter(){
    counter++;
}

const reducer = (state = { number: -100, numberTest: 100 }, action) =>
{
    let copyState = state.number;
    let copyState1 = state.numberTest;
    console.log("12");
    console.log(state);
    console.log(action);

    switch(action.type)
    {
        case 'EVENT1': 
            increaseCounter();
            copyState += counter;
            break;
        case 'EVENT2':
            copyState1 -= 1;
            break;
    }
    return { number: copyState,
            numberTest: copyState1 };
}
console.log("3");

var reducerAll = Redux.combineReducers({
    reducer
})

let store = Redux.createStore(reducerAll, 
    { number: 1, numberTest: 10 },
    window.devToolsExtension ? window.devToolsExtension() : undefined);
console.log("4");

const mapStateToProps = (state) => {
    console.log("13");
    console.log(state);
    return { number: state.reducer.number,
            numberTest: state.reducer.numberTest };
    //Chú ý là mỗi 1 Component có thể set 1 hàm mapStateToProps khác nhau, mà hàm mapStateToProp lại có thể lấy
    //state của 1 reducer tùy ý trong nhiều reducer-> điều này đồng nghĩa với vc 2 component chả liên quan gì 
    //đến nhau với 2 hàm map khác nhau có thể giao tiếp vói nhau thông qua vc ta lấy reducer chỉ định như này
    //ComponentA dispatch-> reducer đổi-> componentB dùng mapStateToProps lấy state của reducer của ông A-> quá ok
}
console.log("5");

const addNumber = number => ({
    type: 'EVENT1',
    data: number
})

const addNumberTest = number => ({
    type: "EVENT2",
    data: number
})

const mapDispatchToProps = (dispatch) => {
    console.log("14");
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)); },
        onAddNumberTest: (number) => { dispatch(addNumberTest(number))}
    }
}
console.log("6");
const TestRedux = ReactRedux.connect (mapStateToProps, mapDispatchToProps)(Test);
console.log("7");

ReactDOM.render(
    <ReactRedux.Provider store={store} name={console.log("15")}>
        <TestRedux name={console.log("16")}/>
    </ReactRedux.Provider>,
    document.getElementById('redux')
);
console.log("8");