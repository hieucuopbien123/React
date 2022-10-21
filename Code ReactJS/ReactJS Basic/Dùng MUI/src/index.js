import React from 'react';
import ReactDOM from 'react-dom';//import thư viện react và react-dom
import './index.css';
import App from './App'; //Load function App từ App.js
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));
//lấy nội dung từ App.js để render lên thẻ có id root trong index.html

reportWebVitals();
