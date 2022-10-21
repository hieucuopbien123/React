// # Dùng các thư viện chức năng / Dùng react-transition-group

// Dùng TransitionGroup
import React from 'react'
import ReactDOM from 'react-dom'
// import { CSSTransitionGroup } from 'react-transition-group-v1
import {
    TransitionGroup,
    CSSTransition,
    Transition
} from "react-transition-group";
//phải cho vào trong ngoặc {}

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
        this.setState(this.state.items.push(newItems));
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
            <TransitionGroup
                transitionName="example"
                transitionEnterTimeout={5000}
                transitionLeaveTimeout={5000}
            >
                {items}
            </TransitionGroup>
            </div>
        );
    }
}
export default TodoList;