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

    //Đây là lệnh quyết định có enable "/" hay k, klq j đến component Redirect
    Redirect = () => {
        this.setState({
            isRedirected: !this.state.isRedirected,
        })
    }

    render() {
        return (
        <BrowserRouter>
            <div>
                <ProductShortInfo />
                <button onClick={this.Redirect}> Click to Enable Home</button>
            
                {/* Dùng NavLink */}
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

                {/* Dùng Link */}
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

                {/* Dùng Switch Route */}
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
    }
}

class App extends React.Component {
    render() {
        return <Product />;
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));
