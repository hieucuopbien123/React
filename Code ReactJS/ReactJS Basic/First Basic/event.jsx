// # Thao tác với form / Khi gom tất cả onChange vào 1 hàm

class EventForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",
            valueSelect: "javascript",//nên xử lý giá tri ban đầu các thứ cần điền là state
            valueCheck: true,
            valueArea: ""
        }
    }

    handleSubmitEvent = (e) => {
        alert("Send to server: " + this.state.value+" and " + this.state.valueCheck + " and " + this.state.valueArea)
        //mẹ nó suốt ngày lỗi. Dấu + nó là + string tức chuyển sang string và thực hiện concat VD: ""+<số> tức là
        //chuyển số sang string. Dấu , là truyền separate args nó tự có dấu cách giữa các arg và hiển thị
        //Tuy nhiên mấy cái đấy lỗi ảo vãi chưởng mò mãi k ra. Tốt nhất dùng phiên bản mới như dưới
        e.preventDefault();
    }

    // handleChangeTextEvent = (e) => {
    //     this.setState({
    //         value: e.target.value
    //     })
    // }
    // handleChangeCheckEvent = (e) => {
    //     this.setState({
    //         valueCheck: e.target.checked
    //     })
    // }
    //gom 2 hàm này vào 1 hàm xem. 
    //e là cả class event(1 object) còn e.target là cái thẻ thôi,ta gọi target nếu muôn lấy các content trong thẻ
    handleChange = (e) => {
        console.log(e);
        console.log(e.target)
        var type = e.target.type;
        this.setState({
            //nếu type là checkbox thì gán valueCheck, type là text thì gán value. C1: ta dùng điều kiện if else
            //bên ngoài để gọi 2 hàm khác nhau. C2: là đổi TT bằng cách khiến key là biến
            [e.target.name]: (type == "check") ? e.target.checked : e.target.value
        })
    }//làm gộp rối vl nhưng đẳng cấp. Đặt name của thẻ trùng với tên state var của components
    // có mỗi type check box là checked thôi còn các cái còn lại thì đều là value. Nếu có cái biến khác nx thì phải
    //chia TH từ từ ra

    handleSubmitSelect = (e) => {
        alert(`Send to server: ${this.state.valueSelect}`);
        e.preventDefault();
    }

    handleChangeSelect = (e) => {
        this.setState({
            valueSelect: e.target.value
            //các trường còn lại của state k nói tức là nó giữ nguyên
        })
    }

    render(){
        return(
            <div>
                <form action="" onSubmit={this.handleSubmitEvent}>
                    <label>
                        Name:
                        <input type="text" onChange={this.handleChange} value={this.state.value} name="value" />
                    </label>
                    <label>
                        Test nhiều loại input khác nhau:
                        <input type="checkbox" checked={this.state.valueCheck} onChange={this.handleChange}
                        name="valueCheck" />
                    </label>
                    <label>
                        <textarea name="valueArea" cols="30" rows="10" value={this.state.valueArea} required
                        onChange={this.handleChange}></textarea>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <form action="" onSubmit={this.handleSubmitSelect}>
                    <label>
                        Chọn khóa học: 
                        <select value={this.state.valueSelect} onChange={this.handleChangeSelect}>
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JAVASCRIPT</option>
                            <option value="react.js">REACT.JS</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )//sự kiện onChange ở thẻ select, tương tự dùng với cac thẻ khác đc như textarea
    }//éo phải lúc nào cx bao div bên ngoài, cứ có 1 thẻ bất kỳ bao ngoài là đc
}
ReactDOM.render( <EventForm />, document.getElementById('event') )