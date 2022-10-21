// (bỏ)
class ClassIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[
                { name: "Bùi Thị Bưởi", age: 25.5 },
                { name: "Quang Tèo", age: 29 }
            ],
            job: "Developer",
        };
        //set TT bđ-> thay thế ht cho hàm getInitialState() ở phiên bản cũ với React.createClass và createReactClass
    };

    changeName = () => {
        this.setState({//hàm đổi state
            users:[
                { name: "Bùi Văn Tý", age: 27 },
                { name: "Quang Tèo", age: 29 }
            ],
            job: "Phu ho",
        })
    };

    render() {
        return (
            <div>
                <h2>{this.state.users[0].name}</h2>
                <p>Tuổi: {this.state.users[0].age}</p>
                <p>Job: {this.state.job}</p>
                <button type="button" onClick={this.changeName}>Change name</button>
            </div>
        );
    };//chú ý cú pháp khác html nó truyền tên hàm chứ éo có ()
};
//hàm super(props) gọi constructor của React.Component, gọi xong mới dùng this đc. Bên dưới k gọi k dùng đc this
//this.state phải là 1 object. Dùng state khởi tạo vì nhiều lúc các component cần xử lý dữ liệu của dữ liệu riêng nó
//Tùy TH mà ta có dùng constructor hay k, k dùng thì thôi như dưới cx ok. State nó kp là thứ set TT ban đầu mà là thứ
//lưu TT ở 1 thời điểm, ta kiểm soát bằng cách tạo các hàm thay đổi nó chứ mặc định thì có .defaultProps={<object>}
//state và props là 1 thuộc tính có sẵn trong class của React-> dùng state thì thôi k dùng props nx, 2 cái chỉ khác nhau
//ở chỗ state đổi giá trị ở trong bản thân class đó đc nhưng props thì giá trị là k đổi đc trong class
//khi dùng class, muốn dùng props phải có constructor
ReactDOM.render(
    <ClassIndex />,
    document.getElementById("index")
)

class ClassIndex2 extends React.Component {
    state = {
        name: "Bùi Văn Tèo",
        age: 25
    };
    handleClick() {
        console.log(this); // null
    }
    render() {
        return (
        <div>
            <h2>{this.state.name}</h2>
            <p>Tuổi: {this.state.age}</p>
        </div>
        );
    };
};
ReactDOM.render(
    <ClassIndex2 />,
    document.getElementById("newSyntax")
)

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Please Click me!",
            clickCount: 0,
            searchText: "",
            searchCount: 0,
        };
        this.changeSearchText2 = this.changeSearchText2.bind(this);
        //sang phiên bản ES6 thì class của react các hàm sẽ k còn tự động bind this nx(trừ arrow function) nên ta phải
        //chủ động bind nó, ví dụ bind luôn ở constructor để dùng this là class trong hàm bth or arrow hết thì khỏi lo, cái
        //này chỉ giúp dùng hàm ngoài trong hàm khởi tạo thôi
        //Chú ý ta đặt tên biến mới trùng vói tên hàm changeSearchText2
    }
    updateCount() {
        this.setState((prevState, props) => {
            return {
                clickCount: prevState.clickCount + parseInt(props.step),
                text: "Clicked"
            };
        });
    }
    // setState(<function nhận 2 đối số là trạng thái hiện tại, và props là property của class này và nó return luôn
    //các thuộc tính của state sau khi chuyển đổi>)(<object state về sau>). Vẫn dùng đc props bên trong
    //dùng cách này nếu muốn dùng tham số là state hiện tại và thuộc tính fix có sẵn props
    changeSearchText(event){//this trong hàm này là window
        var v = event.target.value;
        //.target là element gây ra cái event. Gọi hàm này trong event của javascript sẽ tự động truyền vào event
        this.setState((prevState, props) => {
            return {
                searchText: v,
                searchCount: ++prevState.searchCount
            }
            //dùng prevState.searchCount++ là sai vì nó lưu trước r mới cộng cái prev thì cái hiện tại có đc cộng đâu
            //đổi giá trị của prevState k có ý nghĩa gì khi ra khỏi hàm hết-> qtr là set đc cái state mới
        })
    }
    changeSearchText2(event){
        var v = event.target.value;
        this.setState((prevState, props) => {
            return {
                searchText: v,
                searchCount: ++prevState.searchCount
            }
        })
    }
    render() {
        return (
        <div>
            <button onClick={ () => this.updateCount() }>
                {this.state.text} : {this.state.clickCount}
            </button>
            <br />
            <input type="text" value={this.state.searchText} onChange={this.changeSearchText.bind(this)}/>
            <input type="text" value={this.state.searchText} onChange={this.changeSearchText2}
                placeholder="test bind this in constructor"/>
            <div>Search Text: {this.state.searchText}</div>
            <div>Search Count: {this.state.searchCount}</div>
        </div>
        );//có thể tùy ý truy cậpkhi vào thuộc tinh và hàm của class thông qua {this.<>}-> kết hợp của xml và JS
        //JS: .bind this chính là sửa this, event is deprecated r nên k truyền event, nếu muốn dùng arrow/mặc định
        //hàm render() sẽ trả về 1 component, code trong đó là động. VD: ta cho in ra this.state.searchText thì
        //khi searchText thay đổi nó sẽ tự in giá trị đã thay đổi ra chứ kp set này nọ thêm nx, khi state đổi
    }
    //thật ra onClick={<function bth>} thì cái function đó ta phải viết như bth trừ  nó dùng arrow function gán
    //vào 1 biến thì trong react ta có thể chỉ cho mỗi tên biến function như ví dụ trên
}
Button.defaultProps = {
    step: 2,
}
ReactDOM.render(<Button step='3' />, document.getElementById("button1"));
//quanh quẩn: set state, hàm đổi state, tạo element lấy sự kiện, dùng props với state