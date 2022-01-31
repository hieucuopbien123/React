import React from "react";
import NormalRedux from "./Normal redux/index.js";
import ReduxWithHook from "./ReduxWithHook/index.js";
import { Container } from "@material-ui/core";
import ReduxToolkitSaga from "./ReduxToolkitOld/index";
import ReduxToolkitSliceThunk from "./ReduxToolkitSliceThunk/index";

function App() {
  return (
    <Container maxWidth="xl">
      <NormalRedux/>
      <ReduxWithHook/>
      <ReduxToolkitSaga/>
      <ReduxToolkitSliceThunk/>
    </Container>
  );
}

export default App;
