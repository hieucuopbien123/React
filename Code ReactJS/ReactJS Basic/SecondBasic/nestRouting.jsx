// # Module react router dom / # v5
// # Basic

const { HashRouter, NavLink, Route, Link, BrowserRouter, Switch, Redirect } = ReactRouterDOM;

class ProductShortInfo extends React.Component {
    render() {
        return (
            <div className="product">
                <h3>Samsung Galaxy S9</h3>
                <p>Price: $900</p>
            </div>
        );
    }
}

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

class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRedirected: false
        }
    }

    Redirect = () => {
        this.setState({
            isRedirected: true,
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.state.isRedirected)
            this.setState({
                isRedirected: false,
            })
    }
    //Component Redirect là component chuyển trang, nhưng nó là 1 component trống k đi kèm hiển thị với cái gì cả, 
    //Ví dụ mấy cái kia phải click link hay gì đó thì mới chuyển trang, bh ta làm kiểu chờ 5s sẽ tự động chuyển trang
    //thì sao, rõ ràng là cần có 1 Component như Redirect sao cho cứ render đến component đó sẽ tự động hiện link 
    //component sang TT mong muôn
    //Ví dụ ở dưới ta gọi Redirect tức là khi render đến chỗ đó nó sẽ redirect đến images tức images là TT mặc định
    //của trang. Khi ta ấn link thì nó load lại cái Route(k render lai object này), nếu có vc gì ở đây làm component
    //này render lại thì nó sẽ lại gặp redirect lại chuyển về trang images mặc định nhưng ta chưa ứng dụng đc nó bh.
    
    //Redirect chỉ đc dùng trong render return. Nó có 1 tc đb nx là giúp chuyển trang đến 1 đường link khi hàm return
    //chạy đến nó
    //=> Nó còn 1 ứng dụng nx là đổi TT của component có điều kiện. Ví dụ thẻ Link cho ta ấn 1 chữ thì chuyển trang
    //nhưng ta muốn chuyển tùy ý thì chỉ cần đặt điều kiện, nếu điều kiện thỏa mãn thì thực hiện redirect.
    //VD bên dưới ta làm như v ấn nút thì isRedirected = true và redirect sẽ buộc chuyển trang ngay.
    //Do ta muốn cứ ấn là chuyển nên dùng componentDidUpdate để set lại là false. Khi là false nó k chuyển sang trang
    //null bởi vì ta k dùng redirect ở null. Tuy nhiên logic này quá dài dòng nên nó chỉ dùng kiểu 1 lần làm j thì
    //chuyển trang ngay lập tức or mặc định là trang nào

    render() {
        return (
        <HashRouter>
            <div>
                <ProductShortInfo />
                <button onClick={this.Redirect}> Click to Enable Home</button>
                {/* làm button ấn thì chuyển sang trang home */}

                <nav className="product-nav">
                    <Link to='/'>Home</Link>
                    <Link to='/images'>Images</Link>
                    <Link to={{
                        pathname: "/comments",
                        search: "?sort=name",
                        hash: "#the-hash",
                        state: { fromDashboard: true,
                                title: "this is a title" }
                    }}>Comments</Link>
                    <Redirect to="/images"/>
                </nav>
                <div className="route-place">
                    <Route exact path="/images" component={() => {
                        return (
                            <ProductImages />
                        )
                    }} />
                    {/* dùng render or children lợi hơn vì truyền đc vào props của component hay thực hiện
                    chuyển trang đều đc */}
                    <Route exact render={ () => {
                        console.log(typeof ProductFeature)
                        //cơ chế: ấn nút-> redirect là true-> đổi state-> render lại-> chạy vào hàm dưới-> redirect HOME
                        return (
                            this.state.isRedirected ? (<Redirect to="/" />) : null
                        )
                    }} />
                    <Route exact path="/" component={ProductFeature} />
                    <Route exact path="/comments" component={ProductComments} />
                </div>
            </div>
        </HashRouter>
        );
    }//đối số của component và render bắt buộc là định nghĩa 1 hàm số trả về component đó
    //bản thân tên component cx là tên 1 hàm số trả về giá trị component đó nên truyền đc như v
    //kể cả class hay function thì <tên component> đều có typeof là hàm số

    //Ở Vd này có 2 ứng dụng: 1 là redirect làm trang mặc định hiện ra của web
    //2 là bên cạnh việc ấn link thì chuyển trang thì ở đây ta ấn nút bất kỳ thì chuyển trang. Như v ta có thể tùy biến
    //Vd ấn nút đồng hồ chạy, chạy xong thì gán isRedirected = true-> cx tự redirect tới trang mong muốn-> tùy biến
}

class App extends React.Component {
    render() {
        return <Product />;
    }
}
ReactDOM.render(<App />, document.querySelector("#app1"));