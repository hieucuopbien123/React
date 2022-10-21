// # Basic

//Tạo 1 sự kiện con gọi hàm của cha cơ bản-> kp kế thừa mà là làm kiểu module, chia component lớn thành nhiều con
//Ấn 1 nút ở con thì dòng chữ counter ở cả cha và con đều tăng lên với điều kiện con bắt đầu từ số 2 và nhân đôi
//còn cha bắt đầu từ 1 cộng dần lên
class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 2,
        }
    }

    //props còn có công dụng truyền đc từ chỗ khác vào, ứng dụng cho vc tái sử dụng 
    handleClickChild = () => {
        this.props.handleClickChildFromParent();
        this.setState((prevState, props) => {
            return {
                count: prevState.count*2
            }
        })//khi dùng hàm thì buộc là prevState và props chứ k đc this.state nx.Muốn this thỉ {object luôn}
    }

    render(){
        return (
            <div>
                <p>Count Child: {this.state.count}</p>
                <button onClick={this.handleClickChild}>Click me!</button>
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
    }//nên nhớ setState({ }) or setState((prevState,props) => {return {}} ) dạng nào cx đc

    handleClickParent = () => {
        console.log(this);
        this.setState({
            count: this.state.count + 1
        })
    }

    render(){
        return (
            <div>
                <p>Counter Parent: {this.state.count}</p>
                <Child handleClickChildFromParent={this.handleClickParent}/>
            </div>
        )
    }//truyền hàm từ cha vào con k cần bind this thì nó vẫn là hàm của cha, this của cha
}

ReactDOM.render( <Parent />, document.getElementById("parentChildEvent"))