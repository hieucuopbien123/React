import React from 'react';
import ReactDOM from 'react-dom';//import thư viện react và react-dom
import './index.css';
import App from './App'; //Load function App từ App.js
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById('root'));
//lấy nội dung từ App.js để render lên thẻ có id root trong index.html

reportWebVitals();
//sở dĩ index.html k hề script tới file javascript nào nhưng chạy lên vẫn có file App.js là vì file reportWebVitals
//sẽ đóng vai trò là 1 router điều hướng link từ index.html tới index.js