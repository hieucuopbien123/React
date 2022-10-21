// # Module react-router-dom / Dùng react-helmet

import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//kp chỉ hàm map mà mọi hàm nếu return component luôn thì chỉ cần () => (), gán biến nào lưu component gì
const Home = (props) => (
  <div>
    <Helmet>
      <title>Home Page</title>
      <meta name="title" content={"Test1"} data-react-helmet="true" />
    </Helmet>
    <h1>Home Component: {props.name}</h1>
  </div>
);

const About = () => {
  document.title = "KJHKLJHFDK";
  return (
    <div>
      <Helmet>
        <title>About Page</title>
        <meta name="title" content={"test2"} data-react-helmet="true" />
      </Helmet>
      <h1>About Component</h1>
    </div>
  );
};

// const Routes = () => (
//     <Router>
//         <div>
//             <Route exact path='/' component={Home} />
//             <Route path='/about' component={About} />
//         </div>
//     </Router>
//     // cái này ng ta thg đặt là Router cho tiện bằng cách import BrowserRouter as Router
//     // exact là phải chính xác path mới hiện component đó k thì k hiện như trên thì about sẽ mất Home, còn k có exact
//     // vẫn hiện Home và nó sẽ hiện với mọi con của nó "/<link bất kỳ>" tương tự about luôn hiện với "/about/<bất kỳ>"
//     // dù k tồn tại VD: "/about/ádfđsff"
//     // BrowserRouter và HashRouter chỉ đc bao 1 thẻ lớn nên có nhiều con thì phải wrapper nó vs div như trên
// )

const Routes = () => {
  //Có 3 cách hiển thị với router trên là cách 1. Cách 2 là <Route render>
  //Cách này render đc inine component, truyền đc tham số vào. Khi đúng path thì sẽ thực hiện hàm khai báo trong
  //render. đó là 1 hàm tức là ta có thể viết logic tính toán trong đó xong return về component-> tùy biến
  //thích thế nào cx đc nhưng như v rắc rối ra
  var test = { name: "hieu" };
  return (
    <Router>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Switch>
        <Route exact path="/" render={() => <Home name={test.name} />} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
  //Tùy biến có thể truyền đối số props cho routes trong file app.js và dùng trong đây
  //C1 ưu tiên hơn c2 nên thống nhất dùng 1 trong 2 trong 1 Route. C3 là cách nên dùng nhất
};

// const Routes = () => {
//     var test = { name: "hieu"};
//     return (
//         <Router>
//             <Switch>
//                 <Route
//                     exact
//                     path='/'
//                     children={() => (
//                         <li>
//                             HOME
//                         </li>
//                     )}
//                 />
//                 <Route
//                     exact
//                     path='/about'
//                     children={() => (
//                         <li>
//                             About
//                         </li>
//                     )}
//                 />
//             </Switch>
//         </Router>
//     )//ví dụ khác đi ta làm với list đi
//     //có thể dùng câu điều kiện bất cứ lúc nào kể cả với class với {} của jsx VD: kiểm tra match đúng thì gán class
//     //active <li className={match ? "active" : ""}> </li> -> như v style của thẻ cũng là động
//     // => k cần thiết vì cái này ở component thì nó tự động hiện hay không hiện r
// }

export default Routes;
