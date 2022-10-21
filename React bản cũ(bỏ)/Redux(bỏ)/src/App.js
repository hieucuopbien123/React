// # Module redux (bỏ bản cũ)
import logo from './logo.svg';
import './App.css';
import TestContainer from "./containers/testContainer.js";

function App() {
  return (
    <div className="App">
      <TestContainer age="100" name={console.log("Chạy đến hàm ReactDOM render")}/>
    </div>
  );
}

export default App;
