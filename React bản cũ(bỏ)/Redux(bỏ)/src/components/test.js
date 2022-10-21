import React, { Component } from 'react';

class Test extends Component {
    constructor (props) {
        super(props);
    }
    handleEvent = (data) => {
        console.log(`First: truyền đi number ${data} và hàm số ${this.props.onAddNumber}`)
        console.log(data); console.log(this.props.onAddNumber);
        this.props.onAddNumber(data);
    }
    render () {
        var number = this.props.number;
        console.log(`Finally: có props mới rồi ${this.props} thì tiến hành render cập nhật lại`)
        console.log(this.props);
        return (
            <div>
                {number} 
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
            </div>
        )
    }
}

export default Test;