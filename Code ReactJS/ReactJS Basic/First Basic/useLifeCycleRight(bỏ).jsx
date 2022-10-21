// (bỏ)
class UseLifeCycleRight extends React.Component {
    //constructor có thể khai báo biến trong phạm vi của nó, dùng setState. Có thể dùng các hàm trong class ta
    //bind từ bên dưới or các hàm trong props. trong this.state chỉ đc gán cái gì cho cái gì thôi.
    //Tương tự: ta đã truyền hàm vào props theo kiểu gán hàm r nên this.props.funcOutside là 1 hàm số chứ kp gt trả
    //về, nếu ở đây dùng outsideFuncInState: this.props.funcOutside thì outsideFuncInState là 1 hàm, còn dùng
    //this.props.funcOutside(me) như dưới thì nó là 1 gt trả về r
    //Tương tự hàm ở trong class ngoài constructor cx dùng đc trong constructor như v
    constructor(props) {
        super(props);
        const me = "hieu"
        this.state = {
            outsideFuncInState: this.props.funcOutside(me),
            insideFuncInState: this.funcInside
        };
    };
    //phần thân của class k đc gọi hàm mà chỉ khai báo để: sử dụng hàm trong phần đầu và cuối, sự kiện, callback
    funcInside(name) {
        console.log("Content of functionInside: ", name);
    }

    //đã bt đầy đủ
    static getDerivedStateFromProps(props, prevstate){
        console.log("getDerivedStateFromProps to mount");
    }

    countFnc = () => {
        this.setState({
            count: this.state.count + 1
        });
    };
    componentDidMount() {
        console.log("componentDidMount");
        this.countFnc()
    };

    shouldComponentUpdate(props, nextState) {
        console.log("shouldComponentUpdate");
        return true;
    }

    // getSnapshotBeforeUpdate chạy ngay khi hiển thị lên màn hình xong nhưng chưa cập nhập trên DOM
    //->lấy dữ liệu của DOM hiện tại để làm gì đó trước khi nó thay đổi mọi thứ. Giá trị return của nó đc dùng cho
    //componentDidUpdate 
    getSnapshotBeforeUpdate(props, prevState){
        console.log("getSnapBeforeUpdate");
        console.log("props: ", props, " ;prevState: ", prevState);
        return 100;
    }

    //đây là hàm rất ok cho network requests. Ta có thể ss props, state cũ và mới or thực hiện sự thay đổi thì nhớ
    //đưa vào điều kiện để tránh vô tận 
    componentDidUpdate(props, prevState, snapshot) {
        console.log("componentDidUpdate");
        console.log("props: ", props, " ;state: ", prevState, " ;snapshot: ", snapshot);
        ReactDOM.unmountComponentAtNode(document.getElementById('lifeCycleRight'));
    };
    
    //đã unmount thì never mount lại đc component này nx
    componentWillUnmount() {
        console.log("componentWillUnmount");
    };

    render() {
        console.log("Test gọi hàm ở ngoài như bth:");
        this.props.funcOutside("=> gọi trong render()");
        console.log("Giá trị trả về là: ", this.state.outsideFuncInState);
        //nhớ this.state.outsideFuncInState là 1 giá trị r chứ kp hàm nhé
        this.state.insideFuncInState("Hieu")
        return (
            <h2>hello</h2>
        )
    };
};

UseLifeCycleRight.defaultProps = {
    step: 2,
}

function outSideFunc(name) {
    console.log("Content of outside function: ", name);
    return name;
}

ReactDOM.render( <UseLifeCycleRight funcOutside={outSideFunc} />, document.getElementById('lifeCycleRight') );
//tương tự gán hàm trong react theo đúng quy tắc. Truyền k đối số mới gán hàm, truyền có đối số thì nó thực hiện hàm
//ngay lập tức r gán giá trị trả về là name truyền vào kia kìa