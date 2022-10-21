// # Dùng các thư viện chức năng / Dùng react-transition-group 

const { CSSTransition, TransitionGroup, Transition } = ReactTransitionGroup;

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOfIn: false,
            message: ""
        };
    }

    onEnterHandler() {
        console.log("Begin Enter");
        this.setState({ message: "Begin Enter..." });
    }

    onEnteringHandler() {
        console.log("Entering... (Wait timeout!)");
        this.setState({ message: "Entering... (Wait timeout!)" });
    }

    onEnteredHandler() {
        console.log("OK Entered!");
        this.setState({ message: "OK Entered!" });
    }

    onExitHandler() {
        console.log("Begin Exit");
        this.setState({ message: "Begin Exit..." });
    }

    onExitingHandler() {
        console.log("Exiting... (Wait timeout!)");
        this.setState({ message: "Exiting... (Wait timeout!)" });
    }

    onExitedHandler() {
        console.log("OK Exited!");
        this.setState({ message: "OK Exited!" });
    }

    render() {
    return (
        <div>
            <div>Now 'in' = {String(this.state.stateOfIn)}</div>
            <div className="my-highlight">{this.state.message}</div>
            <br />

            <input type="text" 
                onFocus={() => {
                    this.setState({ stateOfIn: true });
                }}
                onBlur={() => {
                    this.setState({ stateOfIn: false });
                }}
            />
            <br />

            <Transition
                in={this.state.stateOfIn}
                // transition làm gì có appear
                unmountOnExit
                mountOnEnter
                //chỉ là xác định ban đầu có sẵn k và về cuối có xóa đi k thôi

                timeout={{ enter: 1500, exit: 2500 }}

                onEnter={() => this.onEnterHandler()}
                onEntering={() => this.onEnteringHandler()}
                onEntered={() => this.onEnteredHandler()}
                onExit={() => this.onExitHandler()}
                onExiting={() => this.onExitingHandler()}
                onExited={() => this.onExitedHandler()}
            >
                {stateName => {
                    console.log(stateName);
                    switch (stateName) {
                        case "entering":
                            return (
                                <b className="my-msg-entering">
                                    ⭐ Note: User name 2-20 characters
                                </b>
                            );
                        case "entered":
                            return (
                                <b className="my-msg-entered">
                                    ⭐ Note: User name 2-20 characters
                                </b>
                            );
                        case "exiting":
                            return <div>(User Name)</div>;
                        case "exited":
                            return <div>(User Name)</div>;
                            {/* unmountOnExit làm cho exited nó k hiện nx và khoảng trống nó chiếm nó cx k chiếm
                            nx luôn */}
                        default:
                            return <div>??</div>;
                }
                }}
            </Transition>
            <br />
        </div>
    );
    }
    //unmountOnExit là khi exited nó sẽ biến mất các thành phần con trong thẻ transition, điều này tương đương với
    //ta gán TT exited display none v, tương tự mountOnEnter là chỉ bắt đầu xh cho đến khi đạt TT entered
    //ta dùng nó trong state chứ kp là 1 biến bth bởi vì khi state đổi sẽ ép render lại thì mới đổi chứ
}

ReactDOM.render(<MyComponent/>, document.getElementById('transition2'))