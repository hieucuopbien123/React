// # Thao tác với thẻ con
//Error boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
    //bắt mọi lỗi của các component kẹp trong nó, truyền vào đối số của hàm này và thực hiện re-render vì trong hàm 
    //này ta set lại cái state. Đồng thời, trong hàm render cx phải xử lý có lỗi thì in lỗi ra, k thì in các con bth
        console.log("Error: ", error);
        console.log("ErrorInfo: ", errorInfo);
        this.setState({
            error: error,//toString cái này sẽ là giá trị message ta throw ra
            errorInfo: errorInfo
        })
    }//componentDidCatch có error throw ra và info là 1 object có 1 key là componentStack chứa thông tin về 
    //component phát ra cái error đó
    
    render() {
        if (this.state.errorInfo) {
        // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Mặc định k có summary là Details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );//nó sửa if trong js thành && trong jsx. Nếu tồn tại thì true or ta có thể thêm các điều kiện thoải mái
            //như .length > 10 chẳng hạn. Nó kiểu (true) && expression. Nếu true thì expression hiện. Dòng code này
            //là nếu this.state.error tồn tại thì hiển thị this.state.error.toString().
            //Thế nếu ta in this.state.error thì sao-> éo đc, nó để kiểm tra có hay k bằng đk thôi, in thì toString()
            //vì nó kiểu kp là object mà là 1 cái error kiểu khá lạ k in đc
        }
    // Normally, just render children
        return this.props.children;//props.children là các thẻ con trong thẻ này tự lưu trong props của class
        //props của mỗi class luôn tự động có component children của nó
    }  
}

class ComponentLifeCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.step,
        };
    };

    static getDerivedStateFromProps(nextprops, prevstate){
        console.log("getDerivedStateFromProps");
        let max = 10;
        if(nextprops.step < max)
            console.log("Props: ", nextprops, " ;State: ", prevstate);
    }

    componentDidMount() {
        console.log("componentDidMount");
        //giai đoạn này có thể k làm gì trong đây cx đc, đây là lúc mà nó sẵn sàng bắt sự kiện cx là 1 cách 
        //phổ biến để gọi vào cycle update của component
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapBeforeUpdate");
        console.log("prevProps: ", prevProps, " ;prevState: ", prevState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
        console.log("Prev: ", prevProps, ": ", prevState)
        console.log("After: ", this.props, ": ", this.state)
        if (this.state.count === 10) {
            ReactDOM.unmountComponentAtNode(document.getElementById('componentLifeCycle'));
        }
    };
    
    componentWillUnmount() {
        console.log("componentWillUnmount");
    };

    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        if(this.state.count === 5){
            throw new Error('Crash!');
        }
        return <h1 onClick={this.handleClick}>{this.state.count}</h1>;
    };
};
ComponentLifeCycle.defaultProps = {
    step: 2
}

function App() {
    return (
        <div>
            <ErrorBoundary>
                <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
                <ComponentLifeCycle />
                <ComponentLifeCycle />
            </ErrorBoundary>
            <hr />
            <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
            <ErrorBoundary><ComponentLifeCycle /></ErrorBoundary>
            <ErrorBoundary><ComponentLifeCycle /></ErrorBoundary>
        </div>
    );
}

ReactDOM.render( <App />, document.getElementById('LifeCycleWithError') );