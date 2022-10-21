// (bỏ)
class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1 + this.props.step,
            hasError: false
        };
    };
    //vô defaultProps trc
    //chạy vào constructor(props). Nếu k cần khởi tạo state và bind các phương thức thì k cần dùng constructor. Lời 
    //khuyên là k đc chuyển props sang state mà cứ để riêng ra bth-> chạy hàm static 
    //getDerivedStateFromProps(nextprops,prevstate). Hàm này gọi ngay trước khi render. Ta có thể dùng để set các 
    //giá trị cho props, return 1 object để update state or null sẽ make no update. Có thể dùng nextprops và
    //prevstate. Nếu render lần đầu thì nextprops chỉ có 1 nên là nó. return để bảo thực sự thì state đổi thành gì

    static getDerivedStateFromProps(nextprops, prevstate){//điểm kỳ cục là prevstate lại là state sau khi đổi
        console.log("getDerivedStateFromProps to mount");
        let max = 10;
        if(nextprops.step < max)
            console.log("Props: ", nextprops, " ;State: ", prevstate);
        else
            this.state.count = 10;
    }

    //!
    //Sau đó nó render lần đầu-> r gọi vào componentDidMount().Lúc này đã render lên lần đầu nên có thể truy cập vào
    //DOM, UIView, mọi thứ của component này. Ta cx có thể gọi đến 1 thư viện khác ví dụ cho hiển thị 1 biểu đồ chẳng
    //hạn.Ta cx có thể lấy dữ liệu server qua AJAX r cập nhập thay đổi component gọi setState để chạy vào vòng tròn
    //con render thêm lần nx, có thể setInterval cho hành động lặp lại, or khai báo sự kiện. Làm bất cứ thứ gì ta
    //muốn, VD ở dưới ta set 1 cái bộ đếm thời gian tăng dần.

    countFnc = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    componentDidMount() {//setState, setProps, forceUpdate ở đây để bắt đầu vòng lặp update
        console.log("componentDidMount");
        this.counterID = setInterval(() => this.countFnc(), 1000);
        //setInterval thì luôn phải có clear, k đc để vĩnh viễn
    };//kp thuộc tính nào cx phải khai báo ở constructor, ta có thể gán 1 lúc nào đó thì mặc nhiên nó tồn tại
    //nó là thuộc tính chung dùng trong class kp props và state
    
    //component hiển thị ra rồi, chả còn gì nx. Ở giai đoạn này, hoặc là set các giá trị và cập nhập với setProps,
    //setState, forceUpdate hoặc kết thúc với ReactDOM.unmountComponentAtNode. Ở bên trên ta đã gọi hàm countFunc gọi 
    //setState tức lại bắt đầu 1 vòng con-> nó sẽ đi vào getDerivedStateFromProps(nextprops, prevstate) bên trên->đi
    // tiếp vào shouldComponentUpdate(nextprops,nextState). Hàm này quyết định có đc re-render hay k.Nếu return
    //false->quay về TT trước chờ xem có sự thay đổi hay kết thúc tiếp theo

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return nextState.count % 2 == 1;
    }

    //giả sử return true-> gọi render()-> getSnapshotBeforeUpdate(prevProps, prevState). Gọi ngay trước khi render
    //xuống DOM, cho phép lấy một số thông tin của DOM (ví dụ vị trí thanh scroll), các giá trị return từ hàm này sẽ
    //đưa cho componentDidUpdate. Nó k đc dùng thường xuyên, VD: nó xuất hiện trong ui chat khi cần lấy vị trí thanh
    //scroll theo 1 cách rất đb

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapBeforeUpdate");
        console.log("prevProps: ", prevProps, " ;prevState: ", prevState);
    }

    //gọi hàm componentDidUpdate(prevProps, prevState) xử lý việc đã update xong. Ta có thể xử lý dữ liệu được lấy
    //từ server or thay đổi giao diện dựa vào dữ liệu nhận được. Ở đây lại quay về TT lúc trước, hoặc là đi tiếp, 
    //hoặc là kết thúc. Ta giả sử kết thúc với c; false nếu k unmount đc ví dụ k có thẻ nào chẳng hạn. Nó sẽ xóa
    //handler và state, props...unmountComponentAtNode 
    //hàm này sẽ kết thúc các component đã đc mount với cái thẻ nào; true nếu unmount đc, nó sẽ xóa handler và 
    //state, props...; false nếu k unmount đc ví dụ k có thẻ nào chẳng hạn. 

    componentDidUpdate(prevProps, prevState,snapshot) {//setState, setProps, forceUpdate ở đây để bắt đầu vòng lặp update
        //chú ý dùng setState ở đây dễ lặp vô tận
        console.log("componentDidUpdate");
        console.log(this.state.count > 10)
        if (this.state.count === 10) {
            ReactDOM.unmountComponentAtNode(document.getElementById('componentLifeCycle'));
        }
    };

    //sẽ gọi tiếp vào componentWillUnmount() báo hiệu component sẽ bị hủy ngay sau hàm này. Ta dùng nó để xóa những thứ
    //đã set ở componentDidMount ví dụ cái interval chẳng hạn
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
        clearInterval(this.counterID);
    };

    render() {
        //ta có thể bắt error ở bất cứ quá trình nào
        return (
            <h2>{this.state.count}</h2>
        )
    };
};

ComponentLifeCycle.defaultProps = {
    step: 2,
}

ReactDOM.render( <ComponentLifeCycle />, document.getElementById('newcomponentLifeCycle') );