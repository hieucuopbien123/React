// # Module redux (bỏ)
// # Module redux saga

import './App.css';
import React from 'react';
import NewPost from "./containers/NewPostContainer.js";
import List from "./containers/ItemListContainer.js";

function App() {
  return (
    <div className="container">
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