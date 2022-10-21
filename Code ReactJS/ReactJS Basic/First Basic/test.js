// # Basic
// ### Module JS / Biến this

//phân biệt các thể loại this từ lớn đến bé

//this global là window
console.log("Global: ", this);


//this function in global cx là window kể cả arrow function hay hàm bth vì arrow nó chỉ lấy cha của hàm này là 
//window vì hàm này có được gọi trong class hay object nào đâu
funcGlobal = () => {
    console.log("Normal Function in global", this);
}
funcGlobal();

var funcNotArr = function Animal(name) {
    //nó bảo function kiểu có this bên trong như này giống kiểu hàm khởi tạo nên dùng chuẩn class
    this.name = name,
    console.log("Arrow Function constructor in global", this);
}
funcNotArr();
/*class funcNotArr {
    constructor(name) {
        this.name = name,
            console.log("Arrow Function constructor in global", this);
    }
}
funcNotArr(); */


//this trong func construtor global thì là object của nó
function book(name) {
    this.name = name,
    console.log("Function constructor in global", this);
}
var varBook = new book("test");


//this trong function gọi bằng bind,call,apply sẽ theo đối số đầu tiên
function varBindNorm(varBind){
    console.log("Function call with bind,call,apply: " + this.name + " " + varBind);
}
varBindNorm.bind(varBook,"para1");//k chạy luôn mà chỉ gán
varBindNorm.call(varBook, "para1");
varBindNorm.apply(varBook, ["para1"]);

//trong hàm sự kiện k truyền đối số nhưng hàm có đối số->biến sẽ undefined nhưng k dừng ct->nên truyền đủ với event
function onchangeFunction(e){
    console.log("Hàm xử lý sự kiện có đối số nhưng k truyền đối số: ", this, " ", e);
}
//trong hàm sự kiện truyền đối số this->e chính là cái thẻ node, biến thẻ
function onchangeFunction1(e){
    console.log("Hàm xử lý sự kiện truyền this: ", this, " ", e);//VD: gán e.innerText="";
}
//hàm sự kiện mà truyền sự kiện event thì e là event->this cả 3 th đều là window như bth
function onchangeFunction2(e){
    console.log("CHECK: ", e.target.tagName, " ", e.currentTarget.tagName);
    console.log("Hàm xử lý sự kiện truyền event: ", this, " ", e);
}
//phân biệt currentTarget và target. target là thẻ có sự kiện bắt đầu tìm của bubbling phase. currentTarget là thẻ 
//mà có event trên nó để kích hoạt đầu tiên. VD: thẻ div bao thẻ p và khai báo onClick cho thẻ div-> click vào thẻ p
//thì target là thẻ p, currentTarget là thẻ div

//this trong class là class đó. Có bind/call/apply cái là vào thằng class ngay
class testThisClass{
    constructor(name)
    {
        this.name = name;
        console.log("This trong class: ", this);
    }
    print(){
        console.log("This trong hàm class: ", this);
    }
}
var varClass = new testThisClass("Hieu");
varClass.print();
varClass.print.call(varBook);