import React, { useCallback } from "react";

function throttle(func, delay) {
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
        return;
    }
    lastCall = now;
    return func(...args);
  };
}

const CustomThrottle = () => {
  const customThrottleFunc = useCallback(throttle((e) => console.log("Call::" + e.target.value), 2000), []);

  return (
    <div>
      <input placeholder='TestThrottle' onChange={(e) => customThrottleFunc(e)} />
    </div>
  );
}

export default CustomThrottle;