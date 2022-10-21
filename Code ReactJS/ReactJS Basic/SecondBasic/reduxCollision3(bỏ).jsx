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
        console.log("1")
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
        var number = this.props.numberTest;
        console.log("2")
        return (
            <div>
                {number}
                <button onClick={this.handleEvent1.bind(null, number)} >Test1</button>
            </div>
        )
    }
}

const reducer = (state = { number: 1, numberTest: 1 }, action) =>
{
    let copyState = state.number;
    let copyState1 = state.numberTest;
    console.log(copyState, copyState1);
    switch(action.type)
    {
        case 'EVENT1': 
            copyState += 1;
            break;
        case 'EVENT2':
            copyState1 += 1;
            break;
    }
    return { number: copyState, numberTest: copyState1 };
}

let store = Redux.createStore(reducer, 
    { number: 1, numberTest: 1 },
    window.devToolsExtension ? window.devToolsExtension() : undefined);

const mapStateToProps = (state) => {
    console.log("map state to props");
    console.log(state)
    return { number: state.number };
}

const mapStateToProps1 = (state) => {
    console.log("map state to props 1");
    console.log(state)
    return { numberTest: state.numberTest };
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

//Vc khác component nhưng chung store nó làm cho 1 component nhận thì component kia cx nhận và cập nhập lại. Nhưng điều
//đặc biệt là mặc dù nó gọi mapStateToProps của tất cả nhưng chỉ component nào props đã có giá trị đó thì mới tiến hành
//cập nhật còn k thì k cập nhập, tức vẫn gọi mapStateToProps nhưng lại k render. Thế thì nếu trùng tên thì toang, ví dụ
//cần đổi number 1 class nhưng class kia cũng có biến number-> giải quyết bằng cách chia reducer. Nếu reducer kia có 
//number đổi nhưng reducer này k đổi number thì hàm mapStateToprops gọi reducer này thì nó vẫn k đổi. 
//Xem ví dụ 4
//=> tức là nhiều component dùng chung reducer thì các state đổi thì chỉ component nào có state của hàm mapStateToProps
//đổi thì mới render lại-> redux rất tối ưu