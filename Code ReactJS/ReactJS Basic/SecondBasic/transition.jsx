// # Dùng các thư viện chức năng / Dùng react-transition-group 

const { CSSTransition, TransitionGroup, Transition } = ReactTransitionGroup;
//thật ra chả cần thế này với cdn cứ ReactTransitionGroup.Transition cx đc

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
                <h3>&lt;Transition in={"{this.state.stateOfIn}"} &gt;</h3>
                {/* đừng tưởng chữ trắng mà k chạy, html entity thoải mái nhé vì convert sang html phần chữ trắng có chạy
                html entity mà */}

                <b>{"\u2728"} Focus on Textfield and see the effects:</b>
                <ul>
                    <li className="my-highlight">
                        Now 'in' = {String(this.state.stateOfIn)}
                    </li>
                    <li> false --&gt; true (Enter)</li>
                    <li> true --&gt; false (Exit)</li>
                </ul>
                <div className="my-highlight">{this.state.message}</div>

                <br />

                <input type="text" onFocus={() => { this.setState({ stateOfIn: true }); }}
                    onBlur={() => {
                        this.setState({ stateOfIn: false });
                    }}
                />
                <br />

                <Transition
                    in={this.state.stateOfIn}
                    enter={true}
                    exit={true}
                    out={true}
                    appear={true}

                    timeout={{ enter: 500, exit: 500 }}

                    onEnter={() => this.onEnterHandler()}
                    onEntering={() => this.onEnteringHandler()}
                    onEntered={() => this.onEnteredHandler()}
                    onExit={() => this.onExitHandler()}
                    onExiting={() => this.onExitingHandler()}
                    onExited={() => this.onExitedHandler()}
                >
                    {(statusName) => {
                        console.log(statusName);
                        return (
                            <div className={`my-msg my-msg-${statusName}`} >User name 2-20 characters</div>
                        )
                    }}
                </Transition>
            </div>
        );
    }
}//onFocus tức là ấn vào ô mới có x onBlur. Nếu muốn kiểu hover thì onMouseOver x onMouseOut
//Cơ chế: in false sang true-> phát signal onEnter thực hiện hàm-> phát signal onEntering thực hiện hàm và duy trì 
//->trạng thái đó trong ktg timeout enter-> phát signal onEntered chuyển sang TT entered(các hàm đó có thể đổi state
//thoải mái)
//Pb: css transition với thuộc tính transition-duration làm cho 1 thẻ khi đc set thuộc tính này thì phải chờ sau ktg
//đó mới chuyển thành thuộc tính đó đc(k tính lúc hiện lên lần đầu tiên)
//timeout enter và exit là thời gian duy trì trạng thái mà thôi tức quyết định biến state duy trì ở giá trị nào trước
//khi bị đổi nếu hàm exited và entered đổi nó=> nhưng rõ ràng điều đó k hề quan trọng nếu thời gian enter nhỏ hơn 
//transition-duration thì nó vẫn chuyển trạng thái bất chấp cái transition-duration chưa chuyển thành class css đó 
//hoàn toàn và nếu khi entered nó đổi sang 1 tt khác nx thì transition-duration chưa hết vẫn cứ dừng lại để nhảy. 
//cộng với vc đang entering chưa hết mà ta làm nó phát signal exiting thì nó component đó vẫn tự dừng lại để chuyển
//sang exit, exiting, exited-> chính vì cơ chế có cái gì mới thì chuyển sang luôn và dừng lại cái hiện tại mà dùng
//rất dễ mà ta chả quan tâm thời gian cái nào hết trước hay j.
//statusName là tham số 6 trạng thái tự truyền vào các TH
//Ở lần render đầu tiên chú ý nó cx lấy TT cuối của in vd ở trên lần đầu tiên in=false -> mặc định là exited
//html/css cho rằng class k tồn tại thì k lấy nhưng vẫn hiện bth nên class nào k dùng kệ nó

ReactDOM.render(<MyComponent/>, document.getElementById('transition'))