// (bỏ)
//Có 1 button và 1 dòng chữ-> ấn button thì chữ đổi liên tục login, logout. Màu chữ trên và text trên button cx khác
//Cơ chế: ta có thể tạo 4 component hoặc tạo 2 component thậm chí là 1 component 2 thành phần xong chỉ cần đổi text
//thêm hàm,.. mấy bài trc gom nh r, lần này ta sẽ bung hết ra: 4 component cho 4 thứ 1 comp gom 2 text, 1 comp
//gom tất cả
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
    };

    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    };

    handleLogoutClick = () => {
        this.setState({isLoggedIn: false});
    };

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button; /* Khai báo biến button sử dụng cho if */
        //có thể khai báo biến r gán lưu component thao tác logic như bth, lấy ra trong code với {}
        //button là biến của hàm này nên dùng đc mọi chỗ trong hàm render() này

        if (isLoggedIn) 
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        else
            button = <LoginButton onClick={this.handleLoginClick} />;

        //or dùng câu điều kiện trong code jsx với && or ?:
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
                {isLoggedIn ? 
                    ( <LogoutButton onClick={this.handleLogoutClick} />) : 
                    ( <LoginButton onClick={this.handleLoginClick} /> )}
                <div>{isLoggedIn ? 'isLoggedIn is true' : 'isLoggedIn isFalse'}</div>
            </div>
        );//onClick ở đây kp là event mà là 1 att của props truyền vào. Kp component nào cx là có sự kiện onClick đâu
        //ở đây k có nên k bị trùng
        //or k dùng biến 
        {/* {
                if(isLoggedIn == true)
                {
                    return ( <LogoutButton onClick={this.handleLogoutClick} />)
                }
                else{ 
                    return ( <LoginButton onClick={this.handleLoginClick} /> )
                }
            } */}
    };
};

const UserGreeting = (props) => {
    return <h2>Welcome back!</h2>;
};

const GuestGreeting = (props) => {
    return <h2>Please sign up.</h2>;
};

const Greeting = (props) => {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
};

const LoginButton = (props) => {
    return (
        <button onClick={props.onClick}>Login</button>
    );
};

const LogoutButton = (props) => {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
};

ReactDOM.render( <LoginControl />, document.getElementById('login') );