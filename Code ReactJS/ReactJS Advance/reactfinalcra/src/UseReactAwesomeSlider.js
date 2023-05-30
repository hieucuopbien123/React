import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import "./slider-custom.css";
import logo from "./logo.svg";

// Dùng react-awesome-slider
const UseReactAwesomeSlider = () => {
  return (
    <>
      <AwesomeSlider animation="fallAnimation">
        {/* Phải wrap tất cả vào thẻ div và kích thước là 100% 100%. Khi có ảnh nó giữ là 0 0 và phải set thủ công */}
        <div className='imageSlideWrapper'>
          <img src={logo}/>
        </div>
        <div>1</div>
        {/* Để chỉnh backgroundImage của từng page, ta set ở từng thẻ div */}
        <div style={{backgroundColor: "gray"}}>2</div>
        <div>3</div>
      </AwesomeSlider>
    </>
  )
}

export default UseReactAwesomeSlider;