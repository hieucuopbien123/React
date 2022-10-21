import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      newData: [{Name: "", Age: 0}],
      name: "Hieu",
      age: 20,
      modalIsOpen: false,
      nameModal: "",
      indexModal: 0
    } // Đáng lẽ data fetch API ở đây sẽ được lưu vào store của redux nếu có nhiều component dùng
    Modal.setAppElement('body');
  }
  componentDidMount(){
    axios.get('/api/first')
    .then(res => {
      this.setState({
        newData: res.data,
      })
    })
  }
  handleChange = (e) => {
    console.log(this.state)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) =>{
    axios.post("/api/add", { Name: this.state.name, Age: this.state.age},{headers: {'Content-Type':'application/json'}})
    .then(res=>{
      this.setState({
        newData: [...this.state.newData, {Name: this.state.name, Age: this.state.age}]
      })
    }).catch(err=>console.log(err))
  }
  eraseEvent = (index) => {
    axios.post("/api/erase", {Name: this.state.newData[index].Name}, {headers: {'Content-Type':'application/json'}})
    // Chú ý là gửi đi từ post phải là object nhé
    .then(res => {
      this.setState(prevState => {
        return {
          newData: prevState.newData.filter(element => element.Name != prevState.newData[index].Name)
        }
      })
    })
    .catch(err=>console.log(err))
  }
  editEvent = (index) => {
    this.setState({
      modalIsOpen: true,
      indexModal: index
    })
  }
  closeModal = (e) => {
    this.setState({
      modalIsOpen: false,
    })
  }
  modalChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }
  handleSubmitForm = (e) => {
    e.preventDefault();
    console.log("Final:", this.state.nameModal, this.state.ageModal);
    axios.post("/api/update", {Name: this.state.nameModal, Age: this.state.ageModal, index: this.state.newData[this.state.indexModal].Name},
    {headers: {'Content-Type':'application/json'}})
    .then(res => {
      this.setState({
        nameModal: "", 
        ageModal: 0,
        newData: res.data,
        modalIsOpen: false,
      })
    })
    .catch(err=>console.log(err))
  }
  // Lỗi thường gặp ở đợt submit này: truyền nhầm đối số, phải phức tạp như trên
  render(){
    return (
      <div>
        <input defaultValue="Hieu" type="text" onChange={this.handleChange} name="name"/><br/>
        <input defaultValue="20" type="number" onChange={this.handleChange} name="age"/><br/>
        <button type="submit" onClick={this.handleSubmit}>Submit</button>
        {/* Con mẹ nó button chỉ có onClick, onSubmit là của form r. Dùng form bao nó thì mới cần type submit */}
        <br/><br/>
        <table style={{border: "1px solid", borderStyle: "groove"}}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          </table>
            {this.state.newData.map( (data,index) => {
              return (
                <div key={index}>
                  <div>{data.Name} - {data.Age}</div>
                  <button onClick={this.eraseEvent.bind(this,index)}>Remove</button>
                  <button onClick={this.editEvent.bind(this,index)}>Edit</button>
                </div>
            )})}
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}>Close</button>
          <form onSubmit={this.handleSubmitForm}>
            <input type="text" name="nameModal" defaultValue={this.state.nameModal} onChange={this.modalChange}
            placeholder="Name"/>
            <input type="number" name="ageModal" defaultValue={this.state.ageModal} onChange={this.modalChange}
            placeholder="Age"/>
            <button type="submit">Submit</button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default App;
