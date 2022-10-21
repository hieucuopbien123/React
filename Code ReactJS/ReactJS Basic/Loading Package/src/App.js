import logo from './logo.svg';
import './App.css';
import { BarWave, BouncingBalls, CircularProgress, Coin, FadingBalls, FadingDots, FillingBottle,
    FlippingSquare, Hypnosis, Messaging, Ring, Spin, SpinStretch, TwinSpin } from "react-cssfx-loading";

// # Các thư viện components / react-cssfx-loading
function App() {
  return (
    <div className="App" style={{margin: "50px"}}>
      {/* default */}
      <BarWave />
      {/* custom */}
      {/* <BarWave color="#FF0000" width="100px" height="100px" duration="1s" /> */}
      {/* js */}
      {/* <BarWave onClick={() => alert("Clicked")} key="key" /> */}
      <FillingBottle/>
      <BouncingBalls style={{width: 40}} duration="0.5s"/>
      <Coin style={{width: 40}}/>
      <div style={{height: 40}}>
        <SpinStretch/>
      </div>
      <FadingBalls/>
      <FlippingSquare style={{width: 40}}/>
      <FadingDots/>
      <Hypnosis/>
      <TwinSpin/>
        <Ring style={{display: 'block'}}/>
      <CircularProgress style={{display: 'block'}}/>
      <Spin/>
      <Messaging/>
    </div>
  );
}

export default App;
