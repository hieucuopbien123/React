// # Module react router dom / # v5
// # Basic

const { HashRouter, NavLink, Route, Link, BrowserRouter, Switch, Redirect } = ReactRouterDOM;

//Đây là cách mà ta phân chia cấu trúc file, có thể để 1 folder routing chứa file chứa component dưới
class App extends React.Component {
    render()  {
        return  (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topics">Topics</Link>
                        </li>
                    </ul>
                    <hr />

                    <div className="main-route-place">
                        <Route exact path="/" component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/topics" component={Topics} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

class Home extends React.Component {
    render()  {
        return (
            <div>
                <h2>Home</h2>
            </div>
        );
    }
}

class About  extends React.Component {
    render() {
        return (
            <div>
                <h2>About</h2>
            </div>
        );
    }
}

class Topics extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li>
                        <Link to={`${this.props.match.url}/rendering`}>Rendering with React</Link>
                        {/* hay vì nó lấy được đường dẫn kiểu này */}
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${this.props.match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>

                <div className="secondary-route-place">
                    <Route path={`${this.props.match.url}/:topicId`} component={Topic} />
                    {/* dù k dùng render nhưng vẫn có thể truyền tham số vào component render ra theo link với dấu :
                    nếu ta muốn có nhiều hơn thì dùng render để truyền thêm đối số như props*/}
                    <Route exact path={this.props.match.url}
                        render={() =>
                            <h3>
                                Please select a topic.
                            </h3>
                        }
                    />
                </div>
            </div>
        );
    }//chú ý thẻ Link có path là link từ cái gốc trở đi -> ta nên dùng tách như bên trên với mỗi cấp độ / 
    //r dùng this.props.match.url để cập nhật đường link như thế là perfect
    //Cái dấu /:<tên> thì tên đại diện cho bất cứ thứ gì. Thứ đó sẽ đc truyền vào object this.props.match.params
    //như 1 attribute với giá trị là link gọi vào cái đó. Khi chuyển sang đường dẫn đó thì nó mới gán giá trị cho
    //tên vào tạo ra 1 component mới mang tên Topic.
    //TK cách dùng Router: bao 1 thẻ BrowerRouter ở ngoài cùng-> bên trong gọi Link đến đâu thì tạo thẻ Route
    //có link đó để hiển thị component nào. Cứ tiếp tục như v nếu như component đó có các con thì bên trong nó
    //lại Link và Route với đường dẫn lấy ở trước là this.props.match.url/ 
    //dùng : vs thẻ Route nhưng khá ít nếu như nó chỉ thay đổi có 1 tí ở component thì dùng chung 1 component với
    //đối số đó là props cho sự thay đổi
}

class Topic extends React.Component {
    render()  {
        return (
            <div>
                <h3>{this.props.match.params.topicId}</h3>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#router"));