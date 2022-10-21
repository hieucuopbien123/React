// # Basic / log trong ref

// Phân biệt các thể loại this từ lớn đến bé


//this trong các hàm và các thuộc tính đều là chính class đó
//this trong code JSX cx là chính class đó, trong các thuộc tính bth cx là class đó;
//Set up: hàm có đối số mà k truyền đối số thì đối số luôn là undefined nhé; nếu ta chỉ có tên hàm mà k có ngoặc() thì
//kp là nó k truyền đâu mà là nó là code JSX truyền mặc định đấy, với ref, với event
//this trong ref hay trong event cx là class đó; sự kiện k truyền đc event nx vì lỗi thời r
class ClassJSX extends React.Component {
    print(e){
        console.log("Callback ref có đối số nhưng k truyền đối số -> undefine: ", this, " ", e);
    }//this vẫn là class, e undefined
    print1(e){
        console.log("Callback ref có đối số và truyền this: ", this, " ", e);
    }//this vẫn là class, e là class
    print2(e){
        console.log("Callback ref có đối số truyền mặc định: ", this, " ", e);
    }//this bị mất luôn, e là thẻ
    print3(e){
        console.log("Hàm sự kiện có đối sô truyền this: ", this, " ", e);
    }//k hoạt động
    print4(e){
        console.log("Hàm sự kiện có đối sô truyền mặc định: ", this, " ", e);
    }//this undefine, e lại thành event
    print5() {
        console.log("Callback ref k đối số truyền mặc định: ", this)
    }//this mất luôn
    print6() {
        console.log("Hàm sự kiện k đối số truyền mặc định: ", this)
    }//this mất luôn
    print9() {
        console.log("Callback ref k đối số truyền this: ", this)
    }//this mất luôn
    print10() {
        console.log("Hàm sự kiện k đối số truyền this: ", this)
    }//k hoạt động
    

    printf = (e) => {
        console.log("Arrow: Callback ref có đối số nhưng k truyền đối số -> undefine: ", this, " ", e);
    }//this vẫn là class, e undefined
    printf1 = (e) => {
        console.log("Arrow: Callback ref có đối số và truyền this: ", this, " ", e);
    }//this vẫn là class, e là class
    printf2 = (e) => {
        console.log("Arrow: Callback ref có đối số truyền mặc định: ", this, " ", e);
    }//this vẫn là class, e là thẻ
    printf3 = (e) => {
        console.log("Arrow: Hàm sự kiện có đối sô truyền this: ", this, " ", e);
    }//k hoạt động
    printf4 = (e) => {
        console.log("Arrow: Hàm sự kiện có đối sô truyền mặc định: ", this, " ", e);
    }//this vẫn là class, e là event
    printf5 = () => {
        console.log("Arrow: Callback ref k đối số truyền mặc định: ", this)
    }//this vẫn là class
    printf6 = () => {
        console.log("Arrow: Hàm sự kiện k đối số truyền mặc định: ", this)
    }//this vân là class
    printf9 = () => {
        console.log("Arrow: Callback ref k đối số truyền this: ", this)
    }//this vẫn là class
    printf10 = () => {
        console.log("Arrow: Hàm sự kiện k đối số truyền this: ", this)
    }//k hoạt động

    print7(e){
        console.log("Hàm sự kiện có đối số bind this: ", this, " ", e);
    }//this vẫn là class, e là event
    printf7 = (e) => {
        console.log("Arr: Hàm sự kiện có đối số bind this: ", this, " ", e);
    }//this vẫn là class, e là event
    print8(e) {
        console.log("Callback ref có đối số bind this: ", this, " ", e);
    }//this vẫn là class, e undefine
    printf8 = (e) => {
        console.log("Arr: Callback ref có đối số bind this: ", this, " ", e);
    }//this vẫn là class. e undefine

    print11(e) {
        console.log("Hàm sự kiện bth 1 đối số lại gọi hàm thông qua 1 hàm khác: ", this, " ", e)
    }//this vẫn là class, e lại thành event
    //bởi vì khi gọi hàm nó bị mất cái this, thì ta gọi hàm này thông qua 1 hàm khác tự nhiên this lại chuẩn
//KL: trong js thì mọi thứ đều tường minh, nhưng sang react thì nó rất rối. Ta chỉ lọc ra cái nào hoạt động với this là 
//class còn e là thẻ or event; 

//=>Quy tắc: -Hàm có đối số mà k truyền đối số thì coi là truyền vào undefine thì hàm vẫn chạy nhưng đối số đó k dùng vì 
//undefine; còn hàm k có đối số mà cứ truyền vào thì ref chạy bth k dùng para, còn sự kiện thì lỗi
//-Khi ta truyền mặc định, thì như bth cái ref nó chính là ref thẻ này, còn sự kiện nó là event như bth. Thế nếu sự kiện
//ta truyền this thì nó kb this là event hay class nên mới k chạy đc do đó phải .bind(this) nếu muốn dùng this là class
//-this mặc định là class ở mọi cấp, chỉ là event nó phân vân giữa event và class nên k chạy đc phải specific thôi
//bind this k truyền gì cả lại thành truyền mặc định với event nên e là event. Nếu hàm event mà dùng this thì phải 
//specific nó k thì nó kb this là cái gì. Nếu truyền mặc định thì k specific đc this nên nó undefine
//Tính năng bind k dùng đc vs ref
//-arrow function có 1 tc đặc biệt khác với function bth là nó giữ cho this của hàm luôn là mặc định chứ k cần specific
//j hết.
///cái lỗi mất this là 1 bugs của react và nên luôn luôn dùng arrow function để luôn có this

//=>dùng tối ưu nhất là: callback ref có đối số truyền mặc định;
//dùng sự kiện thì arrow function có đối sô truyền mặc định;
//bind thì hàm kiểu j cx đc; or dùng hàm j cx đc vs 1 đối số dùng hàm truyền hàm;

//ref thì luôn thực hiện khi render r; Hàm sự kiện khi có ngoặc () thì sẽ thực hiện khi render() tới, còn k có () thì
//sẽ thực hiện khi click(k tính bind this vì bind this éo phải). Bởi vì có ngoặc tức là load phát thấy hàm thực hiện
//luôn và k lưu hàm lại, còn k có ngoặc tức là truyền sự kiện mà chưa click thì làm gì có sự kiện gì nên k làm gì cả
//về sau click vào mới thực hiện-> có logic cả. Cái cách tạo hàm mới event thì thật ra là truyền hàm nhưng k thực hiện
//ngay giống kiểu ta mới khai báo 1 hàm mà thôi. Mà khai báo thì đâu có thực hiện, nó lưu hàm lại khi nào có sư kiẹn
//sẽ truyền vào để thực hiện, v thôi. Đó gọi là sử dụng thông qua hàm nặc danh
    render() {
        return (
            <div>
                <div>Name: {this.props.name}</div>
                <input type="button" value={this.props.name}/><br />

                <input type="text" ref={this.print()} placeholder="STAGE ONE"/><br />
                <input type="text" ref={this.print1(this)} /><br />
                <input type="text" ref={this.print2} /><br />
                <button onClick={this.print3(this)}>Button 1</button>
                <input type="text" onChange={this.print3(this)} /><br />
                <button type="button" onClick={this.print4}>Button 2</button>
                <input type="text" onChange={this.print4} /><br />
                <input type="text" ref={this.print5} /><br />
                <button type="button" onClick={this.print6}>Button 3</button>
                <input type="text" onChange={this.print6} /><br />
                <input type="text" ref={this.print9(this)} /><br />
                <button type="button" onClick={this.print10(this)}>Button 3</button>
                <input type="text" onChange={this.print10(this)} /><br />

                <input type="text" ref={this.printf()} placeholder="STAGE TWO"/><br />
                <input type="text" ref={this.printf1(this)} /><br />
                <input type="text" ref={this.printf2} /><br />
                <button onClick={this.print3(this)}>Button 1</button>
                <input type="text" onChange={this.printf3(this)} /><br />
                <button type="button" onClick={this.printf4}>Button 2</button>
                <input type="text" onChange={this.printf4} /><br />
                <input type="text" ref={this.printf5} /><br />
                <button type="button" onClick={this.printf6}>Button 3</button>
                <input type="text" onChange={this.printf6} /><br />
                <input type="text" ref={this.printf9(this)} /><br />
                <button type="button" onClick={this.printf10(this)}>Button 3</button>
                <input type="text" onChange={this.printf10(this)} /><br />
                
                <input type="text" ref={this.print8()} placeholder="STAGE THREE"/><br />
                <input type="text" ref={this.printf8()} /><br />
                <button type="button" onClick={this.print7.bind(this)}>Button 1</button>
                <input type="text" onChange={this.print7.bind(this)}/><br />
                <button type="button" onClick={this.printf7.bind(this)}>Button 2</button>
                <input type="text" onChange={this.printf7.bind(this)}/><br />
                <button type="button" onClick={event => this.print11(event)}>Button 2</button>
                {/* event ở đây kp sự kiện nhé, nó là đối số truyền vào hàm mà hàm sự kiện đc truyền mặc định
                là event nên chỗ này cx chỉ như gọi mặc định or truyền event vào arrow v */}

                <input type="text" onChange={() => this.print11()}/><br />
            </div>
        );
    }
}
ReactDOM.render(
    <ClassJSX name="hieu"/>,
    document.getElementById("test")
)

//!
//TK lại: có tất cả 5 cách truyền đối số: func(), func(this), func, func.bind(this,<para>), (a)=>func(a) với 2 
//TH là arrow func và hàm bth.
//This trong mọi thứ luôn là class, event deprecated
//Truyền có () -> gọi hàm để chạy khi compile tới và lấy giá trị trả về gán cho; truyền mỗi tên thì là phép gán đơn 
//thuần với truyền mặc định. Với TH đó thì ref mặc định là thẻ, sự kiện là event.
//Nếu có đối số mà k truyền, k có đối số mà truyền thì gây ra undefined hàm vẫn chạy nhưng k nên dùng sai nv
//Bug react: hàm bth truyền dùng cho sự kiện sẽ bị hỏng this k hđ-> fix bằng cách dùng arrow function
//Sự kiện bind this sẽ chạy hết mọi TH vì fix cái lỗi trên nhưng bind k hoạt động với callbackref
//truyền a=>func(a) chính là truyền k có () và cân mọi thế loại đối số-> tiện hơn cả bind this và mặc định
//Đó chính là PP chung cho bất cứ loại truyền nào trong react. Về cơ bản giống javascript nhưng lại thêm kiểu có () 
//thì k gán hàm mà thực hiện luôn r gán gt trả về. Thêm vào đó react nó sẽ dùng code jsx nên sinh ra kiểu gọi là 
//truyền k có () mới thực sự thực hiện phép gán hàm

//Trong react sự kiện onChange đc phát ra liên tục khi gõ text vào còn trong js onChange chỉ phát ra khi enter or
//click ra ngoài

//mặc định thì this là undefine lỗi react fix bằng arrow, e tự là event or class