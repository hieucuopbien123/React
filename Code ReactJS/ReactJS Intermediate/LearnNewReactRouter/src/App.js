import logo from './logo.svg';
import './App.css';
import RouterAll from './router/Router';
import RouterAll2 from './router/Router2';
import RouterAll3 from './router/Router3';
import RouterAll4 from './router/Router4';
import auth from './router/auth';
import history from "./router/history";

function App() {
  console.log(history);
  return (
    <div className="App">
      {/* <RouterAll/> */}
      {/* <RouterAll2/> */}
      <button onClick={() => {
        auth.login(null);
      }}>Change auth</button>
      <RouterAll3/>
      {/* <RouterAll4/> */}
    </div>
  );
}

export default App;