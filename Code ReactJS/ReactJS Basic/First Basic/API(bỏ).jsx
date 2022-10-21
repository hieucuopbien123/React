// (bỏ)

class Random extends React.Component {
    constructor(props) {
        super(props);
        this.textURL = React.createRef();
        this.textRandom = null;
        this.setTextRandom = element => {
            this.textRandom = element
        }
        this.testFocusRef = React.createRef();
    }

    //Pb:DOM khác Component, render component lên xong sẽ thành cây DOM trong html có root là node bao ngoài component đó
    //Các cách truy cập vào text của 1 node bất kỳ trong mô hình DOM, xong ví dụ lấy text của nó
    //C1: dùng ref với hàm createRef. Cách này rất ổn, vào trong debug search mọi thứ cần có và lấy ra, dùng current
    //Tạo createRef với tên trong constructor->dùng ref trong thẻ->sử dụng this.<tên> => cách 1 hay nhất
    newRandomValue(event) {
        console.log(this.textURL.current.innerText.split(" ",3)[2]);//current chính là nơi lưu thẻ DOM
        this.testFocusRef.current.focus();
        this.testFocusRef.current.style.background = "#e8f8f5";
        this.forceUpdate();//vì chỉ đổi mấy cái style thì nó đâu có đổi props nên k tự động update
    }//chỉ truy cập đc vào component của chính class này
    // C2: dùng javascript bth->nếu trước khi render component này thì chưa tồn tại sẽ k gọi đc
    newRandomValue1(event) {
        var randomNode = document.getElementById("Random");
        console.log(randomNode.innerText);
        this.forceUpdate();
    }
    //C3: React cx cung cấp hàm truy cập vào component nhưng bị deprecated trong strict mode
    newRandomValue2(event) {
        var randomNode = ReactDOM.findDOMNode(document.getElementById("Random"));
        console.log(randomNode.innerText);
        this.forceUpdate();
    }//dùng thế này thì y hệt cách trên nhưng dài hơn. Điểm lợi của nó là nếu truy cập vào component hiện tại thì 
    //có thể trực tiếp luôn dù component này chưa đc render->nhưng éo truy cập vào con đc, sửa cả component thôi
    newRandomValue3(event) {
        var randomNode = ReactDOM.findDOMNode(this);
        randomNode.style.color = "red";
        console.log(randomNode);
    }//findDOMNode nó chỉ return text DOM node của component-> vẫn sửa và lấy đc giá trị của cả component
    //component khi render lên mới thành cây DOM chứa các node-> cái này kp truy cập vào component mà là DOM
    //C4: giả sử truy cập vào 1 node của 1 component mà lại có sự kiện->dùng luôn bind để lấy node đó
    newRandomValue4(event) {//dùng thế này thì gọi thông qua hàm khác cx đc or dùng arrow
        console.log(event.target.innerText);
        this.forceUpdate();
    }//truy cập vào node phát ra sự kiện thông qua target, k truy cập đc vào các node khác. VD ở đây chỉ vào đc button
    //C5: callback ref. Lợi dụng callback ref mặc định lấy đc cái node của component đó r gán vào 1 biến lưu vĩnh viễn
    //để sử dụng=>cách này bỏ chả có gì cả
    newRandomValue5(event) {
        console.log(this.textRandom);
        this.forceUpdate();
    }

    render() {
        return (
        <div>
            A
            <input type="text" ref={this.testFocusRef}/>
            <button button onClick={event => this.newRandomValue3(event)}>Random</button>
            {/* không cần như này, chỉ cần tên hàm bth cx tự truyền event r */}
            <div ref={this.textURL} id="Random">Random Value: {Math.random()}</div>
        </div>
        );
    }//ref dùng cho hàm tao callback ref or dùng cho ref thẻ đó để lấy dom node thẻ đó xử lý qua current
    //Setup lại kt: Các hàm ta gọi trong constructor phải có this, k có this thì mọi thứ vô dụng vì các hàm cx là 1
    //object và nó coi object đó có phạm vi ở trong constructor, ra khỏi constructor thì biến mất như chưa từng tồn tại
    //Vc gọi this.<hàm> trong constructor và <hàm> ở trong class ngoài constructor là như nhau. Các hàm gọi ngoài
    //constructor là mặc định là 1 method của class truy cập đc qua this. Các hàm ngoài constructor k đc dùng this nx.
    //Nếu component của ta mà bị lỗi ở 1 chỗ nào đó thì nó sẽ k đc render(). VD:ta dùng setTextRandom và newRandomValue5
    //ở trong constructor k có this và gọi nó ở component thì theo quy trình nó render() các node của component thấy
    //2 hàm đó k tồn tại nên hủy hàm luôn và k hiện ra component đó
}//forceUpdate() đơn giản là gọi lại hàm render(). Thật ra hàm render() đc gọi bất cứ khi nào props và state của component
//change để re-render lại cái class đó thì hàm này sẽ thực hiện 1 cách thủ công chứ k chờ sự thay đổi. Trong life-cycle
//của component nó sẽ thực hiện vòng đời khi đổi state bth chỉ bỏ qua hàm shouldComponentUpdate. Các child component của
//component đó đương nhiên cx đc re-render(chưa có ví dụ nào về kế thừa) và vẫn chạy cả shouldComponentUpdate. Hàm này
//kế thừa từ React.Component nên chỉ cần gọi phát là re-render luôn

ReactDOM.render(<Random />, document.getElementById("random1"));