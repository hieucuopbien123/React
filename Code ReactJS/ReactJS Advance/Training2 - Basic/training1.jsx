// (bỏ)
class TestChangeDOM extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
    }
    logOut1(event) {
        console.log(event.target.innerText);
    }
    logOut2 = event => {
        console.log(this.ref.current.innerText);
    }
    logOut3 = () => {
        console.log(document.getElementById("2").innerText);
    }
    logOut4 = () => {
        console.log(ReactDOM.findDOMNode(document.getElementById("2")).innerText);
    }
    render(){
        return (
            <div>
                <div ref={this.ref} id="2">Hello</div>
                <button onClick={event => this.logOut1(event)}>Click to log1</button>
                <button onClick={event => this.logOut2(event)}>Click to log2</button>
                <button onClick={event => this.logOut3(event)}>Click to log3</button>
                <button onClick={event => this.logOut4(event)}>Click to log4</button>
            </div>
        )
    }
}
ReactDOM.render(<TestChangeDOM/>,document.getElementById("1"));

function Item(props){
    return (
        <li>{props.content}</li>
    )
}{/*k sử dụng key đc */}
class KeyList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var Element = this.props.list.map((curVal, index) => 
            <Item key={index} content={curVal.content}/>
        )
        return (
            <ul>
                {Element}
            </ul>
        )
    }
}
var list = [
    {content: "Content 1"},
    {content: "Content 2"}
]
KeyList.defaultProps = {
    list: []
}
ReactDOM.render(<KeyList list={list}/>,document.getElementById("3"));

// # Thao tác với form
class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputName: "",
            inputHuman: true,
            inputSelect: "Cat"
        }
    }
    handleChange = (e) => {
        console.log(this.state.inputHuman);
        this.setState({//dùng arrow r nên this là class này kp lo
            [e.target.name]: (e.target.type == "checkbox") ? e.target.checked : e.target.value
        })
        //có e.preventDefault ở đây là sai
    }
    submit = (e) => {
        alert("Send to server: " + this.state.inputName + " " + this.state.inputHuman + " " + this.state.inputSelect);
        this.setState({
            inputName: "Hello"
        })
        e.preventDefault();
        //preventDefault ngoài k chuyển trang thì cx cản trơ việc render(). Điều này làm cho cập nhập có thể bị sai nếu
        //dùng trong handleChange checkbox phải click 2 lần mới đc. Lần 1 phát signal gặp preventDefault làm nó k render
        //lần 2 ấn thì k chạy handleChange vì nó k đổi nhưng thấy giá trị khác -> tự render lại. Nếu 1 turn nào đó mà
        //thấy giá trị khác giá trị cần có thì sẽ tự render lại. Vòng nào nó cx kiểm tra state, props có đổi gì k và 
        //tự render nếu thấy đổi. preventDefault chỉ cản đc ở turn đó. Nếu turn sau ta làm cho giá trị trở lại như cũ
        //thì có thể k in gì cả => éo đúng
    }
    render(){
        return (
            <div>
                <form action="">
                    <label>
                        Name: 
                        <input type="text" name="inputName" onChange={this.handleChange} 
                        defaultValue={this.state.inputName}></input>
                    </label>
                    <label>
                        Human:  
                        <input type="checkbox" name="inputHuman" onChange={this.handleChange} 
                        defaultChecked={this.state.inputHuman}></input>
                    </label>
                    <label>
                        Select: 
                        <select name="inputSelect" onChange={this.handleChange} defaultValue={this.state.inputSelect}>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                        </select>
                    </label>
                    <button type="submit" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}
ReactDOM.render(<Form list={list}/>,document.getElementById("4"));

// # Basic / Dùng class component
class WithoutThis extends React.Component{
    state = {
        age: 18
    }
    render(){
        return(
            <div>{this.state.age}</div>
        )
    }
}
ReactDOM.render(<WithoutThis />,document.getElementById("5"));

// (bỏ)
class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 1
        }
    }
    handleEventChild = () => {
        this.props.handleEventParent();
        this.setState({
            count: this.state.count + 1
        })
    }
    render(){
        return (
            <div>
                <p>Child: {this.state.count}</p>
                <button onClick={this.handleEventChild}>Click</button>
            </div>
        )
    }
}
class Parent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 1
        }
    }
    handleEventParent = () => {
        this.setState((prevState, props) => {
            return {
                count: prevState.count*2
            }
        })
    }
    render(){
        return (
            <div>
                <p>Parent: {this.state.count}</p>
                <Child handleEventParent={this.handleEventParent}/>
            </div>
        )
    }
}
ReactDOM.render(<Parent />,document.getElementById("6"));

// # Thao tác với thẻ con
class Movie extends React.Component{
    render(){
        return (
            <div style={(this.props.active) ? {color: "red"} : {color: "black"}}>{this.props.children}</div>
        )
    }
}
class Pane extends React.Component{
    render(){
        return (
            <Movie active={this.props.active}>
                <div>
                    <div>Title {this.props.number}</div>
                    <div>Content Movie {this.props.number}</div>
                </div>
            </Movie>
        )
    }
}
class Content extends React.Component{
    render(){
        return (
            <MovieBrowser>
                <Pane number={1}></Pane>
                <Pane number={2}></Pane>
            </MovieBrowser>
        )
        //chú ý 1: thuộc tính css phải gán ở ngay chỗ hiển thị chứ ví dụ gán màu đỏ ở trong Pane thì k hiển thị 
        //chú ý 2: thuộc tính active đã truyền vào Pane bên dưới r vì trong MovieBrowser ta gán cho children mà 
        //nên ở đây k gán nx
    }
}
class MovieBrowser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active: [true, false],
        }
    }
    handleEvent = () => {
        this.setState((prevState, props) => {
            for(var i = 0; i < this.state.active.length; i++)
                if(this.state.active[i])
                    this.state.active[i] = false;
                else
                    this.state.active[i] = true;
        })
        this.forceUpdate();
    }
    render(){
        const children = React.Children.map(this.props.children, (child,index) => {
            if(child.props.number == 1 || child.props.number == 2)//truy cập thẳng vào các thuộc tính của con
                if (React.isValidElement(child)) {
                    return <div>{React.cloneElement(child, { active: this.state.active[index] })}</div>
                }//k đổi đc trực tiếp child mà phải clone
        })
        return(
            <div>
                {children}
                <button onClick={this.handleEvent}>Switch</button>    
            </div>
        )
    }
}
ReactDOM.render(<Content />, document.getElementById("7"));

// # Dùng context
// Dùng contextType => chỉ với class component
var Context = React.createContext({name: "Hieu"})
class ContextChild extends React.Component{
    render() {
        return(
            <div>
                <div>Name: {this.context.name}</div>
                <div>Age: {this.context.age}</div>
            </div>
        )
    }
}
ContextChild.contextType = Context;
class ContextParent extends React.Component{
    render() {
        return (
            <ContextChild />
        )
    }
}
class ContextGrandparent extends React.Component{
    state = {
        name: "Hieu",
        age: 18
    }
    render(){
        return (
            <Context.Provider value={{name: this.state.name, age: this.state.age}}>
                <ContextParent />
            </Context.Provider>
        )
    }
}
ReactDOM.render(<ContextGrandparent />, document.getElementById("8"));

// # Module react router dom / # v5
// # Basic
class ProductFeature extends React.Component {
    render() {
        return <h3>Some Features of Samsung Galaxy S9!</h3>;
    }
}
class ProductImages extends React.Component {
    render() {
        return <h3>Some Images of Samsung Galaxy S9</h3>;
    }
}
class ProductComments extends React.Component {
    render() {
        return <h3>Some Customer Comments</h3>;
    }
}
const { BrowserRouter, HashRouter, NavLink, Link, Route, Switch, Redirect } = ReactRouterDOM;
class RouterClass extends React.Component{
    state = {
        page1: "Hieu"
    }
    render() {
        return (
            <HashRouter>
                <div>
                    <nav>
                        <NavLink exact to="/" activeClassName="home">
                            Home
                        </NavLink>
                        <NavLink to="/page1" activeClassName="page1">
                            Page 1
                        </NavLink>
                        <NavLink to={{
                            pathname: "/page2",
                            search: "&search=true",
                            hash: "#hash",
                            state: {
                                title: "No title"
                            }
                        }} activeClassName="page2">
                            Page 2
                        </NavLink>
                    </nav>
                    <Redirect to="page2"/>
                    <Switch>
                        <Route exact path="/" render={() => {
                            return (
                                <div>This is Home Page</div>
                            )
                        }}/>
                        <Route path="/page1/:id" children={() => {
                            return (
                                <div>This is page1: {this.state.page1}</div>
                                //dùng được props state của class
                            )
                        }}/>
                        <Route path="/page2" render={() => {
                            return(
                                <div>This is page2</div>
                            )
                        }}/>
                    </Switch>
                </div>
            </HashRouter>
        )
        //trap: trong Route phải dùng path, trong NavLink phải dùng to => 2 cái này k đc dùng sai
    }
}
ReactDOM.render(<RouterClass />, document.getElementById("9"))