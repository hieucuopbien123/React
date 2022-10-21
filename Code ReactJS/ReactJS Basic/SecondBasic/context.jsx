// # Dùng context

// Dùng contextType
const NumberContext = React.createContext({name: "Hieu"});
NumberContext.displayName = "Hieu";
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

// Dùng Context.Consumer
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
    }
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