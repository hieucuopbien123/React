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
        return (
            <div>
                {number}
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
        var number = this.props.number;
        return (
            <div>
                {number}
                <button onClick={this.handleEvent1.bind(null, number)}>Test1</button>
            </div>
        )
    }
}

const reducer = (state = { number: 1 }, action) =>
{
    let copyState = state.number;
    console.log(state);
    switch(action.type)
    {
        case 'EVENT1': 
            copyState += 1;
            break;
        case 'EVENT2':
            copyState -= 1;
            break;
    }
    var res = { number: copyState }
    console.log(res);
    return res
}
//ví dụ này cho thấy đổi giá trị của state ở 2 hàm mapStateToProps đều k ảnh hưởng đến state của reducer
//ta có thể đổi giá trị state trong mapStateToProps thoải mái bất chấp reducer có copy state hay k

let store = Redux.createStore(reducer, 
    { number: 1 },
    window.devToolsExtension ? window.devToolsExtension() : undefined);

const mapStateToProps = (state) => {
    console.log("map state to props");
    var res = { number: state.number - 1 };
    console.log("Res1: ", res);
    return res;
}

const mapStateToProps1 = (state) => {
    console.log("map state to props 1");
    var res = { number: state.number - 1 };
    console.log("Res2: ", res);
    return res;
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

//trùng tên