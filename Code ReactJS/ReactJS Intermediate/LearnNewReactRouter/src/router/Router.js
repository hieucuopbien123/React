// # Module react router dom / ## v6
// # Basic / Thế Switch bằng Routes / Bỏ useRouterMatch của v5 thành các hook khác nhau:LuseSearchParams / Dùng CustomLink

import React from "react";
import { BrowserRouter, Link, Routes, Route, useResolvedPath, useMatch, useSearchParams } from "react-router-dom";

const Home = () => {
    // const match = useRouteMatch(); // v6 k còn
    // console.log(match)
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('product'));
    return(
        <>
            <div>Home</div>
            <button onClick={() => setSearchParams({product: 'laptop'})}>
                Laptop
            </button>
        </>
    )
}
function About() {
    return (
        <div>About</div>
    )
}
function Test(){
    return (
        <div>Test</div>
    )
}

const CustomLink = ({ children, to, ...props }) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    // to truyền vào nó là "me" ở đây thì useResolvedPath sẽ biến nó thành 1 cái biến path
    // useMatch lại dùng nó để xử lý phân tích cái path để từ đó lấy ra search, hash, pathname
    console.log(to);
    console.log(resolved);
    console.log(match);

    return (
        <li className={match ? 'active' : ''}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
};

function Users() {
    // Dùng path trong Route tự hiểu là đi tiếp từ path cha hiện tại nên không cần useRouteMatch để lấy match.url nữa
    // Khi dùng react để có biến match như trên thì phải dùng useRouteMatch nhưng giờ k còn nx ở v6
    // K cần dùng match để lấy id nx mà có thể dẫn tiếp với path=":id" luôn
    // đồng thời ta cx k cần dùng match.url hay path nx mà nó tự hiểu là có sẵn ở dưới path là
    // "/users/" sẵn rồi. Tức nó tự xây path tiếp từ cha
    return (
        <div>
            <nav>
                <CustomLink to="me">My Profile</CustomLink>
            </nav>
            <Routes>
                <Route path=":id" element={<Test />} />
                <Route path="me" element={<About />} />
            </Routes>
        </div>
    );
}

const RouterAll = () => {
    return (
        <BrowserRouter>
        {/* Thay thế Switch bằng Routes có nhiều tính năng hơn:
        VD: Routes sẽ chọn cái Route đúng nhất chứ k check từ trên xuống dưới như Switch thì khi gặp cái hợp lý 
        nó sẽ dừng luôn thì những component phía sau cần render lại k được render */}
            <Routes>
                {/* Route children buộc chuyển thành Route element */}
                <Route path="/" element={<Home />} />
                <Route path="users/*" element={<Users />} />
                {/* K còn Route exact nữa, mặc định là exect và nếu muốn bất kỳ thì phải dùng thêm * */}
            </Routes>
        </BrowserRouter>
    );
}

export default RouterAll;