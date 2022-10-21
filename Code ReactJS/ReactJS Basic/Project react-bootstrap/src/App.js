// import logo from './logo.svg';
// import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap';
// import 'jquery';
// import 'popper.js';
// // import 'react-bootstrap';//cái này thừa vì nó k phải cần mỗi file js đâu
// // import Button from "react-bootstrap/Button"//đây là import từng cái 1
// import { Button, Alert, Breadcrumb, Card, Form, Container, Col, Row } from 'react-bootstrap';

// function App() {
//   return (
//     <div>
//       <div className="btn-group">
//           <button className="btn btn-primary">Nút 1</button>
//           <button className="btn btn-danger dropdown-toggle dropdown-toggle-split" 
//           data-toggle="dropdown" href="#"></button>
//           <div className="dropdown-menu dropdown-menu-right">
//               <a href="#" className="dropdown-item">Content 1</a>
//               <div className="dropdown-divider"></div>
//               <a href="#" className="dropdown-item">Content 2</a>
//           </div>
//       </div>
//       <Container fluid>
//         <Row>
//           <Col md>
//             {/* app responsive */}
//             <Form>
//               <Form.Group controlId="formEmail">
//                 {/* control id là autofocus ấy-> click vào label là tự focus vào input dưới nó */}
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control type="email" placeholder="hieucuopbien123@gmail.com" />
//                 <Form.Text className="text-muted">
//                   Insert email or die
//                 </Form.Text>
//               </Form.Group>
//             </Form>
//           </Col>
//           <Col md>
//             <Form.Group controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="password" />
//             </Form.Group>
//           </Col>
//           <Button variant="secondary" type="submit">Login</Button>
//           {/* vì đặt cái gì trong row thì nó sẽ kéo dãn chiếm hết cái row đó */}
//         </Row>
//         {/* vẫn dùng đc style nếu muôn or dùng class luôn như bootstrap bth */}
//         <Card className="mb-3" style={{ color: "red"}}>
//           <Card.Img variant="top" src="https://picsum.photos/200/50"/>
//           <Card.Body>
//             <Card.Title>
//               This is title
//             </Card.Title>
//             <Card.Text>
//               This is text of the card
//             </Card.Text>
//           </Card.Body>
//         </Card>
//         <Breadcrumb>
//           <Breadcrumb.Item>Test 1</Breadcrumb.Item>
//           <Breadcrumb.Item active>Test 2</Breadcrumb.Item>
//           <Breadcrumb.Item>Test 3</Breadcrumb.Item>
//           <Breadcrumb.Item>Test 4</Breadcrumb.Item>
//         </Breadcrumb>
//         <Alert> This is an alert text </Alert>
//         <Button variant="primary">Test</Button>
//       </Container>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div>
      {/* <img src={require("./assets/images/download.png").default}/> */}
      <img src={"./images/download.png"}/>
    </div>
  );
}
export default App;