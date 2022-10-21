// # Các thư viện components / react-slick

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <div style={{padding: "40px", backgroundColor: "#419be0"}}>
      <Slider {...settings}>
        <div>
          <img style={{margin: "0 auto"}} src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img style={{margin: "0 auto"}} src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img style={{margin: "0 auto"}} src="http://placekitten.com/g/400/200" />
        </div>
        <div>
          <img style={{margin: "0 auto"}} src="http://placekitten.com/g/400/200" />
        </div>
      </Slider>
    </div>
  );
}