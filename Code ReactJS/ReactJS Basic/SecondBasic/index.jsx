// # Module react router dom / # v5
// # Lấy match ở component con

const { BrowserRouter , NavLink, Route, Link, HashRouter } = ReactRouterDOM;
const Router = BrowserRouter;

function Child({ match }) { // Route dùng component
    console.log(match.params)
    console.log(match.isExact)
    console.log(match.path)
    console.log(match.url);
    return (
        <div>
            <h3>ID: {match.params.id}</h3>
        </div>
    )
}
//Khi được gọi trong Route thì component sẽ được truyền vào biến match tùy thuộc vào ta có muốn lấy để 
//dùng hay k, và nhớ là tuân thủ kiểu truyền thế kia. Thật ra kp là nó truyền vào 1 biến match đâu, nó truyền vào 1
//object chứa rất nhiều thông tin về thẻ và đường dẫn, ta chỉ dùng như trên kiểu
//destructuring assignment để lấy mỗi biến match ra dùng mà thôi. Ta có thể lấy cả nếu thích.
//Nếu Child là 1 class thì object truyền từ route sẽ tự động gán vào props là cả object và ta truy cập các thuộc tính
//bth vs this.props.match... => éo bh dùng class component

const Home = (props) => (
    <div>
        <h1>Home Component: {props.name}</h1>
    </div>
)

const About = () => (
    <div>
        <h1>About Component</h1>
    </div>
)

class Posts extends React.Component {
    state = {
        posts: [
            {
                id: 1,
                title: "Hello Blog World!"
            },
            {
                id: 2,
                title: "My second post"
            },
            {
                id: 3,
                title: "What is React Router?"
            }
        ]
    }

    render() {
        const { posts } = this.state;
        // or const posts = this.state.posts cx đc nhưng dùng trên trông chuyên nghiệp hơn
        return (
            <div className='posts'>
                <h1>Posts List</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                            {/* or dùng this.props.match.url */}
                        </li>
                    ))}
                </ul>
                <Route path='/posts/:id' component={Child} />
            </div>
        )// Link như 1 component sẽ hiện ra, còn Route có hiện ra hay k phụ thuộc vào link
    }// chỉ cần 1 cái BrowserRouter ở bên ngoài thôi, bên trong k cần nx. 
}
//cơ chế Route có path là /posts/:id thì id có thể là bất cứ giá trị gì ta gán cho nó, thì thẻ child có match sẽ có 
//biến id là số đó
//Cơ chế: ấn vào posts thì thẻ link sẽ chuyển đường path có thêm /posts-> Nó tìm trong các Route bên dưới xem có link
//đó k, thấy có nó sẽ tạo ra 1 component Posts(đặt trong ngoặc {})-> tức tạo ra cả đống bên trên. tức là hiển thị array
//dưới dạng list có key là 3 cái đg link-> Ấn vào link đầu tiên thì nó chuyển đường dẫn url tới link đó, tìm trong 
//Route k có link đó nhưng lại gặp Route có path là /posts/:id thì id thay bằng mọi số đc nên chạy thành /posts/1
//->tạo ra component Child có đối số match.params.id=1 là match props. hiển thị component child ra thế thôi
//Tận dùng cái này làm đối số truyền cho component luôn. VD lấy match.url để lấy mọi đối số truyền vào url

//NN khi chuyển sang link khác ta reload lại trang thì nó mất hết-> Bởi vì các thẻ theo Route nó đc tạo ra vào thời điểm
//ta click vào link đó chứ kp lúc nào cx tồn tại. Khi reload lại trang là lúc ta xóa hết mọi thứ và chạy lại từ đầu
//thì các trang kia có click vào nx đâu mà tạo mới thành ra k tồn tại. Đấy là suy luận của ta khi thấy Browser và Hash
//reload lại nó khác nhau nhưng trong TT dùng browserrouter reload thoải mái ok vì dữ liệu đc lưu sẵn chứ kp ms tạo ra

ReactDOM.render(
    <Router>
        <div>
            <nav>
                <Link to='/' exact>Home</Link>
                <Link to='/about' exact>About</Link>
                <Link to='/posts' exact>Posts</Link>
            </nav>
            <Route path='/' exact component={Home} />
            <Route path='/about' component={About} />
            <Route path='/posts' component={Posts} />
        </div>
    </Router>,
    document.getElementById('app')
)