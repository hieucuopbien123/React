// # Dùng các thư viện chức năng / Dùng react-transition-group 

// Dùng CSSTransition
import React from 'react'
import ReactDOM from 'react-dom'
import {
    TransitionGroup,
    CSSTransition,
    Transition
} from "react-transition-group";

class MyDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOfIn: true,
            message : ""
        };
    }

    onEnterHandler()  {
        this.setState({message: 'Begin Enter...'});
    }

    onEnteredHandler ()  {
        this.setState({message: 'OK Entered!'});
    }

    onEnteringHandler() {
        this.setState({message: 'Entering... (Wait timeout!)'});
    }

    onExitHandler() {
        this.setState({message: 'Begin Exit...'});
    }

    onExitingHandler() {
        this.setState({message: 'Exiting... (Wait timeout!)'});
    }

    onExitedHandler() {
        this.setState({message: 'OK Exited!'});
    }

    render()  {
        return (
            <div>
                <CSSTransition
                    classNames={{
                        appear: 'appear',
                        appearActive: 'appearActive',
                        appearDone: 'appearDone',
                        enter: 'example-enter',
                        enterActive: 'example-enterActive',
                        enterDone: 'appearDone',
                        exit: 'example-exit',
                        exitActive: 'example-exit-active',
                        exitDone: 'example-exit-done',
                    }}
                    in={this.state.stateOfIn}

                    timeout={{ enter: 1500, exit: 1500}}

                    onEnter = {() =>  this.onEnterHandler()}
                    onEntering = {() =>  this.onEnteringHandler()}
                    onEntered={() =>  this.onEnteredHandler()}

                    onExit={() =>  this.onExitHandler()}
                    onExiting={() =>  this.onExitingHandler()}
                    onExited={() =>  this.onExitedHandler()}
                    // addEndListener={(node, done) => {
                    //     node.addEventListener('transitionend', done, false);
                    // }} // => k hđ
                    appear
                >
                    {
                        (stateName)=>{
                            console.log(stateName);
                            return (
                            <div className ="my-div">
                                <ul>
                                    <li className ="my-highlight">Now 'in' = {String(this.state.stateOfIn)}</li>
                                    <li>  false --&gt; true (Enter)</li>
                                    <li>  true  --&gt; false (Exit)</li>
                                </ul>
                                <div className="my-message">{this.state.message}</div>
                            </div>
                            )
                        }
                    }
                </CSSTransition>

                <button onClick={() => {this.setState({ stateOfIn: true });}}>Set stateOfIn = true</button>
                <button onClick={() => {this.setState({ stateOfIn: false });}}>Set stateOfIn = false</button>
            </div>
        );
    }
}
export default MyDiv;