import React from 'react';
import { connect } from 'react-redux';
import { isWaiting, anyWaiting } from 'redux-waiters';
import { addNumberCreator, addNumberAction, minusNumberCreator, minusNumberAction } from './reducers/counter';
import logo from './logo.svg';
import './App.css';

function App({ adding, minusing, anyLoading, addNumber, minusNumber, counter }) {
  //khi dùng function, k dùng class vưới redux thì phải thêm như này
  return (
    <div className="App" >
      <div className={console.log("render")}></div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>Number: {counter} </p>
        <button onClick={addNumber.bind(null,2)}>Add number</button>
        <button onClick={minusNumber}>Minus number</button>
        {adding ? 'Adding...' : ''}
        {minusing ? 'Minusing...' : ''}
        {anyLoading && <p>Any loading...</p>}
      </header>
    </div>
  );
}

const isAddingNumerSelector = isWaiting(addNumberAction.id);
const isMinusingNumerSelector = isWaiting(minusNumberAction.id);
console.log(isAddingNumerSelector);//tạo ra 1 hàm số, hàm này cung cấp biến trạng thái
//nếu addNumberAction đang đc gọi thì isAddingNumerSelector(waiter) sẽ true với waiter là cái reducer của redux-waiters
//còn nếu kp đang thực hiện nó sẽ trả ra true nên ta mới ốp vào bên trên dễ như v

const mapStateToProps = (state) => {
  const {
    waiter,
    counter: { counter },
  } = state;
  console.log("Mapstatetoprops")
  console.log("State: ", state);
  return {
    adding: isAddingNumerSelector(waiter),
    minusing: isMinusingNumerSelector(waiter),
    anyLoading: anyWaiting(waiter),
    counter,//ngoài giá trị tăng là counter, ta lấy thêm các trạng thái 
  };
  //tạo ra các biến này truyền vào props của class-> chỉ có counter là dữ liệu cần lấy, còn 3 biến kia sẽ cho biết 
  //có action nào đang được loading. anyWaiting sẽ bắt mọi action miễn có 1 cái nào đó đang load
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (param) => {
      console.log("Call add number: ", param)
      dispatch(addNumberCreator(param))
    },//vẫn dùng truyền đc param chính là action.payload nếu muôn
    minusNumber: () => dispatch(minusNumberCreator())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

//Quy trình: tạo ra resource cho action với createActionResources->tạo reducer xử lý action với createReducer xử lý cả
//3 TT đang thực hiện, thực hiện lỗi và thực hiện tcong-> tạo waiterReducer mặc định-> tạo xử lý dispatch như nào với
//waiterAction async try catch-> tạo biến kiểm soát có đang waiting hay k->xử lý giao diện với action loading hay k
//->mapStateToProps bth nhưng thêm biến boolean waiting hay k-> mapDispatchToProps, connect->createStore->chơi thôi