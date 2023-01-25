// # React Final / Dùng debounce throttle
// Dùng lodash, underscore cho debounce

import React, { useCallback } from "react";
import _ from "lodash";
import _2 from "underscore"; // underscore tương tự lodash

const UseDebounceLodash1 = () => {

  const debounceDropDown2 = useCallback(_2.debounce((nextValue) => console.log("Gọi hàm này ít hơn:: " + nextValue), 1000), [])
  function handleInputOnchange2(e) {
    const { value } = e.target;
    debounceDropDown2(value);
  }

  const debounceDropDown = useCallback(_.debounce((nextValue) => console.log("Gọi hàm này ít hơn:: " + nextValue), 1000
    , {leading: true, trailing: true}
  ), [])
  function handleInputOnchange(e) {
    const { value } = e.target;
    debounceDropDown(value);
  }
  // Mặc định debounce chỉ thực hiện hàm khi event kết thúc sau khoảng delay time. Thêm leading thì nó sẽ thực hiện hàm thêm 1 lần 
  // khi trigger sự kiện lần đầu tiên. Còn trailing thì nó sẽ thực hiện khi chuỗi event ngừng sau delay time. Nếu trailing là false 
  // thì debounce chả làm gì cả
  // Mặc định debounce thì leading false, trailing true
  // Mặc định throttle thì leading true, trailing true

  return (
    <div>
      <input placeholder='Testdebounce Underscore' onChange={handleInputOnchange2} />
      <input placeholder='Testdebounce Lodash' onChange={handleInputOnchange} />
    </div>
  );
}

export default UseDebounceLodash1;