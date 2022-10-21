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
var post = [{number: 1}]
const reducer = (state = post, action) =>{
    let copyState = state[0].number;
    switch(action.type){
        case 'EVENT1': 
            copyState += 1;
            break;
    }
    var res = [{number: copyState}]
    console.log(res)
    console.log("1", [{number: copyState}])
    console.log(`Fourth: reducer sẽ bắt được và dùng state ${state} và action ${action} để tạo ra state mới ${res}`);
    console.log(state); console.log(action); console.log(res); console.log(copyState);
    return res;
}
let store = Redux.createStore(reducer)
const mapStateToProps = (state, ownProps) => {
    console.log("5")
    var res2 = { number: state[0].number += parseInt((ownProps.age)) }
    console.log(`Fifth: hàm mapStateToProps gắn với object đó sẽ bắt state mới từ reducer ${state} kết hợp với ownProps
    ${ownProps} để tạo ra 1 props cuối cùng mới cho component ${res2}`);
    console.log(state); console.log(ownProps); console.log(res2);
    return res2;
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
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
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
    document.getElementById('test3')
);
//Đây là thử nghiệm dùng mảng trong reducers

//Luồng data khác vl: nó chạy reducers trước-> sau đó mới chạy đến hàm ReactDOM.render() ở lần đầu r mới chạy đến fif

//qua đây ta nhận ra rằng-> kiểu trả về của reducer dứt khoát là đối số nhận vào mapStateToProps đầu tiên
//Hàm reducer nhận vào và return phải là cùng 1 kiểu, nếu state vào là mảng thì return cũng phải là mảng. Nhưng
//sau đó mapStateToProps lại trả ra 1 object kp mảng lại chả sao
//Ta cần hiểu rõ reducer và mapStateToProps thì nó nhận dứ liệu state từ đâu và dữ liệu nó return sẽ đi đâu
//Ta cho rằng chắc chắn: dữ liệu mapStateToProps sẽ đi vào props của object ngay lập tức, state nhận vào của nó là
//trực tiếp lấy từ reducers
//Còn reducer là vấn đề nan giải nhất: state của nó là lấy từ giá trị ban đầu khởi tạo r từ các lần sau(sau khi copy)
//thì giá trị return của hàm sẽ lại quay lại lưu vào state đó. Nếu có sự thay đổi biến đó ở trong hàm mapStateToProps thì
//nó cũng đổi vào reducers ngay trước lúc return nhé nên state cũng bị đổi bởi vì mapStateToProps
//=>đã fix là mapStateToProps k ảnh hưởng đến reducer->state của reducer chính là thứ dữ liệu thực sự lưu trong store

//Ta vẫn chưa hiểu tại sao lại phải copy state trong reducer=> chả có tác dụng cc gì, về sau return và chỉnh sửa trong
//mapStateToProps vẫn chịu tác động mà

//chỉ có 1 lỗi đó là mapStateToProps mà đổi thì giá trị ở reducer bị ảnh hưởng dù hàm này chưa kết thúc=> chia rõ ràng ra 
//1 phần chỉ là chuyển đổi, 1 phần là code logic để tránh lỗi này-> đúng là có lỗi này thật nhưng lưu vào res mới bị chứ
//in ngay k lưu thì éo bị đổi theo hàm mapStateToProps => chốt là nên return mnl chứ đừng lưu res r ms return trong reducer

//=>Đáng lẽ phải kiểm chứng điều đó nhưng trong dự án chia file: reducer nhận vào 1 mảng-> trả ra 1 mảng và mapstatetoprops
//nhận vào object chứa mảng đó-> return 1 object, attribute của object trong mảng đó lại
//là tên của biến số mặc định của state trong hàm của reducer. 
//truyền vào hàm ta cũng truyền dạng object-> cần giải thích tại sao return của reducer lại khác đối số 1 của 
//mapStateToProps
//=>occho vl=> đó là do hàm combine thì nó tách reducer ra thành 1 cái reducers có tên là posts-> phải thêm .posts
//mới ra mảng hay nói cách khác nó tồn tại như 1 object

//Chính vì nó bắt hết mọi TH và state sau là return của state trước nên gặp vấn đề sau: mọi action trong reducer phải
//luôn trả về cùng 1 kiểu dữ liệu và là chính nó. Điều này dẫn đến VD nếu ta có 1 list và muốn là 2 thao tác addToList
//và removeFromList thì giá trị return của 2 cái phải là như nhau. VD addToList ta muốn return 1 mảng để cho component
//render lại mảng đó, còn removeFromList nhận 1 id thì cx phải return cả mảng và vẫn phải là mảng đó nếu k sẽ ảnh hưởng 
//đến biến state của lần sau. Do đó nếu 2 hành động k liên quan lại return 2 thứ khác nhau thì phải tách ra 2 reducer 
//riêng.
//Như v rõ ràng là trong 1 component ta nên chọn kiểu state của dispatcher nó bao quát mọi dữ liệu sẽ có sự thay đổi
//của component đó. Nếu có nhiều component con thì nên tách ra reducer riêng để co nhỏ nó lại. Nhớ là phải bao hết các 
//giá trị thay đổi sao cho toàn bộ dữ liệu reducer của component đó sẽ đủ để render toàn bộ component.
//Ta k nên đổi giá trị của state khi dùng mapStateToProps khi đó ta coi nó độc lập với reducer-> ta chỉ cần biết từ
//reducer đó, ta thật sự muốn lấy cái reducer nào để lấy giá trị gì thì móc nó ra từ state mà thôi, chỉ lấy những giá tri
//cần thiết cho props. Thế nhưng những giá trị cần thiết cx phải đủ để render đủ component khi hợp lại tất cả các hàm
//mapStateToProps
//VD kinh nghiệm xác định kiểu state của reducer: chẳng hạn ta muốn add và remove 1 list-> Theo tư duy thông thường thì
//ta add là chỉ cần trả về thông tin của item vừa add còn remove thì chỉ cần id của item vừa remove. Nhưng như v là sai
//Ở lần đầu tiên render giá trị mặc định là những item add vào thì ok ổn, nhưng nếu ta ấn add tiếp mà lại chỉ trả về
//mỗi item thêm vào thì class k thể dùng mỗi item thêm vào đó để render lên cả list đc.Giá trị return của mapStateToProps
//phải đủ để render lên cả cái list đó, tương tự với remove, ta k thể cho nó trả ra mỗi id r cho hiện lên tất cả trừ id
//đó. Nguyên nhân là bởi vì: mỗi lên render 1 component là nó sẽ render lại component đó từ đầu, k có thông tin của lần
//trước; state mà store gửi vào props được cập nhập sau mỗi lần thực hiện sự kiện là mới hoàn toàn, tức là nó xóa cái
//props cũ của class đi và thay vào props mới chứ kp ta nói là thêm vào 1 item thì props nó thêm vào đâu mà phải trả
//ra 1 list mới cho nó
//=> Tuy nhiên kp là vô cách, trong lập trình ta luôn có thể tùy biến mọi thứ theo ý thích. Ta có thể tạo 1 state list
//chứa thông tin lưu ở trong object. Mỗi lần ấn thêm thì chỉ cần text mới lưu vào props sau đó cho state thêm item lưu
//trong props. Tuy nhiên như thế thì khác gì chả cần dùng redux mà lưu vào state xong ấn thì sửa state r render ra.
//Đáy là do ví dụ này chưa nói lên thế mạnh của redux, của store khi kế thừa cha con nó sẽ phân phát trực tiếp cho con.
//Tức là store nên lưu toàn bộ thông tin của cha. Nếu con cần gì thì mapStateToProps của con sẽ bất đc luôn và nếu có
//thay đổi thì tự cập nhập r render lại con. Đó là lý do cần dùng redux, và state của reducer nên là rất lớn lưu mọi thứ
//vào 1 props đủ để render cả component luôn chứ kp mỗi text phần tử add vào như trên.

//Ở lần chạy đầu tiên phát signal INIT: mapDispatchToProps-> reducer-> mapStateToProps->render