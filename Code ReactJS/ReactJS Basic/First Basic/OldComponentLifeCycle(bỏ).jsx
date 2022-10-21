// (bỏ)
class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1 + this.props.step
        };
    };
    //chạy vào defaultProps-> vào this.state={} để có props và state trước(tức lúc set state thì props tồn tại r nên gọi 
    //đc props r)-> UNSAFE_componentWillMount báo hiệu chuẩn bị render lần đầu tiên. Nó có thể thực hiện ở cả client và
    //server, tức nó cho ta cơ hội để cấu hình or tính toán lại các giá trị cho lần render đầu tiên. Hàm này cần thiết 
    //vì ta ms chỉ set mặc định cho state và props, nếu cần tạo biến hay thực hiện hàm gì phức tạp thì gọi trong này.

    UNSAFE_componentWillMount() {//có thể gọi lại setState ở đây để set giá trị ban đầu
        console.log("UNSA_componentWillMount");
        let test = 10;
        if(this.props.test < test && this.state.count){
            console.log("Props: ", this.props, " ;state: ", this.state);
        }
    }

    //Sau đó nó render lần đầu-> gọi vào componentDidMount(). Lúc này đã render lên lần đầu nên có thể truy cập vào DOM,
    //UIView, mọi thứ của component này. Ta cx có thể gọi đến 1 thư viện khác ví dụ cho hiển thị 1 biểu đồ chẳng hạn.Ta 
    //cx có thể lấy dữ liệu server qua AJAX r cập nhập thay đổi component gọi setState để chạy vào vòng tròn con render
    //thêm lần nx, có thể setInterval cho hành động lặp lại, or khai báo sự kiện. Làm bất cứ thứ gì ta muốn, ở dưới ta
    //set 1 cái bộ đếm thời gian tăng dần.

    countFnc = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    componentDidMount() {//setState, setProps, forceUpdate ở đây để bắt đầu vòng lặp update
        console.log("componentDidMount");
        this.counterID = setInterval(() => this.countFnc(), 1000);//setInterval thì luôn phải có clear k đc để vĩnh viễn
    };//kp thuộc tính nào cx phải khai báo ở constructor, ta có thể gán 1 lúc nào đó thì mặc nhiên nó tồn tại
    //nhưng nhớ phải có this nhé, k có this thì chỉ dùng đc trong hàm này thôi
    
    //component hiển thị ra rồi, chả còn gì nx. Ở giai đoạn này, hoặc là set các giá trị và cập nhập với setProps,
    //setState, forceUpdate hoặc kết thúc với ReactDOM.unmountComponentAtNode. Ở bên trên ta đã gọi hàm countFunc gọi 
    //setState tức lại bắt đầu 1 vòng con-> shouldComponentUpdate(nextProps,nextState).Hàm này quyết định có đc re-render
    //hay k.Nếu return false->quay về TT trước.Nếu true nó gọi UNSAFE_componentWillUpdate báo hiệu chuẩn bị update

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return nextState.count % 2 == 0;
    }

    //UNSAFE_componentWillUpdate(nextProps,nextState) cho phép cấu hình hoặc tính toán các giá trị trước khi Component
    //được re-render. Đặc biệt là ta có thể truy cập vào các trạng thái tiếp theo của props và state qua đối số
    //Đó là các giá trị mà đã thay đổi và chuẩn bị hiển thị. Trong hàm này k đc gọi setState nx vì setState và 
    //shouldComponentUpdate true mới ra được hàm này nếu lại gọi thì có nguy cơ lặp vô tận

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        console.log("UNSAFE_componentWillUpdate");
        console.log(nextProps, " " ,nextState);
    }

    //gọi hàm render()-> render xong lại gọi hàm componentDidUpdate(prevProps, prevState) xử lý việc đã update xong.
    //Ta có thể xử lý dữ liệu được lấy từ server or thay đổi giao diện dựa vào dữ liệu nhận được.
    //Ở đây lại quay về TT lúc trước, hoặc là đi tiếp, hoặc là kết thúc. Ta giả sử kết thúc với unmountComponentAtNode
    //hàm này sẽ kết thúc các component đã đc mount với cái thẻ nào; true nếu unmount đc; false nếu k unmount đc ví 
    //dụ k có thẻ nào chẳng hạn. Nó sẽ xóa handler và state, props...

    componentDidUpdate(prevProps, prevState) {//setState, setProps, forceUpdate ở đây để bắt đầu vòng lặp update
        console.log("componentDidUpdate");
        if (this.state.count === 20) {
            ReactDOM.unmountComponentAtNode(document.getElementById('componentLifeCycle'));
        }
    };

    //sẽ gọi tiếp vào componentWillUnmount() báo hiệu component sẽ bị hủy ngay sau hàm này. Ta dùng nó để xóa những thứ
    //đã set ở componentDidMount ví dụ cái interval chẳng hạn
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
        clearInterval(this.counterID);
    };
    //cách này k dùng đc nx vì UNSAFE_componentWillMount, UNSAFE_componentWillUpdate,.. bị legacy rồi. Dù vẫn dùng đc
    //nhưng dần sẽ bị loại bỏ

    render() {
        return (
            <h2>{this.state.count}</h2>
        );
    };
};

ComponentLifeCycle.defaultProps = {
    step: 2
}

ReactDOM.render( <ComponentLifeCycle />, document.getElementById('oldcomponentLifeCycle') );