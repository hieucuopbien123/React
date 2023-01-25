// # React Final / Dùng debounce throttle
// Dùng lodash cho throttle

import React, { useRef, useState, useEffect } from "react";
import _ from "lodash";

const UseThrottleLodash1 = () => {
  // Chỉ gọi hàm max 1 lần trong 2000ms
  const throttleDropDown = useRef(_.throttle((nextValue) => console.log("Gọi hàm này ít hơn:: " + nextValue), 2000), []).current; 
  function handleInputOnchange(e) {
    const { value } = e.target;
    throttleDropDown(value);
  }

  return (
    <div>
      <input placeholder='TestThrottle' onChange={handleInputOnchange} />
    </div>
  );
}

export default UseThrottleLodash1;