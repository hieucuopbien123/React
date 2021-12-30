const { HashRouter, NavLink, Route, Link, BrowserRouter, Switch, Redirect } = ReactRouterDOM;
//Ở cách dùng cdn thì phải dùng ReactRouterDOM.HashRouter nên làm như này để rút ngắn cx đc
//dùng cái gì import cái đó, cdn thì ReactRouterDOM dùng như biến, còn bth thì như bên trên

//Trước kia phải set window.history thủ công, nhưng bh dùng Router ez

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
            isRedirected: !this.state.isRedirected,
        })
    }
    //Đây là lệnh quyết định có enable "/" hay k, klq j đến component Redirect

    render() {
        return (
            // HashRouter và BrowserRouter chỉ đc chứa 1 thẻ ở giữa
        <BrowserRouter>
            <div>
                <ProductShortInfo />
                <button onClick={this.Redirect}> Click to Enable Home</button>
            
                {/* <div className="product-nav">
                    <ReactRouterDOM.NavLink exact to="/" activeClassName="selected">
                        Feature
                    </ReactRouterDOM.NavLink>
            
                    <ReactRouterDOM.NavLink exact to="/images" activeClassName="selected">
                        Images
                    </ReactRouterDOM.NavLink>
            
                    <ReactRouterDOM.NavLink to="/comments" activeClassName="selected">
                        Comments
                    </ReactRouterDOM.NavLink>
                </div> */}
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
                </nav>
                {/* thẻ link có to hoặc là truyền path, hoặc là truyền 1 object có pathname và các thứ đi kèm 
                như search, hash, state đi kèm vào url liên tiếp nhau */}
                {/* Switch có sẵn giúp kiểm tra từ trên xuống path nào trùng thì render cái đó vì nó đảm bảo chỉ 1 thành
                phần bên trong Switch đc lấy. K cần div để gom nx nhưng ta vẫn dùng nó vì muốn class style nó */}
                <div className="route-place">
                    <Switch >
                        <Route exact path="/images" component={ProductImages} />
                        {this.state.isRedirected && <Route exact path="/" component={ProductFeature}/>}
                        <Route exact path="/comments">
                            <ProductComments/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
        );
//<Route> xđ component nào hiện ra ứng vs path nào, path là đường dẫn thêm vào url khi chọn component đc specific ở
//phần component. truyền thẳng tên component thông qua {}.
//2 tp <ReactRouterDOM.NavLink> và <ReactRouterDOM.Link> giống nhau nhưng <ReactRouterDOM.NavLink> tốt hơn vì
//vì hỗ trợ thuộc tính activeClassName là kiểu style cho thẻ này. Thẻ này như 1 link, to là url tới đâu, url này 
//cấu tạo bởi đường link, tên search, hash #, state. ta dùng nó y như trong thẻ route để dẫn tới đúng các thẻ đó
//các thứ trong thẻ route chỉ hiện ra khi link của ta tới đúng thứ trong path, nên ta set 1 cái mặc định hiện là /
    }
}
//Người dùng tưởng là đang chuyển qua nhiều trang nhưng thực chất vẫn ở trang đó nhưng các component cập nhập theo 
//dường dẫn khác nhau mà thôi

class App extends React.Component {
    render() {
        return <Product />;
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));

/* React Router cung hai tp chính là <BrowserRouter> và <HashRouter>.
<BrowserRouter> phổ biến hơn, nó sử dụng History API trong HTML5 để theo dõi lịch sử bộ định tuyến, còn <HashRouter>
sử dụng hash của URL(window.location.hash) để ghi nhớ mọi thứ, nó thg dùng cho các trình duyệt cũ or sử dụng Router 
ở phía client như file này chẳng hạn. Hai kiểu này còn khác nhau về kiểu url mà nó tạo ra khi bắt dầu gọi vào thành 
phần bên trong. Với brower thì nó tạo / như bth còn hash thì là #/
 */
// có sự khác biệt rất lớn là BrowserRouter nó cho thấy trang Route path k tồn tại khi ta vào trang đó bằng cách
//gõ url trực tiếp nhưng HashRouter có tồn tại bất cứ lúc nào. Cho nên BrowerRouter nó chỉ cho phép refer đến 1 trang
//con khi đi từ trang cha theo đúng nguyên tắc-> refresh lại trang là thấy k còn nx => chưa biết thực tế ta mà dùng với
//hosting se như nào