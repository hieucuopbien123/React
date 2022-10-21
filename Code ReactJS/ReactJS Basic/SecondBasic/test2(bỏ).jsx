// # Module redux (bỏ) / Dùng redux thuần
// Hiểu bản chất thứ tự dùng

class Test extends React.Component {
    constructor (props) {
        super(props);
    }
    handleEvent = (data) => {
        console.log(`First: truyền đi number ${data} và hàm số ${this.props.onAddNumber}`)
        console.log(data); console.log(this.props.onAddNumber);
        this.props.onAddNumber(data);
    }
    render () {
        var number = this.props.number;
        console.log(`Finally: có props mới rồi ${this.props} thì tiến hành render cập nhật lại`)
        console.log(this.props);
        return (
            <div>
                {number} 
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
            </div>
        )
    }
}
const reducer = (state, action) =>{
    let copyState = state.number;
    switch(action.type){
        case 'EVENT1': 
            copyState += 1;
            break;
    }
    var res = { number: copyState }
    console.log(`Fourth: reducer sẽ bắt được và dùng state ${state} và action ${action} để tạo ra state mới ${res}`);
    console.log(state); console.log(action); console.log(res);
    return res;
}
let store = Redux.createStore(reducer, { number: 1 })
const mapStateToProps = (state, ownProps) => {
    var res = { number: state.number }
    console.log(`Fifth: hàm mapStateToProps gắn với object đó sẽ bắt state mới từ reducer ${state} kết hợp với ownProps
    ${ownProps} để tạo ra 1 props cuối cùng mới cho component ${res}`);
    console.log(state); console.log(ownProps); console.log(res);
    return res;
}
const addNumber = number => {
    console.log(`addNumber lấy đối số ${number} và trả ra 1 object action`)
    console.log(number);
    return {
        type: 'EVENT1',
        data: number
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddNumber: (number) => {
            console.log(`Second: hàm số này gọi đến hàm addNumber với cái đối sô kia`);
            dispatch(addNumber(number)); 
            console.log("Third: sau khi có actions nó dispatch action đó=>chưa kịp kết thúc hàm tức là \
            đang dispatch dở thì reducer bắt và làm luôn nên cả quá trình coi như hàm onAddNumber còn chưa kết thúc")
        }
    }
}
const TestRedux = ReactRedux.connect (mapStateToProps,mapDispatchToProps)(Test);
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <TestRedux age="100" name={console.log("Chạy đến hàm ReactDOM render")}/>
    </ReactRedux.Provider>,
    document.getElementById('test2')
);
//Luồng react trc học bị sai-> bắt đầu phải từ bước 4 rồi tiếp tục. Nếu createStore có giá trị mặc định cho state thì
//reducer sẽ lấy nó cho lần render đầu tiên. Nếu createStore k có nó mới kiểm tra nếu reducer state có mặc định thì lấy
//Nếu k có giá trị mặc định nó sẽ là lỗi luôn. K đc khai báo bằng defaultProps vì cái này là props truyền từ ngoài vào
//chứ bản thân class k có sẵn mà default.
//Tốt nhất là kbh khai báo initialization của reducer ở store