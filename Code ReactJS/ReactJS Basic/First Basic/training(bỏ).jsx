// (bỏ)
class OrderDetail extends React.Component{
    render(){
        //các thẻ trong component jsx dùng đc các thuộc tính css, miễn các thuộc tính đó đã có rồi, dùng bằng
        //clasName. Khi render()-> nó dịch sang html thì lại quay về class thì cx là set thuộc tính như bth còn j
        return (
            <div className="orderDetail">
                <div>{this.props.name}</div>
                <div>Price: {this.props.price}</div>
                <div>Quantity: {this.props.quantity}</div>
                <button onClick={this.props.handleClick}>+</button>
            </div>
        )
    }
}

class Order extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: [ 0, 0, 0],
            total: 0,
        }
    }

    // handleClick = (index) => {
    //     this.setState((prevState,props) => {
    //         if(index == 0)
    //             return{
    //                 quantity: [prevState.quantity[0] + 1, prevState.quantity[1], prevState.quantity[2]],
    //                 total: prevState.total + props.data[0].price
    //             }
    //         else if(index == 1)
    //             return{
    //                 quantity: [prevState.quantity[0], prevState.quantity[1] + 1, prevState.quantity[2]],
    //                 total: prevState.total + props.data[1].price
    //             }
    //         else if(index == 2)
    //             return{
    //                 quantity: [prevState.quantity[0], prevState.quantity[1], prevState.quantity[2] + 1],
    //                 total: prevState.total + props.data[2].price
    //             }
    //     })
    // }
    //nên nhớ là hàm setState khi dùng dạng hàm số thì ta có thể đổi trực tiếp state bằng cách gán or return đều
    //đc. Ta có thể gán 1 phát luôn thì đổi ngay lúc đó
    handleClick = (index) => {
        this.setState((prevState, props) => {
            this.state.quantity[index] = prevState.quantity[index] + 1;
            console.log(this.state.quantity[index], prevState.quantity[index])
            this.state.total = prevState.total + props.data[index].price;
            //Gán xong phát là prevState lại thành this.state ngay tại thời điểm này nhé
            //nhưng kỳ lạ là khi dùng TT thì nó éo cập nhật trên màn hình-> đúng v nó đỏi nhưng k cập nhật vì
            //hàm setState chỉ thực hiện render lại khi return tức return là hàm báo hiệu state đổi và render lại
            //Do đó ta có thể forceUpdate hoặc return như dưới đều ok
            // return{
            //     quantity: this.state.quantity,
            //     total: this.state.total
            // }
            this.forceUpdate();
        })//éo cần return state mà đổi tt được như này, hữu dụng khi có tính toán phức tạp=>điểm mới là phần này
    }

    render(){
        var OrderDetails = this.props.data.map((phone, index) => (
            // <OrderDetail handleClick={() => this.handleClick(index)} name={phone.name} price={phone.price} 
            // key={index} quantity={this.state.quantity[index]}/>
            <OrderDetail handleClick={this.handleClick.bind(this, index)} name={phone.name} price={phone.price} 
            key={index} quantity={this.state.quantity[index]}/>//dùng bên trên cx đc, arrow func đầu có sai this
        ))
        //trap nửa tiêng mới tìm ra dùng map () => () lịt pẹ nó éo phải function, cả ô setState với TH object nx
        console.log(OrderDetails);
        return (
            <div className="order">
                {OrderDetails}
                <div class="total">Total: {this.state.total}</div>
            </div>
        )
    }//điều đặc biệt là thay đổi quantity ở cha con cx đc cập nhập vì nó gọi lại vào hàm này, xong lại tiếp tục
    //gán quantity cha cho con như ở trên, do đó cha đổi con đổi
}

var data = [
    { name: "IPhoneX", price: 900},
    { name: "Samsung S9", price: 800},
    { name: "Samsung S9", price: 800}
]//ta có thể nhét cả mảng này vào thành state của class sẽ ez hơn

ReactDOM.render(<Order data={data}/>, document.getElementById("training") )
//props gọi là read-only data k thể sửa nhé