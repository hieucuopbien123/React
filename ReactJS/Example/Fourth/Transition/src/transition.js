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


                    {/* CSSTransition cho th???y t??nh ??u vi???t h??n khi set ??c ?????y ????? 6 class css ch???
                    k ph???i 4 nh?? Transition v?? n?? t??? ?????ng v??i component b??n trong ch??? k ph???i g??n tay 
                    mu??n d??ng appear transition th?? bu???c d??ng CSSTransition r.Ch?? ?? classNames c?? s nh??*/}
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
                        appear//appear b??o hi???u l?? khi appear th?? d??ng c??c class appear-> k c?? k d??ng class appear ????u
                    >
                        {(status) => {
                            console.log(status);
                            return (
                                <div>This is transition text</div>
                            )
                        }}
                    </CSSTransition> */}
                    {/* d?? n?? v???n ph??t status nh??ng ta k d??ng nx m?? d??ng theo classNames th??i */}
                    {/* m?? h??nh n??y v???n c??n t??m m???y c??i class m???c ?????nh tr??ng t??n n??n b??? xung ?????t class vs c??i d?????i */}


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
//v???n ????? l??  khi enter n?? th???c hi???n h??m trong onEnter, nh??ng n?? k b???n status enter, t????ng t??? k c?? status exit
//=>t???c l?? css ch??? c?? 4 TT-> tuy nhi??n nh?? v l?? ????? cho transition r. C?? ch??? th???c hi???n c??ng kp nh?? ta h???c t??? trc. VD khi 
//enter=> th???c hi???n h??m onEnter-> ph??t status entering->th???c hi???n h??m entering->l???i ph??t status entering-> duy tr?? 
//timeout ph??t status entered->th???c hi???n h??m entered-> l???i ph??t status entered.
//Tuy nhi??n ta ch??? c???n quan t??m c?? ch??? ????. Ch??? c???n bi???t 4 class l?? ok transition r

//appear/mountOnEnter/unmountOnExit ?????u l?? x??? l?? tr???ng th??i l??c ?????u v?? k???t th??c m?? th??i
//mountOnEnter l?? khi enter l???n ?????u m???i b???t ?????u mount n?? v??o. T???c l?? gi??? s??? nh?? b??n tr??n ta ???n enter ph??t l?? n?? m???i 
//k??ch ho???t enter-> l??c ???? m???i b???t ?????u mount v??o theo ??ung quy tr??nh, g???p in l?? true n?? ch???y nhanh status t??? exited
//->entering. T?????ng l?? n?? s??? c?? transition->sai v?? l??c exited n?? k ch???y transition v?? ch??a mount-> ?????n khi entering hi???n
//ra r???i n?? m???i mount v??o -> t???c l??c c?? entering h???t r???i, set xong TT class m???i ??c mount n??n k th???y transition ??? ?????u
//unmountOnExit l?? exited ph??t coi nh?? x??a lu??n-> c??i class exited s??? ??o ch???y ????u-> l???n entering sau n?? coi nh?? m???i xu???t
//hi???n l???n ?????u n??n hi???n lu??n=> t???c l?? mountOnEnter v?? unmountOnExit l??m bi???n m???t v?? th??m 1 ch?? ?? l?? l???n ?????u xu???t hi???n 
//th?? k c?? transition v?? k set appear-> th??? th??i

export default TransitionClass;