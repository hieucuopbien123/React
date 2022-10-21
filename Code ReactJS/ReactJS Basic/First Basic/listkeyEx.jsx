// # Dùng list trong React
class Employee extends React.Component {
    render() {
        return (
            <li key={this.props.key}>{/*để dùng thì phải làm thêm key ntn=> éo cần */}
                <div>
                    <b>Full Name:</b> {this.props.fullName}
                </div>
                <div>
                    <b>Gender:</b> {this.props.gender}
                </div>
            </li>
        );
    }
}

class EmployeeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [
                { empId: 1, fullName: "Trump", gender: "Male" },
                { empId: 2, fullName: "Ivanka", gender: "Female" },
                { empId: 3, fullName: "Kushner", gender: "Male" }
            ]
        };
    }

    render() {
        var listItems = this.state.employees.map(e => (
            <Employee key={e.empId} fullName={e.fullName} gender={e.gender} />
        ));
        console.log(listItems)
        return (
            <ul>
                {listItems}
                <ul>
                    { this.state.employees.map(e => (
                        <li key={e.empId}>{/*cách trên phải khai báo key 2 lần nếu muốn sử dụng key bên trong component
                        nhưng nếu dùng TT ntn thì chỉ cần 1 lần */}
                            <div>
                                <b>Full Name:</b> {e.fullName}
                            </div>
                            <div>
                                <b>Gender:</b> {e.gender}
                            </div>
                        </li>
                    )) };
                </ul>
            </ul>
        );//ta có thể tạo 1 cách trực tiếp thế kia, thực chất việc tạo 1 class thì cx chỉ gán các thuộc tính của e
        //vào props và dùng mà thôi. Ta chỉ cần dùng class nếu tái sử dụng nh nơi or có các hàm phức tạp riêng
    }
    //khi thao tác với list thì bắt buộc phải đi với key, bth ta set như trên thì nó sẽ gán vào props các thuộc tính
    //fullName và gender, key, nhưng key nó lại là 1 thuộc tính đặc biệt đc lưu cùng cấp với props chứ k nằm trong
    //props. Ta vẫn gán key ở trong class này vì đây là nơi ta sử dụng list với hàm map.
    //điều đặc biệt là ta có mảng kp từ bên ngoài mà là từ state
    //Nếu từ bên ngoài thì -> truyền vào ở hàm bên dưới thành 1 props-> dùng props state khác gì nhau đâu
}

ReactDOM.render(<EmployeeList />, document.getElementById("listkeyEx"));