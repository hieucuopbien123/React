// # Code JSX

// Nó là các thẻ xml k có dấu chấm phẩy. Bên cạnh những thứ ta đã có thể viết về nó thì:
//- các biến có phạm vi dùng đc trong câu lệnh đó có thể truy cập bởi jsx thông qua {<biến>}
//- thẻ style của html nhận vào string nhưng style của jsx là 1 JSON object
//- trong {} trong jsx thì nếu là code logic thì phải trả ra 1 component, nếu là 1 var của javascript thì là var lưu
//component -> nói chung chỉ là trả luôn ra 1 cái gì. Nó cũng có thể trả ra 1 số hay gì cx đc nếu k ở vị trí in component

// style của component
const cssProps = {
    color: 'red',
    border: '1px solid red',
    'font-size': '2rem', // or fontSize
};
var jsxObject1 = <div style={cssProps}> Thông báo khẩn! </div>
console.log(jsxObject1);

jsxObject1 = <div style={{
    color: 'red',
    border: '1px solid red',
    'font-size': '2rem',
}}> Thông báo khẩn </div>
//như bth, truy cập 1 biến bth trong javascipts trong jsx phải đặt trong {}

// Câu điều kiện trong JSX
//- Trong jsx chỉ đc dùng code xml. Nhưng khi đặt trong dấu { } thì xuất hiện những dòng code gọi là pha giữa xml
//và javascript(kp là 1 trong 2). Các cách dùng câu điều kiện trong jsx: C1: dùng ? : (thực ra là dùng js {} trong jsx)
var condition = 1;
var jsxObject2 = <div> { condition ? <strong>True</strong> : null } </div>//null là bỏ trống
//C2: dùng kỹ thuật đoản mạch
var jsxObject3 = <div>{ !condition || <strong>True – Cách 2, chú ý dấu ! phủ định</strong> }</div>
//tức là 1 trong 2 cái (!condition) và phần sau đúng or cái sau tồn tại(coi là true) thì lấy cái đằng sau. && là và cả 2
//VD jsxObject3 là thừa thãi khi mà ta biết chắc cái sau tồn tại thì dùng && mới có giá trị chứ thế này luôn đúng
//Khi cần check tồn tại thì nên dùng || còn && thay cho if else=> điểm lợi là ta kết hợp nhiều đk được. Nếu muốn
//kết hợp nhiều đk với ?: cx được VD: () ? (() ? () : ()) : () lồng nhau
//C3: dùng code javascript bth để lấy đối tượng javascript xong muôn dùng ở jsx thì nhét nó vào {}
let message = null;
if (condition == 0) message = <strong>Neutral</strong>;
else if (condition < 0) message = <strong>Negative</strong>;
else if (condition > 0) message = <strong>Positive</strong>;
console.log(<div>{message}</div>)//kiểu nó thg là kiểu tương tự symbol object ấy
//VD nhét vào switch case cx ok luôn, cái kia nó chỉ là 1 kiểu biến mới

// Dùng list trong React / Tạo bằng vòng for
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

// Code JSX / HTML entity trong JSX
function EntityDisplay(props) {
    return <span>{props.message} &#9830;</span>
} // &#9830; hiện ngay nhưng trong string k hiện nên ta lưu hàm lại bằng 1 biến r dùng như dưới
// cả js và react đều k dùng đc bth nhé
const entity = String.fromCharCode;
console.log(<EntityDisplay message={`Tú lơ khơ ${entity(9824)} ${entity(9827)} ${String.fromCharCode(9829)}`} />)


//spread syntax trong javascript là dùng (...<tên array>) 
function sum(x, y, z) {
    return x + y + z;
}
const numbersArr = [1, 2, 3];
console.log(sum(...numbersArr));//6. Khi ...<tên array>  nó là kiểu các số liền nhau đc liệt kê ra khác với liệt kê
//các phần tử của mảng 1 chút. Dùng với () thì dùng truyền từng phần tử vào mảng đc
console.log(sum.apply(null, numbersArr));//6. k dùng this thì như này chả khác gì gọi bth. trùng hợp là 
//apply nhận tham số dưới dạng mảng nó tự tách ra từng phần tử nên ta k cần dùng destructuring
/* destructured args or dùng apply truyền mảng thì mỗi phần tử của mảng sẽ gán cho biến, còn nếu muốn 1 arg chứa
    cả mảng thì có thể truyền cả mảng vào thành 1 tham số như bth, 2 tham số còn lại sẽ undefined */

// ### Module JS / Spread syntax
function myFunction(v, w, x, y, z) { }
let args = [0, 1];
myFunction(-1, ...args, 2, ...[3]);//truyền multi var luôn. ...[3] chính là 3 đó theo thứ tự trong mảng

let dateFields = [1970, 0, 1]; // 1 Jan 1970
let d = new Date(...dateFields); // truyền khởi tạo new Date(1970, 0, 1)

let arr = [1, 2, 3];
let arr2 = [...arr]; // like arr.slice()->copy, ít có kiểu nào copy như này lắm => đây là kiểu copy nên dùng nhất
arr2.push(4);
//  arr2 becomes [1, 2, 3, 4] -> arr remains unaffected

//chú ý multidimension k đc, nó chỉ đúng với cấp độ 1. Tính chất copy của nó ý
let a = [[1], [2], [3]];
let b = [...a];
b.shift().shift();//shift xóa phần tử đầu tiên và trả ra phần tử đầu tiên(refer địa chỉ)
//  Oh no!  Now array 'a' is affected as well => a [[], [2], [3]]
//nếu chỉ shift 1 lần thì có tc copy của destructuring nên k sao
//hay các phần tử trong B là copy từ A nhưng mỗi phần tử của mỗi phần tử của b là trùng địa chỉ với nó của A
//hay chỉ copy cấp độ 1

// Spread syntax dùng cho JSX để truyền tất cả props cha cho con
function Parent(props) {
    console.log(props);
    return <div />
}
//dùng destruturing assignment rất ez
function Parent2(props) {
    const { size, className, ...otherProps } = props;//vì props nó như 1 object v
    return (
        <div>
            <Parent size={size} className={className}></Parent>
            <GrandChild {...otherProps} />
        </div>
    );
}
function GrandChild(props){
    console.log(props);
    return(
        <div></div>
    )
}
var test = {
    size: 19,
    className: "Hello",
    age: 1
}
ReactDOM.render(<Parent2 size={test.size} className={test.className} age={test.age} />, document.getElementById("hieu"));