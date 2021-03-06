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

//Vc kh??c component nh??ng chung store n?? l??m cho 1 component nh???n th?? component kia cx nh???n v?? c???p nh???p l???i. Nh??ng ??i???u
//?????c bi???t l?? m???c d?? n?? g???i mapStateToProps c???a t???t c??? nh??ng ch??? component n??o props ???? c?? gi?? tr??? ???? th?? m???i ti???n h??nh
//c???p nh???t c??n k th?? k c???p nh???p, t???c v???n g???i mapStateToProps nh??ng l???i k render. Th??? th?? n???u tr??ng t??n th?? toang, v?? d???
//c???n ?????i number 1 class nh??ng class kia c??ng c?? bi???n number-> gi???i quy???t b???ng c??ch chia reducer. N???u reducer kia c?? 
//number ?????i nh??ng reducer n??y k ?????i number th?? h??m mapStateToprops g???i reducer n??y th?? n?? v???n k ?????i. 
//Xem v?? d??? 4
//=> t???c l?? nhi???u component d??ng chung reducer th?? c??c state ?????i th?? ch??? component n??o c?? state c???a h??m mapStateToProps
//?????i th?? m???i render l???i-> redux r???t t???i ??u