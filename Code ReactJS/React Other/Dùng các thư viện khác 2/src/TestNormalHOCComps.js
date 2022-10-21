// ## Các thứ quan trọng khác / # Dùng các thư viện chức năng / Dùng hoist-non-react-statics

import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

// Thật ra class và functional components k khác nhau khi nói về HOC. TH1: là 1 components nhận components khác để
// cho ra 1 components mới nhưng static method sẽ k được copy. TH2: ta dùng package hoistNonReactStatics sẽ tự copy
// hết các static method. Dù sao thì static method của 1 class rất hiếm khi dùng nên toàn dùng TH1 chứ éo dùng TH2 bh

//TH1: static method k tự copy khi dùng components này ở ngoài
export const TestNormalHOCComps = (props) => {
  const Tag = props.testnormalcomp;
  return (
    <div>
      <Tag />
      {TestNormalHOCComps.test}
    </div>
  );
  // static luôn dùng trong hàm thì vẫn dược k nói làm gì nhưng ta muốn dùng ở trong component bên ngoài cơ
  // Chú ý default props cx éo phải static
};
TestNormalHOCComps.test = "a"; // static data 

// TH2 dùng HOC chuẩn qua 1 hàm số và lấy được static method qua class
function GetComponents(props) {
  const TestNormalHOCComps1 = (props) => {
    const Tag = props.testnormalcomp;
    return (
      <div>
        <Tag />
        {TestNormalHOCComps1.test}
      </div>
    );
  };
  TestNormalHOCComps1.test = "a";
  const CopyComp = () => <TestNormalHOCComps1 testnormalcomp={props.testnormalcomp} />;
  // Nếu ta copy chay từng thuộc tính static của TestNormalHOCComps1 vào CopyComp cũng được nhưng phải biết tên thuộc 
  // tính static của nó là gì hoistNonReactStatics tự tìm tất cả static và làm hộ ta mà k cần bt tên trc
  return hoistNonReactStatics(CopyComp, TestNormalHOCComps1);
}
export default GetComponents;
