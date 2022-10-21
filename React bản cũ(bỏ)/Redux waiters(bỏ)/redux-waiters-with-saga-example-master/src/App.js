import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { isWaiting, useWaiter } from 'redux-waiters'
import { appThemeActionCreator, appUpdateThemeAction } from './reducers/app'
import logo from './logo.svg'
import Login from './Login'
import Counter from './Counter'
import './App.css'


const appThemeSelector = isWaiting(appUpdateThemeAction.id)
function App() {
  const dispatch = useDispatch();
  const gl = useSelector(state => {
    console.log(state);
    return state.app.gl
  });
  const [appThemeLoading] = useWaiter(appThemeSelector)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          with gl: {gl ? 'true' : 'false'}<br />
          {appThemeLoading && 'app loading...'}
        </p>
        <button onClick={() => { dispatch(appThemeActionCreator()) }}>Update theme</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Login />
        <Counter />
      </header>
    </div>
  );
}

export default App;

//file hiển thị app, dispatch action update theme