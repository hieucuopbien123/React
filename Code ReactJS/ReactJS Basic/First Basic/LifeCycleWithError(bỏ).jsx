// (bỏ)
//tạo biến hasError ở State, cứ count == 5 là hasError = true, component k bị xóa mà hiển thị cái khác
//muốn đổi props bh phải dùng ReactDOM.render() để render lại với tham số mới nhé
class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.now = new Date();
        //nếu ta khai báo now ở trong constructor như này thì chỉ đc dùng trong constructor. Tức dùng đc trong 
        //hàm dưới. Nếu khai báo ngoài hàm này or trong các hàm khác của class này thì thành global dùng đc ở mọi hàm
        //bên trong class này=> hiểu sai rồi
        //có this thì dùng mọi nơi, k có this thì chỉ dùng trong phạm vi hàm. Hàm constructor cũng như hàm bth
        //miễn là nó compile đến để biến tồn tại là đc, nhưng điều quan trọng là muốn dùng this trong các 
        //hàm thì phải bind
        this.state = {
            count: 1 + this.props.step,
            hasError: false,
            currentTime: this.now
        };
        console.log(`Constructor: state ${this.state} and props ${this.props}`);
        console.log(this.state); console.log(this.props);
    };

    static getDerivedStateFromProps = (nextprops, prevstate) => {// k truy cập đc vào this
        console.log(`getDerivedStateFromProps: nextProps ${nextprops} and prevState ${prevstate}`);
        console.log(nextprops); console.log(prevstate);
        console.log(this);
        //các hàm trong life cycle này đều cho sẵn tự thực hiện rồi, ta có thể dùng state next để làm cái gì đó
        //các hàm này k truy cập đc this và k bind đc và tự thực hiện. Cho nên ta k dùng this để lấy cái
        //state hiện tại đc mà chỉ dùng đc đối sô nó truyền vào, arrow function cx vô hiệu this vói hàm này
        let max = 10;
        if(nextprops.step < max)
            console.log("Hello");
    }
    //các hàm trong class đều truy cập vào this đến các thành phần trong class đc, trừ hàm static như trên thôi

    countFnc = () => {
        console.log("CountFunc");
        // if(this.state.count == 5)
        //     this.setState({
        //         count: 5,
        //         hasError: true
        //     })
        // else
            this.setState({
                count: this.state.count + 1,
            });
    };
    componentDidMount() {
        console.log("componentDidMount");
        this.counterID = setInterval(() => this.countFnc(), 1000);
        console.log(this);
    };

    shouldComponentUpdate(nextProps, nextState) {//truy cập đc vào this
        console.log(`shouldComponentUpdate: nextProps ${nextProps} and nextState ${nextState}`);
        console.log(nextProps); console.log(nextState);
        console.log(this);
        return true;
    }

    //tại thời điểm này ta nhìn thấy trên giao diện r nhưng mô hình DOM bên trong chưa cập nhập
    getSnapshotBeforeUpdate(prevProps, prevState){//truy cập đc vào this
        console.log(`getSnapBeforeUpdate: prevProps ${prevProps} and prevState ${prevState}`);
        console.log(prevProps);console.log(prevState);
        console.log(this);
    }

    //mô hình DOM đã cập nhập
    componentDidUpdate(prevProps, prevState) {//truy cập đc vào this
        console.log(`componentDidUpdate: prevProps ${prevProps} and prevState ${prevState}`);
        console.log(prevProps);console.log(prevState);
        console.log("After is this: ", this.props, ": ", this.state)
        if (this.state.count === 5) {
            ReactDOM.unmountComponentAtNode(document.getElementById('LifeCycleWithError'));
        }
        if(this.state.count === 10)
        {
            this.setState({
                count: this.state.count + 1,
                hasError: true
            })
        }
        //tại sao dùng setState ở đây gặp vấn đề. Nên nhớ là cứ state hay props thay đổi thì sẽ gọi ngay 1 vòng lặp
        //mới với rendering. Sẽ thế nào nếu 1 vòng lặp chưa chạy hết mà lại setState tiếp trong vòng lặp đó để bắt 
        //đầu 1 vòng mới. Nếu cứ lặp lồng lặp thì Ct sẽ crash hay component này k hiển thị. Để tránh TH đó ta nên 
        //dùng setState ở componentDidMount thôi. Nếu cứ dùng ở đây thì sao: nếu ta chỉ set hasError còn count bỏ thì
        //gặp VĐ là nó vẫn chạy vào vòng lặp và vòng sau nó gọi lại componentDidUpdate rồi lại vẫn bằng 5 lại lặp tiếp
        //nên bằng 5 vô hạn. Nếu cho count: 5, cx sai vì lỗi tương tự. Ta k thể nghĩ rằng chỉ cần đổi hasError nên
        //gán nó còn lại count k gán là sai. Chính vì nó lặp liên tục nên nếu dùng ở đây thì phải đổi sao cho các
        //thuộc tính khác k bị ảnh hưởng bằng cách cho nó vẫn tiếp tục như cũ.
        //Ta tưởng nó lặp vô tận thì k sao vì hasError:true thì nó sẽ render khác thì k cần quan tâm đến state nx
        //=>sai nhé, 1 component mà thực hiện công việc 1 cách liên tục vĩnh viễn thì k tải đc, auto crash chứ k bỏ
        //qua. 
        //Cách khác là ta vẫn gán nó bằng 5 nhưng trong hàm should ta check nếu hasError===true thì k cần update nx
        //thì quay về TT ban đầu là đc
        //Hàm setInterval thực hiện sau 1 khoảng thời gian nhưng nó k phải thực hiện trên 1 core riêng đâu mà cx là
        //hàng chờ sau 1s thì đưa hàm đó vào hàng chờ. Còn lifeCycle khi thực hiện 1 vòng sẽ chạy cực kỳ nhanh qua
        //tất cả các hàm. Nên gọi interval phát là nó vèo phát hết vòng luôn trc cả gọi hàm interval lần sau
        //Sau khi hasError == true thì ta vẫn cho component này tồn tại(state, props cx thế vì chỉ mất khi component
        //mất) nên ta chỉ cần làm sao để nó đỡ tốn core bằng cách dừng vòng lặp(component đã render sẽ vẫn hiện ở
        //đó). Khi nào tắt browser tự xóa hết mà
        if(this.state.hasError){
            clearInterval(this.counterID);
        }
    };
    
    componentWillUnmount() {//truy cập đc vào this
        console.log("componentWillUnmount");
        clearInterval(this.counterID);
        console.log(this);
    };

    render() {
        console.log("Render: ", this.state.count)
        if(this.state.hasError)
            return (
                <h1>Something wrong</h1>
            )
        else
            return (
                <h2>{this.state.count}</h2>
        )
    };
};
ComponentLifeCycle.defaultProps = {
    step: 2
}
ReactDOM.render( <ComponentLifeCycle />, document.getElementById('LifeCycleWithError') );