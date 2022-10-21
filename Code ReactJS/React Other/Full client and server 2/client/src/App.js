// # Request API / Dùng proxy / Dùng axios => bản cũ class component
// # Các thư viện components / react-modal

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      news: [],
      name: "",
      age: '',
      modalIsOpen: false,
      index: 0
    }
    Modal.setAppElement('body');
  }
  //Modal là kiểu 1 dialog sẽ ẩn những thứ trên trang hiện tại đi và hiện ra 1 cái dialog hiển thị cái gì ta muốn đè lên
  //setAppElement là khai báo Modal truyền vào nó thẻ root để nó đè lên toàn bộ

  openModal = (item,index) => {
    this.setState({
      modalIsOpen: true,
      nameModal: item.Name,
      ageModal: item.Age,
      index: index
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

  handleChangeModal = (event) => {
    this.setState({
      [event.target.name] : event.target.value,
    })
  };

  handleEditSubmit = (event) => {
    event.preventDefault();
    const newUpdate = {
      Name: this.state.nameModal,
      Age: this.state.ageModal,
    };

    axios.post('/api/edit', newUpdate, { headers: {'Content-Type': 'application/json'} })
    // Cái header specific type đôi khi phải có tránh lỗi
    .then(res => {
      console.log(res);
      let key = this.state.index;
      this.setState(prevState => ({
        news: prevState.news.map(
          elm => prevState.news.indexOf(elm) === key ? {
            ...elm,
            Name: this.state.nameModal,
            Age: this.state.ageModal
          }: elm
          // news là mảng chứa các object, elm là các object, ...elm sẽ gán các thuộc tính của object cũ cho mới, 
          // các thuộc tính còn lại là Name, Age sẽ lấy khác. 
          // Nên edit dựa vào data lấy về chứ kp set kiểu này
        ),
        modalIsOpen: false
      }))
    })
    .catch(error => console.log(error));
  };

  componentDidMount() {
    // axios.get('/api/test')
    //       .then(result => this.setState({ message: result.data.message }));
    // Đối số của get là tham số 1 của app.get() trên server trả ra 1 Promise k có return mặc định là true thực hiện
    // tức là nếu app.get nhiều lần thì nó chỉ bắt đúng cái trùng đối số thôi.
    axios.get('/api/new')
          .then(res => {
            console.log(res.data)
            const dataArray = res.data;
            // Lúc này dataArray đang là 1 object {new: mảng các object} gửi từ server side
            this.setState({
              news: dataArray.new
            })
          })
          .catch(error => console.log(error));
  };
  // Tham số vào hàm là 1 AxiosResponse dùng .data sẽ ra dữ liệu nhận đc từ server 
  // nãy ta gửi 1 object là {message: ...} thì dùng .message sẽ ra
  // như v, axios giúp xử lý dữ liệu nhận đc từ server cụ thể là trả ra 1 promise như thế này

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    var name = target.name;
    // target nó chứa hết cmn mọi thứ luôn r -> debug để xem. nodeName là input name là key, value là gt
    // nên đặt tên name thẻ trùng với tên state để lấy như này cho dễ
    this.setState({
      [name]: value,
    });
  };
  
  handleInsertSubmit = (event) => {
    event.preventDefault();
    const newItem = {
        Name: this.state.name,
        Age: this.state.age
    };
    // Chú ý thuộc tính trong sql của ta có viết hoa thì phải dùng đúng ở đây
    // axios post truyền data cho server luôn ở dạng object
    axios.post('/api/insert', newItem, { headers: {'Content-Type': 'application/json'} })
      .then(res => {
        // res là biến chứa thông tin về response mà server gửi lại qua biến res của hàm post của app express với send
        // nó chuyển thành 1 object và đính kèm nhiều thông tin khác. Hàm post của axios có đối số 3 specific các thuộc
        // tính khác, ví dụ headers Content-Type tùy TH mà nếu k có sẽ lỗi. Là object như ở Th này  
        // thì phải xđ là type application/json
        let news = this.state.news;
        console.log("Before: ", news)
        news = [newItem,...news];
        console.log("After: ", news)
        this.setState({ nes: news });
      })
      .catch(error => {
        // Có thể bắt các lỗi của server hiển thị lên console của client bằng các attr như dưới
        console.log("Error: ", error)
        if (error.response) {
            console.log("--------------------------------------------------")
            console.log("Data error: ", error.response.data);
            console.log("Status error", error.response.status);
            console.log("Error header: ", error.response.headers);
        } else if (error.request) {
            console.log("error request: ",error.request);
        } else {
            console.log('Error message: ', error.message);
        }
        console.log("Error config: ", error.config);
      })
    // Bên trên dùng HTTP GET còn đây dùng HTTP POST. Server phải xử lý dữ liệu đc post nx -> lại query vào SQL ez mà
    // 1 là url tương tự get, 2 là dữ liệu gửi cho server. Hàm của thư viện axios
    // Nó là promise cx có then/catch nên gộp code update vào then luôn để kiểu lưu vào database thành công mới hiện ra ấy
  };
  // Cơ chế và cách làm chuẩn hơn: cách làm hiện tại là k chuẩn => ở lần đầu tiên loading với cái file hiện tại thì 
  // server nó sẽ làm như sau: đầu tiên nó chạy lệnh query trước để lấy dữ liệu từ database và gặp hàm get mặc định 
  // ta set hàm get này sẽ được lưu lại và khi nào có client request thì sẽ thực hiện hàm get này. Tuy nhiên đáng lẽ đặt
  // query trong hàm get thì ta lại đặt hàm get trong query nên dữ liệu của hàm get là fix luôn do ta get như v. Các hàm 
  // get về sau nếu lấy cùng dữ liệu với các hàm get trc thì nó vẫn làm theo thứ tự làm cho hàm sau đè lên hàm trc. 
  // Nhưng ở đây ví dụ ta vào trang web và lấy đc dữ liệu -> vào sql đổi dữ liệu -> refresh lại trang web -> tự động 
  // thực hiện lại hàm get nhưng nó éo gọi query vì dữ liệu hàm get bị fix k thực hiện lại nên k có sự thay đổi -> đó 
  // là 1 cái sai. Sau đó ta thêm dữ liệu vào -> submit -> axios gọi post server nhận được thực hiện query insert nhét 
  // vào cơ sở dữ liệu thực. Đông thời lấy dư liệu lại lần nx và gửi lại cho client. Client nhận đc thực hiện then 
  // sẽ cập nhập lại state -> in ra màn hình dữ liệu với state mới. Refresh lại trang phát nx -> gọi lại hàm get cũ với 
  // dữ liệu fix lưu vào biến test -> nhưng nó k hiện lại dữ liệu cũ vì trong quá trình post ta đã gán lại dữ liệu mới 
  // cho test thành ra test đc cập nhập -> hàm get cũ in ra test nên refresh vẫn ra y nguyên như v
  // => Chính vì v hiện tại mọi thứ đều ổn chỉ có cái hàm get ban đầu là nên nhét query vào trong mà thôi

  handleDelete = (item) => {
    var nameObject = {
      name: item.Name
    };
    axios.post("/api/delete", nameObject, { headers: {'Content-Type': 'application/json'} })
    .then( res => {
      this.setState(prevState => ({
        news: prevState.news.filter(elm => elm.Name !== nameObject.name )
      }))
    })
    .catch(error => console.log(error));
  }

  render() {
    return(
      <div>
        <h2>Add an item</h2>
        <form onSubmit={this.handleInsertSubmit}>
          <table>
            <tbody>

              <tr>
                <th><label>Name</label></th>
                <td>
                  <input
                    name="name"
                    type="text"
                    onChange={this.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Age</label></th>
                <td>
                  <textarea
                    name="age"
                    onChange={this.handleInputChange} />
                </td>
              </tr>

            </tbody>
          </table>
          {/* chú ý sự kiện submit k để ở button submit mà ở form */}
          <button type="submit">Submit</button>
        </form>

        <hr />
        <ul>
          {this.state.news.map((item,index) => (
              <li key={index}>
                <span>Name: {item.Name}; Age: {item.Age}  </span>
                <button onClick={() => this.openModal(item,index)}>Edit</button>
                {/* truyền vào item vì click vào modal nào thì item modal đó phải hiện ra nên cân dùng */}
                <button onClick={() => this.handleDelete(item)}>Delete</button>
              </li>
          ))}
        </ul>
        {/* Khi nào thì mở và khi đóng thì làm gì -> đóng thì set lại giá trị ban đầu chứ làm gì */}
        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}>Close</button>
          <form onSubmit={this.handleEditSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label>Name</label></th>
                <td>
                  <input
                    type="text"
                    name="nameModal"
                    defaultValue={this.state.nameModal}
                    onChange={this.handleChangeModal} />
                </td>
              </tr>

              <tr>
                <th><label>Age</label></th>
                <td>
                  <textarea
                    name="ageModal"
                    defaultValue = {this.state.ageModal}
                    onChange={this.handleChangeModal} />
                    {/* dùng defaultValue nếu muốn giá trị đổi đc, value là fix cmnr */}
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit">Edit</button>
        </form>
        </Modal>
        {/* Thuộc tính isOpen là bao giờ nó xuật hiện(boolean) và onRequestClose là hàm xử lý sự kiện làm nó tắt.
        Các thẻ bên trong modal là các thẻ trong cái modal hiện ra */}
      </div>
    )
  };
};
export default App;
