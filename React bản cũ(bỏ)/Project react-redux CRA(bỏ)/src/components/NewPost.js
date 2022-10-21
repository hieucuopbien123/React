import React, { Component } from 'react';

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(e){
    this.setState({
      title: e.target.value
    });
  };

  handleSubmit(e){
    e.preventDefault();
    if (this.state.title) {
      this.props.onAddPost(this.state.title);
      this.setState({
        title: '',
      });
    }
  };

  render() {
    console.log("Render NewPost")
    console.log("Props: ", this.props);
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <input type="text" placeholder="Title" className="form-control"
              onChange={ this.handleInputChange } value={ this.state.title } />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Add Post</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPost;