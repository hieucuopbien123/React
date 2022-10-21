// # Module redux (bỏ) / Dùng redux thuần

class Test extends React.Component {
    constructor (props) {
        super(props);
    }

    handleEvent = (data) => {
        this.props.onAddNumber(data);
    }

    render () {
        var number = this.props.number;
        console.log("1");
        return (
            <div>
                Number: {number}
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
            </div>
        )
    }
}

class Test1 extends React.Component {
    constructor (props) {
        super(props);
    }

    handleEvent1 = (data) => {
        this.props.onAddNumber1(data);
    }

    render () {
        var number = this.props.numberTest
        console.log("2")
        return (
            <div>
                Number: {number}
                <button onClick={this.handleEvent1.bind(null, number)} >Test1</button>
            </div>
        )
    }
}

const reducer1 = (state = { number: 1}, action) =>
{
    let copyState = state.number;
    switch(action.type)
    {
        case 'EVENT1': 
            copyState += 1;
            break;
    }
    return { number: copyState };
}

const reducer2 = (state = { numberTest: 1 }, action) =>
{
    let copyState1 = state.numberTest;
    switch(action.type)
    {
        case 'EVENT2':
            copyState1 += 1;
            break;
    }
    return { numberTest: copyState1 };
}
//Ở lần đầu tiên render nó sẽ chạy reducer đầu tiên với action INIT nhưng ta k có tự chạy vào case là default và chỉ
//lấy những giá trị default mà thôi. Ở trong đây thì tức là switch case k chạy 

//k có hàm nào là tự có cả, import cdn phải có tiền tố
var reducer = Redux.combineReducers({
    reducer1, 
    reducer2
});

let store = Redux.createStore(reducer 
    ,{ reducer1: {number: 2}, reducer2: {numberTest: 2} }//nếu khai báo trong reducer r thì thôi
    // window.devToolsExtension ? window.devToolsExtension() : undefined
);

const mapStateToProps = (state) => {
    console.log("map state to props");
    console.log(state)
    return { number: state.reducer1.number };
}

const mapStateToProps1 = (state) => {
    console.log("map state to props 1");
    console.log(state)
    return { numberTest: state.reducer2.numberTest };
}

const addNumber = number => ({
    type: 'EVENT1',
    data: number
})
const addNumber1 = number => ({
    type: 'EVENT2',
    data: number
})

const mapDispatchToProps = (dispatch) => {
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)); },
        onAddNumber1: (number) => { dispatch(addNumber1(number)); }
    }
}
const TestRedux = ReactRedux.connect (mapStateToProps, mapDispatchToProps)(Test);
const TestRedux1 = ReactRedux.connect (mapStateToProps1, mapDispatchToProps)(Test1);
function Test2 () {
    return (
        <div>
            <TestRedux />
            <TestRedux1 />
        </div>
    )
}

ReactDOM.render(
    <ReactRedux.Provider store={store}>
    <Test2 />
    </ReactRedux.Provider>,
    document.getElementById('redux')
);

//Chia nh reducer quá pro
//Chú ý khi dùng v r thì reducer và createStore sẽ khai báo giá trị ban đầu của class, k dùng defaultProps nx.
//chú ý là 2 cái khai báo kiểu khác nhau, như trên 

//Trong 1 component k dùng 2 reducer: reducer phải luôn lưu giá trị mới nhất của giá trị state, tức là mọi thay đổi
//của state thì reducer phải xử lý hết, nếu có 2 reducer thao tác 1 state thì 2 1 reducer đổi GT đâu có nghĩa reducer
//kia cx đổi GT
