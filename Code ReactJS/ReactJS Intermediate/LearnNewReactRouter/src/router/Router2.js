// # Module react router dom / ## v6
// # Basic / Bỏ useRouterMatch của v5 thành các hook khác nhau / useNavigate thế useHistory / Thế Switch bằng Routes/
// <Navigate/> thế <Redirect/>

import React from "react";
import {BrowserRouter, Link, Routes, Route, Outlet, useParams, useLocation, useNavigate, Navigate} from "react-router-dom";

const Home = ({test}) => {
    console.log(test); // lấy data trực tiếp vẫn đc
    let location = useLocation(); // tách từ useRouteMatch
    console.log(location);

    let navigate = useNavigate(); // navigate bất cứ đâu, thay thế useHistory của v5
    function handleClick(){
        navigate("/users");
    }
    return(
        <div>
            <div onClick={handleClick}>Home</div>
            {/* Nếu k đi được nó k hiện gì cả, được thì go theo hướng đó. Thế go, goBack, goForward của v5 */}
            <button onClick={() => navigate(-2)}>
                Go 2 pages back
            </button>
            <button onClick={() => navigate(-1)}>Go back</button>
            <button onClick={() => navigate(1)}>
                Go forward
            </button>
            <button onClick={() => navigate(2)}>
                Go 2 pages forward
            </button>
        </div>
    )
}
function About() {
    let params = useParams(); // nó tách useRouteMatch ra các hook khác nhau, useParams chỉ lấy params có khi
    // dùng các :id chẳng hạn
    console.log(params)
    return (
        <div>About</div>
    )
}
function Test(){
    return (
        <div>Test</div>
    )
}
function Users() {
    return (
        <div>
            <nav>
                <Link to="me">My Profile</Link>
                {/* link có thể dùng .. or . để chỉ định hướng đi */}
            </nav>
            <Outlet/>
            {/* Outlet là children of component của component router này */}
        </div>
    );
}
const RouterAll2 = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={true ? <Navigate to={"/home"} replace/> : <Navigate to={"/users"} replace/>}/>
                <Route path="/home" element={(<Home test={true}/>)}/>
                <Route path="users" element={<Users />}>
                    <Route path="me" element={<Test />} />
                    <Route path=":id" element={<About />} />
                </Route>
                {/* v6 chơi nest route */}
            </Routes>
        </BrowserRouter>
    );
}

export default RouterAll2;
// v6 hỗ trợ các router khác dùng state của router cha dễ hơn chứ ta kp truyền với mọi con rất phức tạp
// với hook useNavigate

// Tình huống: ta chỉ muốn default page sẽ rơi vào link: /home cơ. Nhưng nếu người dùng đã đăng nhập thì sẽ tự
// động rơi vào link users thì có thể làm như trên, lồng Navigate vào trong Route
// Mặc định là "/" k làm gì được thì ta chỉ cần redirect từ đó thôi
// Nếu có nhiều hơn 2 component thì có thể render ra 1 component khác và trong component đó gọi check xem vào route nào
// or dùng nest lồng nest kiểu condition đã đăng nhập thì vào, chưa thì navigate sang trang đăng nhập
// Từ khóa replace của Navigate sẽ cho phép lùi lại. Nếu k có replace thì vào 1 link redirect 1 link khác thì sẽ k 
// quay lại đc

// Logic ở trên k hợp lý vì logic đó sẽ kbh đổi vì Route nó k chạy lại logic trong thuộc tính element

// Thực tế, authentication dùng token cần có 1 bên thứ 3 và router nên xử lý tách 1 file riêng or dùng phân quyền
// kiểu trong dự án SE sẽ hay hơn chứ k đơn giản như v.