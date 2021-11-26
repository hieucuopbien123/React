//Context là 1 công cụ giúp truyền 1 phát từ ông sang cháu luôn là k truyền qua props của cha từng level
//hàm tạo 1 context. truyền vào default value của thẻ có context nếu bên trên thẻ đó k có provider để cung giá trị 
//thì nó sẽ lấy giá trị default
const NumberContext = React.createContext({name: "Hieu"});
NumberContext.displayName = "Hieu";//đặt tên cho context chỉ hiển thị trong devTool
class ShowNumber extends React.Component {
    render() {
        console.log(this.context)
        return (
            <p>Number: {this.context.number}</p>
        );
    }
}
ShowNumber.contextType = NumberContext;
//hàm contextType chỉ xuât hiện ở phiên bản mới. Các phiên bản cũ chạy lỗi cú vl. Nó sẽ gán các giá trị của context
//mà class Provider gán cho lưu vào trong biến context của class
class ContextComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 100,
        };
    }
    render() {
        var { number } = this.state;
        return (
            <NumberContext.Provider value={{ number, }}>
                <ShowNumber />
            </NumberContext.Provider>
        );
    }
}
ReactDOM.render(<ContextComponent/>, document.getElementById("context"))

const NumberContext1 = React.createContext();
class UpdateNumber extends React.Component {
    render() {
        return (
            <NumberContext1.Consumer>
                {({update}) => (
                    <button onClick={() => {update()}}>Update Number</button>
                )}
            </NumberContext1.Consumer>
        );
    }//chỉ đc chứa 1 thẻ ở giữa
}
class ShowNumber1 extends React.Component {
    render() {
        return (
            <NumberContext1.Consumer>
                {({number}) => (
                    <p>{number}</p>
                )}
            </NumberContext1.Consumer>
        );
        //ở phiên bản cũ họ dùng .Consumer để lấy giá trị của context. Bên trong phải là 1 hàm thì đối số truyền vào
        //hàm là 1 object các biến ta lưu trong context, kể cả hàm update như trên. Cách này quá phức tạp nên 
        //chuyển sang hoàn toàn contextType
    }
}
class ContextComponent1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 100,
        };
    }
    updateNumber = () => {
        this.setState({
            number: Math.random(),
        });
    };
    render() {
        return (
            <NumberContext1.Provider value={{ number: this.state.number, update: this.updateNumber.bind(this) }}>
                <ShowNumber1 />
                <UpdateNumber />
            </NumberContext1.Provider>
        );
    }
}
ReactDOM.render(<ContextComponent1 />, document.getElementById("context1"))