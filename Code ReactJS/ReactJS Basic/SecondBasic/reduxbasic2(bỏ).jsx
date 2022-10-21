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
        console.log("Props")
        console.log(this.props)
        return (
            <div>
                {number}
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
            </div>
        )
    }
}

const reducer = (state, action) => {
    let copyState = state.number;
    console.log("state: ", state);
    switch(action.type)
    {
        case 'EVENT1': 
            copyState += 1;
            break;
    }
    return { number: copyState };
}

function logger(helo) {
    var { getState } = helo;
    return next => action => {
        console.log('will dispatch', action)
        const returnValue = next(action);//returnValue cx chỉ là cái action truyền vào thôi
        console.log('state after dispatch', getState())
        return returnValue;
    }
}
//hàm của đối số middleware có dạng: function middleware({ getState }) => (next) => (action) => next(action) là 2 hàm arrow lồng nhau
//đầu tiên là phát ra hành động với dispatch action -> chạy vào middleware-> thực hiện bên trong hàm con -> nó gọi next(action) tức là
//thực hiện tiếp ở reducer-> mapStateToProps-> thực hiện tiếp phần còn lại của middleware-> render lên màn hình.
//action là cái ta cần xử lý, next là cái middle ware tiếp theo truyền action vào, ở đây k có middle ware nào thêm nx nên nó sẽ là 
//cái mặc định hiện tại là reducer xử lý. Nó có vai trò kiểm soát quá trình ngay khi trước và sau khi thao tác với action. đối số truyền
//vào hàm của middle ware là 2 hàm getState và dispatch, ta có thể lấy getState ra kiểm soát TT như trên.
//->tự có getState tức là middleware thao tác đc vói state
//Chú ý arrow function lồng nhau như này thì function chau sẽ dùng đc cả next,hello,action. Function con chỉ dùng đc next và hello,
//còn cha chỉ có helo. Cấu trúc nó như thế thì phải theo thôi. returnValue là action lúc chưa xử  lý k qtr
let store = Redux.createStore(reducer, { number: 1 }, 
    Redux.compose(Redux.applyMiddleware(logger)))
//đối số 3 của nó là middleware or 1 third-party thoải mái
//compose nhét các store enhancer vào 1 hàng từ phải qua trái, nhưng gặp undefined sẽ lỗi

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return { number: state.number };
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
        onAddNumber: (number) => { dispatch(addNumber(number)); }
    }
}

//hàm connect có 4 đối số
//Sau khi chạy đến connect, nó sẽ gán stateProps, dispatchProps, ownProps và class ban đầu tạo ra 1 class với các thuộc
//tính mới. Đó là mặc định. Ta có thể thay đổi điều này bằng hàm mergeProps(stateProps,dispatchProps,ownProps)=>object
function mergeProps(stateProps,dispatchProps,ownProps) {
    return { ...stateProps, ...dispatchProps,  }
    //thử bỏ ownProps đi tức là mất biến job=100=>tức là thao tác bth nhưng k truyền nó vào class thôi,k dùng đc trong
}
const TestRedux = ReactRedux.connect (mapStateToProps, mapDispatchToProps, mergeProps)(Test);
//đối số 4 là các option k thg dùng lắm
ReactDOM.render(
    <ReactRedux.Provider store={store} >
        <TestRedux job="100" />
    </ReactRedux.Provider>,
    document.getElementById('redux')
);

/*
function dispatchAndLog(store, action) {
    console.log('dispatching', action)
    store.dispatch(action)
    console.log('next state', store.getState());//hàm getState sẽ lấy state thời điểm hiện tại, lấy lúc nào cx đc
    //Đây chính là 1 hàm ghi log bth mỗi tội dài, khi nào cần ghi thì sử dụng. Đấy là middleware thứ nhất mà nó phải đi qua. Trước khi đi vào
    //reducer của store
    //store.dispatch(action) gọi chơi thôi, cái này gọi để dispatch action bất cứ lúc nào cx đc
}
dispatchAndLog(store, addNumber())
*/
//Đây là ta tạo thủ công nhưng nó rất cồng kềnh, ở trên ta tạo ra 1 hàm logger và biến nó thành 1 middleware bằng hàm applyMiddleware, trong
//thực tế nó có nhiều thứ phức tạp chứ k chỉ là hàm log như v

//middleware là phần giữa ứng dụng va network request. Ta có thể thêm các logging ghi lại lịch sử action được dispatch, state của hệ thống
//or thêm vào CORS headers or 1 chuỗi luôn. Trong redux middleware chỉ lớp nằm giữa reducers và dispatch actions, nó hoạt động ngay sau khi 
//action đc dispatch và ngay trước khi reducer nhận đc. Ta có thể thêm nhiều hoạt động vào middleware

const a = { name: 'foo' }
const b = Object.assign(a, { name: 'bar', age: 1 }, { id: 9 })
console.log(b) // { name: 'bar', age: 1, id: 9 }
console.log(a) // Giá trị của a cũng bị thay đổi thành { name: 'bar', age: 1, id: 9 }
console.log(a === b) // true
//hàm assign có khả năng copy cái này vào cái khác. Ở trên nếu k dùng mergeProps thì nó sẽ tự gọi mặc định
//return Object.assign({},stateProps,dispatchProps,ownProps);//assign thì k dùng ... mà truyền vào object nhưng return {...<>} thì có
//thg dùng 1 là {} trống để gán COPY bằng gt trả về