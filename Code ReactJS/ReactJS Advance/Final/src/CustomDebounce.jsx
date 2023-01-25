import React, { useCallback } from "react";

function debounce(func, delay) {
  let timeout = null;
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const CustomDebounce = () => {
  const customDebounceFunc = useCallback(debounce((e) => console.log("Call::" + e.target.value), 2000), []);

  return (
    <div>
      <input placeholder='TestThrottle' onChange={(e) => customDebounceFunc(e)} />
    </div>
  );
}

export default CustomDebounce;