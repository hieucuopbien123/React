// ## Các thứ quan trọng khác / # Dùng các thư viện chức năng
// Dùng animate.css / Dùng react-intl / Dùng styled-components / Dùng immer / Dùng intl / Dùng compare-versions
// Dùng lodash / Dùng public-ip / Dùng whatwg-fetch / Dùng invariant / Dùng lucene-query-parser

// CSS in JS / styled-components

// Dùng tools cho React / Dùng stylelint

// ## NodeJS / # Các package backend NodeJS thường dùng / Dùng rimraf

import "./App.css";
import GetComponents, { TestNormalHOCComps } from "./TestNormalHOCComps.js";
import hoistNonReactStatics from "hoist-non-react-statics";
import "animate.css";
import {
  IntlProvider,
  FormattedDate,
  FormattedNumber,
  FormattedPlural,
  FormattedMessage,
  FormattedRelativeTime,
} from "react-intl";
import styled, { keyframes } from "styled-components";
import moment from "moment";
import produce from "immer";
import compareVersions, { compare, satisfies, validate } from "compare-versions";
import publicIp from "public-ip";
import _, { conformsTo, isFunction, isObject } from "lodash";
import "whatwg-fetch";

// Tạo thẻ 
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;
// Truyền được props vào css style
const Button = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;
// Ta truyền vào giá trị của biến rotate360 chứ kp viết thuần string vào đó
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

// Cái package này quá xàm lol. Nó k cung cấp font chữ mà nó cung cho ta biết vc 1 font chữ có được load k. Nó hỗ
// trợ nhiều font của webservice. VD ta có 1 dòng chữ dùng font mặc định, xong ta muốn nó được load 1 cái font
// gì khác nhưng k rõ font đó có load available hay k. Ta dùng cái package này để check xem nó load được k. Nếu
// load k được thì thông báo lỗi, nếu load được thì bên trong ta có thể dùng DOM để set font đó cho nó vì đảm bảo
// nó load xong r => Nch là thừa thãi vì ta thường truyền vào 1 set font cho font-family để k có thì lấy font tiếp
// import FontFaceObserver from 'fontfaceobserver';
// var font = new FontFaceObserver('Oxygen', {
//   weight: 400
// });
// font.load().then(function () {
//   console.log('Font is available');
// }, function () {
//   console.log('Font is not available');
// });

// whatwg-fetch giúp ta fetch mọi thứ trực tiếp, file json, ảnh, POST, lấy thông tin
// header status như bth, upload file như dưới nó load hẳn file html cũng được
fetch("../public/index.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (body) {
    console.log(body);
  });

// Dùng immer
const baseState = [
  {
    todo: "Học TypeScript",
    done: false,
  },
  {
    todo: "Dùng thử immer",
    done: false,
  },
];
const nextState = produce(baseState, (draftState) => {
  // draftState chính là 1 bản sao của baseState có thể thay đổi draftState tùy ý mà không sợ ảnh hưởng đến baseState
  draftState.push({ todo: "Post facebook khoe thành quả" });
  draftState[1].done = true;
});
console.log(nextState);
// Chung quy lại là nó cho phép thao tác trên 1 biến const thay đổi được giá trị. VD dùng redux cổ
/*
const byId = (state, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        ...action.products.reduce((obj, product) => {
          obj[product.id] = product
          return obj
        }, {})
      }
  }
}
=> nhanh hơn với immer:
const byId = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RECEIVE_PRODUCTS:
        action.products.forEach(product => {
          draft[product.id] = product
        })
      }
  })
=> NN là vì immer no lấy hết state, phần còn lại chỉnh sửa như nào thì chỉnh sửa với biến draff
và nó return ra nextState phù hợp với đúng reducer thì phải return ra state tiếp theo
Tuy nhiên có vẻ như redux-toolkit đã làm sẵn điều này cho ta vì ta k cần return nextState mà mặc nhiên
state nó giữ nguyên và ta muốn thay đổi thuộc tính gì thì đổi trực tiếp trên state
*/

console.log(compareVersions("10.0.0", "10.0.0")); //  0
console.log(compareVersions("11.1.1", "10.0.0")); //  1
console.log(compareVersions("10.0.0", "11.1.1")); // -1
const versions = ["1.5.19", "1.2.3", "1.5.5"];
const sorted = versions.sort(compareVersions);
console.log(sorted);
console.log(compare("10.0.1", "10.0.1", "=")); // true
console.log(compare("10.1.1", "10.2.2", "<")); // true
console.log(compare("10.1.1", "10.2.2", ">=")); // false
console.log(satisfies("10.0.1", "~10.0.0")); // true
console.log(satisfies("10.1.0", "~10.0.0")); // false
console.log(satisfies("10.1.2", "^10.0.0")); // true
console.log(satisfies("11.0.0", "^10.0.0")); // false
console.log(satisfies("10.1.8", ">10.0.4")); // true
console.log(satisfies("10.0.1", "=10.0.1")); // true
console.log(satisfies("10.1.1", ">=10.2.2")); // false
console.log(validate("1.0.0-rc.1")); // true
console.log(validate("1.0-rc.1")); // false
console.log(validate("foo")); // false vì nó k đúng cú pháp 1 version

var Intl = require("intl");
var invariant = require("invariant");
(async function test() {
  // Có Intl.DateTimeFormat, Intl.NumberFormat
  await import("intl/locale-data/jsonp/en-IN"); // import từng ngôn ngữ
  await import("intl/locale-data/complete"); // import tất cả
  const number = 123456.789;
  console.log(new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(number));
  // expected output: "123.456,79 €"

  // the Japanese yen doesn't use a minor unit
  console.log(new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(number));
  // expected output: "￥123,457" => tự làm tròn

  // limit to three significant digits
  console.log(new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 }).format(number));
  // expected output: "1,23,000"

  // Cái này chỉ log error và dừng các cái bên dưới
  invariant(true, "Not throw error"); 
  // invariant(false, "throw error");
  // NODE_ENV k là production thì buộc có message, nếu k nó sẽ luôn throw, còn production thì message là optional

  console.log(await publicIp.v4());
  console.log(await publicIp.v6());

  console.log(isObject({}));
  var object = {
    test1: {},
    test2: () => {},
  };
  var checkObject = {
    test1: isObject,
    test2: isFunction,
  };
  invariant(conformsTo(object, checkObject), "Error"); // true
})();

var parser = require("lucene-query-parser");
var results = parser.parse('title:"The Right Way" AND text:go');
console.log(results); // in ra là lấy được hết
console.log(results["left"]["field"]); // title
console.log(results["left"]["term"]); // The Right Way
console.log(results["operator"]); // AND
console.log(results["right"]["field"]); // text
console.log(results["right"]["term"]); // go
// => Tức nó coi term là giá trị của field

// return the expression tree
results = parser.parse("test AND (foo OR bar)");
console.log(results["left"]["term"]); // test
console.log(results["operator"]); // AND
var rightNode = results["right"]; // the grouped expression in parentheses becomes it's own nested node
console.log(rightNode["left"]["term"]); // foo
console.log(rightNode["operator"]); // OR
console.log(rightNode["right"]["term"]); // bar

// Array
_.join(['a', 'b', 'c'], '~'); // => 'a~b~c'
_.last([1, 2, 3]); // => 3
_.chunk(['a', 'b', 'c', 'd'], 3); // => [['a', 'b', 'c'], ['d']]
_.fill([4, 6, 8, 10], '*', 1, 3); // => [4, '*', '*', 10]
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': true },
  { 'user': 'fred', 'active': false }
];
_.findIndex(users, function(o) { return o.user === 'barney'; }); // 0
_.drop([1, 2, 3], 2); // => [3]
_.filter(users, function(o) { return !o.active; }); // [{user: 'barney', active: false},{user: 'fred', active: false}]
_.size([1, 2, 3]); // => 3
_.sortBy(users, ['user', 'active']);
// [{user: 'barney', active: false}, {user: 'fred', active: false}, {user: 'fred', active: true}]
_.includes([1, 2, 3], 1, 2); // => false vì tìm 1 từ vị trí 2 trong 2 mảng kia

// Object
var object = { 'a': { 'b': 2 } };
_.has(object, "a"); // => true
var users2 = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
_.pick(users2, ['pebbles', 'fred']); // => {'fred':{'age':40,'active': false},'pebbles':{'age': 1,'active': true}}

_.findKey(users2, function(o) { return o.age < 40; }); // 'barney'
_.findKey(users2, 'active'); // => 'barney'
_.findKey(users, ['active', false]); // => 'fred'
console.log(_.merge({ cpp: "12" }, { java: "23" }, { python:"35" }));

const TestTag = () => {
  return <div className="animate__animated animate__fadeIn animate__delay-2s">Hello</div>;
};
const TestTag2 = () => {
  return <div className="animate__animated animate__bounce animate__faster">World</div>;
};
function App() {
  // static của component gốc vẫn còn
  console.log(TestNormalHOCComps.test);

  // Vấn đề là đặt dùng CopyComp như dưới lỗi mà dùng TT GetComponents k lỗi. Bởi vì phải dùng function React bản này
  // k thể gán mà k thông qua function vì k đúng với quy tắc là 1 functional component nên phải dùng như dưới
  const CopyComp = () => <TestNormalHOCComps testnormalcomp={TestTag} />;
  console.log(CopyComp.test); // undefined

  const CopyComp2 = GetComponents({ testnormalcomp: TestTag2 });
  console.log(CopyComp2.test); // 'a'

  // Nó cũng cho phép truyền vào options xem lấy các biến static nào
  const CopyComp3 = (() => {
    return hoistNonReactStatics(() => <TestNormalHOCComps testnormalcomp={TestTag2} />, TestNormalHOCComps, {
      myStatic: true,
      myOtherStatic: true,
    });
  })();
  console.log(CopyComp3.test);

  var now = moment();
  console.log(now.get("year"));
  var time = moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]); //định dạng có thể là 1 trong nhiều
  console.log(time);
  console.log(time._i);
  console.log(moment.isDate(new Date())); // check là date object
  console.log(moment.isMoment(moment())); // check là moment object
  console.log(moment() instanceof moment); // tương tự

  return (
    <div className="App">
      <CopyComp />
      <CopyComp2 />
      <CopyComp3 />

      {/* Thông thường thì ta có thể dùng để format bằng tiếng anh là ok nhưng thực tế nếu 1 ứng dụng là đa ngôn
      ngữ thì mọi chỗ đều phải dùng ngôn ngữ đó chứ k thể lúc ngôn ngữ này, lúc ngôn ngữ khác nên cái này chỉ dùng
      để format các thứ thôi chứ k thể làm 1 app đủ mọi ngôn ngữ cx như lấy locale vùng của họ được */}
      <IntlProvider locale="fr">
        {/* VD hiển thị với tiếng pháp, chuyển sang vn mới thấy số có dấu phẩy */}
        <FormattedDate value={new Date(1459913574887)} day="numeric" month="long" year="numeric" />
        <br />
        <FormattedNumber value={1000} />
        <br />
        <FormattedPlural value={10} one="message" other="messages" />
        <br />
        <FormattedRelativeTime value={10} unit="day" />
        <br />
        <FormattedMessage
          defaultMessage="My name <a>is</a> <cta>{name}</cta>" // Message should be a string literal
          id="-1" // Khi k dùng id vẫn phải truyền id gán 1 cái k tồn tại
          values={{
            name: "Nguyen Thu Hieu", // chỉnh name trong cặp {}
            a: (chunks) => ( // chỉnh nội dung phạm vi thẻ a 
              <a class="external_link" target="_blank" href="https://www.example.com/shoe" rel="noreferrer">
                {chunks}
              </a>
            ),
            cta: (chunks) => <strong class="important">{chunks}</strong>,
          }}
        >
          {(txt) => <h1>{txt}</h1>}
        </FormattedMessage>
        <br />
        <FormattedMessage id="Cách dùng id thì k có các cái kia">{(txt) => <h1>{txt}</h1>}</FormattedMessage>
        <div class="animate__animated animate__flash animate__repeat-2">Test animate</div>
      </IntlProvider>

      <Wrapper>
        <Title>Hello World, this is my first styled component!</Title>
      </Wrapper>
      <div>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
      </div>
      <div>
        <Rotate>&lt; 💅 &gt;</Rotate>
      </div>

    </div>
  );
}

export default App;
