import React from 'react'
import ReactDOM from 'react-dom'
import { CSSTransitionGroup } from 'react-transition-group-v1'
// import {
//     TransitionGroup,
//     CSSTransition,
//     Transition
//   } from "react-transition-group";
// phải cho vào trong ngoặc {}
//bh ta dùng đc 2 cách đều là cũ

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: ['hello', 'world', 'click', 'me']};
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleAdd() {
        const newItems = this.state.items.concat([
            prompt('Enter some text')
        ]);
        this.setState({items: newItems});
    }

    handleRemove(i) {
        let newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }

    render() {
        const items = this.state.items.map((item, i) => (
            <div key={i} onClick={() => this.handleRemove(i)}>
                {item}
            </div>
        ));

        return (
            <div>
            <button onClick={this.handleAdd}>Add Item</button>
            <CSSTransitionGroup
                transitionName="example"//tương tự có thể dùng 1 object ở đây
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={5000}
                transitionLeaveTimeout={5000}
                transitionEnter={true}
                transitionLeave={true}>
                {items}
            </CSSTransitionGroup>
            </div>
        );
    }
}
export default TodoList;

// class MyDiv extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             stateOfIn: true,
//             message : ""
//         };
//     }

//     onEnterHandler()  {
//         this.setState({message: 'Begin Enter...'});
//     }

//     onEnteredHandler ()  {
//         this.setState({message: 'OK Entered!'});
//     }

//     onEnteringHandler() {
//         this.setState({message: 'Entering... (Wait timeout!)'});
//     }

//     onExitHandler() {
//         this.setState({message: 'Begin Exit...'});
//     }

//     onExitingHandler() {
//         this.setState({message: 'Exiting... (Wait timeout!)'});
//     }

//     onExitedHandler() {
//         this.setState({message: 'OK Exited!'});
//     }

//     render()  {
//         return (
//             <div>
//                 <CSSTransition
//                     classNames={{
//                         appear: 'appear',
//                         appearActive: 'appearActive',
//                         appearDone: 'appearDone',
//                         enter: 'example-enter',
//                         enterActive: 'example-enterActive',
//                         enterDone: 'appearDone',
//                         exit: 'example-exit',
//                         exitActive: 'example-exit-active',
//                         exitDone: 'example-exit-done',
//                     }}
//                     in={this.state.stateOfIn}

//                     timeout={{ enter: 1500}}

//                     onEnter = {() =>  this.onEnterHandler()}
//                     onEntering = {() =>  this.onEnteringHandler()}
//                     onEntered={() =>  this.onEnteredHandler()}

//                     onExit={() =>  this.onExitHandler()}
//                     onExiting={() =>  this.onExitingHandler()}
//                     onExited={() =>  this.onExitedHandler()}
//                     addEndListener={(node, done) => {
//                         node.addEventListener('transitionend', done, false);
//                     }}
//                     appear
//                 >
//                     {
//                         (stateName)=>{
//                             console.log(stateName);
//                             return (
//                             <div className ="my-div">
//                                 <ul>
//                                     <li className ="my-highlight">Now 'in' = {String(this.state.stateOfIn)}</li>
//                                     <li>  false --&gt; true (Enter)</li>
//                                     <li>  true  --&gt; false (Exit)</li>
//                                 </ul>
//                                 <div className="my-message">{this.state.message}</div>
//                             </div>
//                             )
//                         }
//                     }
//                 </CSSTransition>

//                 <button onClick={() => {this.setState({ stateOfIn: true });}}>Set stateOfIn = true</button>
//                 <button onClick={() => {this.setState({ stateOfIn: false });}}>Set stateOfIn = false</button>
//             </div>
//         );
//     }
// }
// export default MyDiv;