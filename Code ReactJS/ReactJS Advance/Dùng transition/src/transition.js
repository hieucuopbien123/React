// # Dùng các thư viện chức năng / Dùng react-transition-group 

// Dùng Transition
// Dùng CSSTransition
import { Transition, CSSTransition, TransitionGroup } from "react-transition-group";
import React from 'react';

class TransitionClass extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            state: "",
            in: true,
        }
    }
    enterFunc = () => {
        console.log("Enter")
        this.setState({ 
            state: "enter"
        })
    }
    enteringFunc = () => {
        console.log("Entering")
        this.setState({
            state: "entering"
        })
    }
    enteredFunc = () => {
        console.log("Entered")
        this.setState({
            state: "entered"
        })
    }
    exitFunc = () => {
        console.log("Exit")
        this.setState({
            state: "exit"
        })
    }
    exitingFunc = () => {
        console.log("Exiting")
        this.setState({
            state: "exiting"
        })
    }
    exitedFunc = () => {
        console.log("Exited")
        this.setState({
            state: "exited"
        })
    }
    handleFocus = () =>{
        this.setState({
            in: true
        })
    }
    handleBlur = () => {
        this.setState({ 
            in: false
        })
    }
    render(){
        var numbers = [1,2,3,4,5];
        return(
            <div>
                <div>State: {this.state.state}</div>
                <input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    {/* <Transition
                        in={this.state.in}
                        appear
                        timeout={{enter: 2000, exit: 2000}}
                        onEnter={() => this.enterFunc()}
                        onEntering={() => this.enteringFunc()}
                        onEntered={() => this.enteredFunc()}
                        onExit={() => this.exitFunc()}
                        onExiting={() => this.exitingFunc()}
                        onExited={() => this.exitedFunc()}
                        addEndListener={(node,done) => {
                            node.addEventListener("transitioned",done,false);
                        }}
                    >
                        {(status) => {
                            console.log(status);
                            return (
                                <div className={`transition-${status}`}>This is transition text</div>
                            )
                        }}
                    </Transition> */}


                    {/* CSSTransition cho thấy tính ưu việt hơn khi set đc đầy đủ 6 class css chứ
                    k phải 4 như Transition và nó tự động vói component bên trong chứ k phải gán tay 
                    muôn dùng appear transition thì buộc dùng CSSTransition r.Chú ý classNames có s nhé*/}
                    {/* <CSSTransition
                        classNames={{
                            appear: 'transition-appear',
                            appearActive: 'transition-appearActive',
                            appearDone: 'transition-appearDone',
                            enter: 'transition-enter',
                            enterActive: 'transition-enterActive',
                            enterDone: 'transition-enterDone',
                            // exit: 'transition-exit',
                            exitActive: 'transition-exitActive',
                            // exitDone: 'transition-exitDone',
                        }}
                        
                        in={this.state.in}
                        timeout={{enter: 2000, exit: 2000}}
                        appear//appear báo hiệu là khi appear thì dùng các class appear-> k có k dùng class appear đâu
                    >
                        {(status) => {
                            console.log(status);
                            return (
                                <div>This is transition text</div>
                            )
                        }}
                    </CSSTransition> */}
                    {/* dù nó vẫn phát status nhưng ta k dùng nx mà dùng theo classNames thôi */}
                    {/* mô hình này vẫn còn tìm mấy cái class mặc định trùng tên nên bị xung đột class vs cái dưới */}


                    <CSSTransition
                        classNames="transition"
                        in={this.state.in}
                        timeout={{enter: 2000, exit: 2000}}
                        appear
                    >
                        {(status) => {
                            console.log(status);
                            return (
                                <div>This is transition text</div>
                            )
                        }}
                    </CSSTransition>

            </div>
        )
    }
}
//vấn đề là  khi enter nó thực hiện hàm trong onEnter, nhưng nó k bắn status enter, tương tự k có status exit
//=>tức là css chỉ có 4 TT-> tuy nhiên như v là đủ cho transition r. Cơ chế thực hiện cũng kp như ta học từ trc. VD khi 
//enter=> thực hiện hàm onEnter-> phát status entering->thực hiện hàm entering->lại phát status entering-> duy trì 
//timeout phát status entered->thực hiện hàm entered-> lại phát status entered.
//Tuy nhiên ta chả cần quan tâm cơ chế đó. Chỉ cần biết 4 class là ok transition r

//appear/mountOnEnter/unmountOnExit đều là xử lý trạng thái lúc đầu và kết thúc mà thôi
//mountOnEnter là khi enter lần đầu mới bắt đầu mount nó vào. Tức là giả sử như bên trên ta ấn enter phát là nó mới 
//kích hoạt enter-> lúc đó mới bắt đầu mount vào theo đung quy trình, gặp in là true nó chạy nhanh status từ exited
//->entering. Tưởng là nó sẽ có transition->sai vì lúc exited nó k chạy transition vì chưa mount-> đến khi entering hiện
//ra rồi nó mới mount vào -> tức lúc có entering hết rồi, set xong TT class mới đc mount nên k thấy transition ở đầu
//unmountOnExit là exited phát coi như xóa luôn-> cái class exited sẽ éo chạy đâu-> lần entering sau nó coi như mới xuất
//hiện lần đầu nên hiện luôn=> tức là mountOnEnter và unmountOnExit làm biến mất và thêm 1 chú ý là lần đầu xuất hiện 
//thì k có transition vì k set appear-> thế thôi

export default TransitionClass;