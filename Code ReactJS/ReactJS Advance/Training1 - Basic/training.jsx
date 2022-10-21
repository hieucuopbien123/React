// (bỏ)
class Class1 extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }//chú ý phải là this.ref chứ var ref ra khỏi constructor sẽ mất à

    showRandomNum = () => {
        this.forceUpdate();
        var randomVal = this.ref.current.innerText.split(" ")[2];
        console.log(randomVal);
        //lúc này nó vẫn lưu giá trị cũ vì forceUpdate nó ép thực hiện 1 vòng component lifecycle sau khi ra khỏi hàm
        //này cơ=>ra khỏi hàm mới chạy forceUpdate
    }

    render() {
        return(
            <div>
                <div ref={this.ref}>Random Number: {Math.random()}</div>
                <button onClick={this.showRandomNum}>Show random number</button>
            </div>
        )
    }
}
ReactDOM.render(<Class1 />, document.getElementById("first"));


function ChildOfClass2(props) {
    var person = props.person;
    return(
        <li style={{
            color: "blueviolet",
            // "font-size" : "30px"
            fontSize: 30
        }}>
            {person.name}&nbsp;{person.age}
        </li>
    )
    //Dùng style trong jsx phải là 1 object; với key thì dùng html phải cho vào "", dùng đúng 1 số attribute css của jsx 
    //khác so với html 1 chút thì k cần "" và nó thg chỉ bỏ dấu - thành camel key; với value thì có chữ phải có "", chỉ
    //có số thì k cần. Có thể lưu object đó vào biến r gán bth.
}
function Class2(props) {
    var data = props.data;
    var Childcomponents = data.map((person) => (
        <ChildOfClass2 key={person.id} person={person} />
    ))//nếu muốn dùng id trong code logic vẫn phải tạo 1 props khác key, k dùng đc key

    return(//function cx k có hàm render()
        <ul>
            {Childcomponents}
        </ul>
    )
}
var data = [
    { id: 1, name: "Hieu", age: "18" },
    { id: 2, name: "Trang", age: "19"}
]
ReactDOM.render(<Class2 data={data}/>, document.getElementById("second"))


class Class3 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputText: "",
            inputTextArea: "",
            inputSelect: "cat",
            inputCheckBox: true
        }
    }

    handleInputText = (e) => {
        this.setState({
            [e.target.name]: (e.target.type == "checkbox") ? e.target.checked : e.target.value
        })
        console.log("here1")
    }

    handleSubmitEvent = (e) => {
        console.log("here");
        alert("Send " + this.state.inputText + " " + this.state.inputTextArea + " " + 
        this.state.inputSelect + " " + this.state.inputCheckBox);
        e.preventDefault();//vẫn gửi thực hiện gửi dữ liệu qua server nhưng tên url k đổi
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmitEvent}>
                    <input type="text" name="inputText" onChange={this.handleInputText} value={this.state.inputText}/>
                    <br />
                    <textarea cols="30" rows="10" name="inputTextArea" onChange={this.handleInputText}
                    value={this.state.inputTextArea}></textarea>
                    <br />
                    <select id="" name="inputSelect" onChange={this.handleInputText} 
                    value={this.state.inputSelect}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                    <br />
                    <input type="checkbox" name="inputCheckBox" onChange={this.handleInputText} 
                    value={this.state.inputCheckBox}/>
                    <br />
                    <input type="submit" value="submit"/>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<Class3 />, document.getElementById("third"))


var globalListComponent = [];
var content = `Content <${String.fromCharCode(9824)}>`;
for(var i = 0; i < 5; i++){
    globalListComponent.push((1) && ((1) ? <li key={i}>Hello from {content}</li> : null));
}
console.log(globalListComponent);
//html entity là kiểu $#9824; thì chỉ lấy phần số, chứ mấy cái <, > thì viết tay luôn đc mà

class Class5 extends React.Component{
    render() {
        return (
            <div>
                {this.props.data.age} - {this.props.data.job}
            </div>
        )
    }
}
class Class4 extends React.Component{
    constructor(props){
        super(props);
        var {name, ...propsForChild} = this.props;
        this.state = {
            name: name,
            propsForChild: propsForChild
        }
        //biến khai báo ở trong constructor thì chỉ dùng đc trong constructor thôi. Ta muốn truyền vào props của class
        //này thuộc tính cho class này và propsForChild lưu thuộc tính component con của class này luôn. Thế thì để lấy
        //đc ra truyền cho con có 2 cách: 1 là khai báo trong constructor chỉ dùng trong constructor nên ta phải có 1 
        //biến state lưu propsForChild r lát truyền cho con. 2 là chỗ nào cần truyền propsForChild thì khai báo lại hàm
        //name và propsForChild như trên, mỗi lần dùng chỗ khác nhau đều phải khai báo như v. 
        
        //Đấy là TH đặc biệt thôi: biến khai báo ngoài constructor có thể dùng bất cứ đâu với this.<biến> kể cả biến đó
        //ở trong 1 hàm khác bên trong class kp là constructor miễn là hàm đó đã đc chạy qua 1 lần(để biến đc khai báo
        //chứ). Nhưng chỉ đc khai báo bth chứ k đc khai báo kiểu destructuring assignment dẫn đến muốn lấy kiểu đó thì
        //phải dùng trong 1 hàm cụ thể-> Thành ra rơi vào TH trên. constructor như kiểu hàm bị cách ly khai báo hàm hay
        //biến bên trong đều k dùng đc ở ngoài.
        //Còn hàm ở trong class thì thoải mái dùng đc ở bất cứ đâu miễn khai báo ở ngay trong class. Muốn dùng trong 
        //constructor thì bind phát là xong

        //Trong thực tế k ai lại truyền cho cha r cho con r cho cháu như v. Ta sẽ luôn dùng redux để dữ liệu truyền 1
        //phát duy nhất mà thôi
    }
    render(){
        return (
            <div>
                <div>{this.props.name}</div>
                <Class5 data={this.state.propsForChild}/>
            </div>
        )
    }
}
ReactDOM.render(<Class4 name="Hieu" age="19" job="IT" />, document.getElementById("fourth"))

// # Basic / Dùng React code JS thuần
class Class6 extends React.Component{
    render(){//code js mà chả cần {<js>} như jsx đâu
        //chú ý trong đây cx phải dùng chuẩn jsx VD như className,..
        var nameTag = React.createElement("h2", { key: "3", className:"cssForThisTag" }, "Name:" + this.props.name)
        var ageAndJob = React.createElement("ul", { key: "4" }, [
            React.createElement("li", { key: "1" }, this.props.age),
            React.createElement("li", { key: "2" }, this.props.job)
        ]);
        var All = React.createElement("div", { id: "Person" }, [nameTag, ageAndJob]);
        return All;
    }//nên nhớ là dùng createElement nó yêu cầu mỗi element bên trong đều phải có 1 key vì nó coi là 1 list, kể cả kp 
    //thẻ ul, li. Nó buộc dùng class, k đc dùng thẻ style
}
ReactDOM.render(<Class6 name="Hieu" age="19" job="IT" />, document.getElementById("fourth"))

// (bỏ)
class ErrorBoundary extends React.Component{
    constructor(props){
        super();
        this.state = {
            error: "",
            errorInfo: ""
        }
    }
    componentDidCatch(error, errorInfo){
        console.log("Error: ", error.toString());
        console.log("ErrorInfo: ", errorInfo);
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }
    render(){
        if(this.state.errorInfo)
            return(
                <div>
                    <details>
                        <summary>Error: {this.state.error && this.state.error.toString()}</summary>
                        <br />
                        <p>Info: {this.state.errorInfo.componentStack}</p>
                    </details>
                </div>
            )
        else
            return this.props.children;
    }
}
class LifeCycle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: 0,
            error: false
        }
        console.log("constructor");
    }
    static getDerivedStateFromProps(props, prevState){
        console.log("getDerivedStateFromProps");
        return null;
    }
    componentDidMount(){
        console.log("ComponentDidMount");
        this.setState({
            number: this.state.number + 1,
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        console.log("shouleComponentUpdate");
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log("getSnapshotBeforeUpdate");
        return 1;
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log("componentDidUpdate");
        if(this.state.error)
            ReactDOM.unmountComponentAtNode(document.getElementById("fifth"));
    }
    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    handleError = () => {
        console.log("Run");
        this.setState({
            error: true
        })
    }

    render() {
        console.log("render");
        if(this.state.error) 
            throw new Error("Error nè");
        return(
            <div>
                    <div>{this.state.number}</div>
                    <button onClick={this.handleError}>Click là error nhé</button>
            </div>
        )
    }
}
function Wrapper(props){
    return(
        <div>
            <ErrorBoundary>
                <LifeCycle />
            </ErrorBoundary>
        </div>
    )
}
ReactDOM.render(<Wrapper/>, document.getElementById("fifth"));
//Điều đặc biệt là ta cho class LifeCycle throw error thì chính nó sẽ k bắt bởi vì throw thì sẽ k chạy return 
//k gặp boundary nx-> nó sẽ đi dần lên các component cha để tìm 1 cái component error boundary or hàm catch để bắt lỗi
//dẫn đến ta buộc phải dùng 1 class wrapper như này để bắt lỗi

// # Dùng context
var varContext = React.createContext({name: "hieu"});
class Screen extends React.Component{
    render(){
        return (
            <div>
                Number: {this.context.number}
                <varContext.Consumer>
                    {({number})=>{
                        console.log(number);
                    }}
                </varContext.Consumer>
            </div>
        )
    }//thật ra biến nhận vào hàm là cả object context-> ta dùng {number} tức là trùng number thì gán cho biến
}
Screen.contextType = varContext;
class Edit extends React.Component{
    render(){
        return(
            <varContext.Provider value={{number: 100}}>
                <Screen />
            </varContext.Provider>
        )
    }
}
ReactDOM.render(<Edit />, document.getElementById("sixth"));//ReactDOM chứ kp ReactDom

