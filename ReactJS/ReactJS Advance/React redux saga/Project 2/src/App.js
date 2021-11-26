import logo from './logo.svg';
import './App.css';
// import Test from './test.js';
import React from 'react';
import NewPost from "./containers/NewPostContainer.js";
import List from "./containers/ItemListContainer.js";

function App() {
  return (
    <div className="container">
      {/* <Test /> */}
      <div>
        <NewPost />
      </div>
      <div>
        <List />
      </div>
    </div>
  );
}

export default App;