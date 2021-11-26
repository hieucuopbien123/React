//Thực chất code trong file jsx đơn thuần là javascript biên dịch tương tự từ trên xuống dưới. nhưng do ta có type
//babel nên nó cho phép ta dùng code jsx lồng vao javascript thuần. Tồn tại thêm 1 kiểu biến nx là component. Nó là 
//1 đối tượng, 1 biến số mà thôi và biến số này có thể đc viết dưới dạng code jsx. Vì v Ta code như bth chả vấn đề
//gì chỉ là chỗ nào có component thì dùng dấu () và viết code jsx biểu diễn đối tượng đó bên trong. Nếu chỉ có 1
//dòng thì mặc đinh đc bỏ dấu (). Tức cả file này bth đều là code javascript k có gì đáng ngai, nhưng react cung cho
//ta 1 số hàm và class có sẵn để sử dụng như render(), component,.. Xét bên trong 1 đối tượng
//component với code jsx:
//Nó là các thẻ xml k có dấu chấm phẩy. Bên cạnh những thứ ta đã có thể viết về nó thì:
//-các biến có phạm vi dùng đc trong câu lệnh đó có thể truy cập bởi jsx thông qua {<biến>}
//-thẻ style của html nhận vào string nhưng style của jsx là 1 JSON object
//-trong {} trong jsx thì nếu là code logic thì phải trả ra 1 component, nếu là 1 var của javascript thì là var lưu
//component-> nói chung chỉ là trả luôn ra 1 cái gì
const cssProps = {
    color: 'red',
    border: '1px solid red',
    'font-size': '2rem',
};//JSON object là cái object bth trong javascript có các attribute đó
var jsxObject1 = <div style={cssProps}> Thông báo khẩn! </div>
console.log(jsxObject1);

jsxObject1 = <div style={{
    color: 'red',
    border: '1px solid red',
    'font-size': '2rem',
}}> Thông báo khẩn </div>
//như bth, truy cập 1 biến bth trong javascipts trong jsx phải đặt trong {}

//-Trong jsx chỉ đc dùng code xml. Nhưng khi đặt trong dấu { } thì xuất hiện những dòng code gọi là pha giữa xml
//và javascript(kp là 1 trong 2). Các cách dùng câu điều kiện trong jsx: C1: dùng ? : (thực ra là dùng js {} trong jsx)
var condition = 1;
var jsxObject2 = <div> { condition ? <strong>True</strong> : null } </div>//null là bỏ trống
//C2: dùng kỹ thuật đoản mạch
var jsxObject3 = <div>{ !condition || <strong>True – Cách 2, chú ý dấu ! phủ định</strong> }</div>
//có nghĩa là 1 trong 2 cái (!condition) và phần sau đúng thì lấy cái đằng sau. && và cả 2. Tồn tại coi là true
//C3: dùng code javascript bth để lấy đối tượng javascript xong muôn dùng ở jsx thì nhét nó vào {}
let message = null;
if (condition == 0) message = <strong>Neutral</strong>;
else if (condition < 0) message = <strong>Negative</strong>;
else if (condition > 0) message = <strong>Positive</strong>;
console.log(<div>{message}</div>)//kiểu nó thg là kiểu tương tự symbol object ấy
//VD nhét vào switch case cx ok luôn, cái kia nó chỉ là 1 kiểu biến mới

var jsxItems = [];
for (let i = 1; i <= 5; ++i) {
    jsxItems.push(<li key={i}>{i}</li>);//lấy key là index
    //nhớ cứ list là phần tử phải có index(đặt index ở cấp cao nhất)
    //dùng nó như 1 kiểu biên symbol bình thường trong javascript
}
console.log(jsxItems[0]);
//dùng map cx đc or dùng vòng lặp bth cx đc
//các phần tử tạo bên trong vòng lặp luôn có 1 thuộc tính là key duy nhất. Nó kiểu biến symbol luôn có 1 key duy 
//nhất v

//!
//HTML entity là cú pháp được dùng để biểu diễn các ký tự đặc biệt hoặc được bảo lưu trong HTML. VD &lt; là HTML
//entity. Trong HTML nó hiện như bth. Trong jsx cx hiện như bth, nhưng nếu HTML entity đc dùng trong string thì 
//JSX sẽ k hiện, khi đó ta buộc dùng hàm fromCharCode
function EntityDisplay(props) {
    return <span>{props.message} &#9830;</span>
}//&#9830; hiện ngay nhưng trong string k hiện nên ta lưu hàm lại bằng 1 biến r dùng như dưới
//cả js và react đều k dùng đc bth nhé
const entity = String.fromCharCode;
console.log(<EntityDisplay message={`Tú lơ khơ ${entity(9824)} ${entity(9827)} ${String.fromCharCode(9829)}`} />)

//spread syntax trong javascript là dùng (...<tên array>) 
function sum(x, y, z) {
    return x + y + z;
}
const numbersArr = [1, 2, 3];
console.log(sum(...numbersArr));//6. Khi ...<tên array>  nó là kiểu các số liền nhau đc liệt kê ra khác với liệt kê
//các phần tử của mảng 1 chút. Dùng với () thì dùng truyền từng phần tử vào mảng đc
console.log(sum.apply(null, numbersArr));//6. k dùng this thì như này chả khác gì gọi bth
/* destructured args or dùng apply truyền mảng thì mỗi phần tử của mảng sẽ gán cho biến, còn nếu muốn 1 arg chứa
    cả mảng thì có thể truyền cả mảng vào thành 1 tham số như bth, 2 tham số còn lại sẽ undefined */

function myFunction(v, w, x, y, z) { }
let args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);//truyền multi var luôn. ...[3] chính là 3 đó theo thứ tự trong mảng

let dateFields = [1970, 0, 1];  // 1 Jan 1970
let d = new Date(...dateFields);//truyền khởi tạo

//!
let arr = [1, 2, 3];
let arr2 = [...arr]; // like arr.slice()->copy, ít có kiểu nào copy như này lắm
arr2.push(4);
//  arr2 becomes [1, 2, 3, 4] -> arr remains unaffected

//chú ý multidimension k đc, nó chỉ đúng với cấp độ 1
let a = [[1], [2], [3]];
let b = [...a];
b.shift().shift();//  1
//  Oh no!  Now array 'a' is affected as well => a [[], [2], [3]]
//hay các phần tử trong B là copy từ A nhưng mỗi phần tử của mỗi phần tử của b là trùng địa chỉ với nó của A

//dùng spread syntax để truyền tất cả props cha cho con
/*function Parent(props) {
    return <Child {props} />
}
//dùng destruturing assignment
function Parent2(props) {
    const { size, className, ...otherProps } = props;//vì props nó như 1 object v
    return (
        <Child size={size} className={className}>
            <GrandChild {...otherProps} />
        </Child>
    );
}*/
