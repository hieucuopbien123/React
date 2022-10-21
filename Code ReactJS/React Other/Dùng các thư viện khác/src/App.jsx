// # Basic / import export
// # Các thư viện components / react-trend / react-md-spinner / react-color / react-content-loader
// # Dùng các thư viện chức năng / screenful

import { useState } from "react";
import ReactAwesomeReveal from "./ReactAwesomeReveal";
import ReactBurgerMenu from "./ReactBurgerMenu";
import ReactSlick from "./ReactSlick";
import VideoPlay from "./VideoPlay";
import { version } from "../package.json";
import screenfull from "screenfull";
import Trend from 'react-trend';
import MDSpinner from "react-md-spinner";
import EditImage from "./EditImage";
import Pagination from "./Pagination";
import GridLayout from "./GridLayout";
import ReactSelect from "./ReactSelect";
import { SketchPicker } from 'react-color';
import ContentLoader, { Facebook } from 'react-content-loader';
import ReactSuggestion from "./ReactSuggestion";

function App() {
  const [color, setColor] = useState("#fff");

  console.log(version);

  const handleClickFullscreen = () => {
    // Ta k thể cho tự vào là full screen ngay được mà phải ấn nút
    if(screenfull.isEnabled){
      screenfull.request();
    }
  }
  return (
    <div>
      <ReactBurgerMenu/>
      <Trend data={[0, 10, 5, 22, 3.6, 11]}
        autoDraw
        autoDrawDuration={3000}
        autoDrawEasing="ease-in" 
        gradient={['#0FF', '#F0F', '#FF0']}
        // width={500} height={400}
        strokeWidth={2} padding={5}
        smooth radius={20}
      />
      <button onClick={handleClickFullscreen}>Fullscreen</button>
      <ReactAwesomeReveal/>
      <ReactSlick/>
      <VideoPlay/>
      <MDSpinner size={40}/>
      <EditImage/>
      <Pagination itemsPerPage={4} />
      <GridLayout />
      <ReactSelect />
      <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)}/>

      <Facebook />
      <ContentLoader viewBox="0 0 380 70">
        {/* Bên trong chỉ dùng được svg element */}
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
      
      <ReactSuggestion/>
      {/* ## Tổng kết module HTML_CSS / # Basic / Các thẻ input */}
      {/* Bỏ autocomplete mặc định của browser */}
      <input id="email" type="text" aria-autocomplete="list"></input>
    </div>
  )
}

export default App
