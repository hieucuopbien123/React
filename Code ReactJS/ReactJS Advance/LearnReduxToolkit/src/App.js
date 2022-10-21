// Test dự án có 2 loại component
// - Trường text điền vào và bấm nút thì data lấy được sẽ đổi thành dữ liệu trong text, data đó lưu vào redux
// - Bấm 1 nút nx thì dữ liệu async được xử lý

import React from "react";
import NormalRedux from "./Normal redux/index.js";
import ReduxWithHook from "./ReduxWithHook/index.js";
import { Container } from "@material-ui/core";
import ReduxToolkitSaga from "./ReduxToolkitOld/index";
import ReduxToolkitSliceThunk from "./ReduxToolkitSliceThunk/index";
import Project from "./ReduxToolkitInProject/Root.js";

function App() {
  return (
    <Container maxWidth="xl">
      <NormalRedux/>
      <ReduxWithHook/>
      <ReduxToolkitSaga/>
      <ReduxToolkitSliceThunk/>
      <Project/>
    </Container>
  );
}

export default App;
