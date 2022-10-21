// # Module react router dom / ## v6
// # Custom hook
// # Dùng lib history

import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomRouter from "./CustomRouter.js";
import history from "./history.js";

// Tạo listen cho url khi bị thay đổi ở v6 phức tạp
const Home = () => {
    const navigate = useNavigate();
    return(
        <div>
            <div>Home Page</div>
            <button onClick={() => navigate("/user")}>Click</button>
        </div>
    )
}
const User = () => {
    return(
        <div>User Page</div>
    )
}

const RouterAll4 = () => {
    useEffect(() => {
        const unlisten = history.listen((location, action) => { // listen ở đây thừa
            console.log("Catch url changing");
            console.log(location, action);
        });
        return unlisten;
    },[]);
    return (
        <CustomRouter history={history}>
            <Routes>
                <Route path={"/user"} element={<User/>} />
                <Route path={"/"} element={<Home/>} />
            </Routes>
        </CustomRouter>
    )
}
export default RouterAll4;
//Cơ chế: createBrowserHistory là hàm của package history trả ra object chứa các hàm như listen, delete, set, get 
//giống như history của V5 ta dùng nó để tạo ra 1 loại Router khác có chức năng listen từ cái history đó
//Dùng history ở trong component chính này cho listen và truyền nó vào biến Router tự custom để biến router thao tác
//được với history luôn.
//Trong đó ta dùng component Router(là component dùng để tạo ra BrowserRouter và HashRouter tùy vào vc ta thêm các
//props cho nó như nào). Đơn giản là truyền vào navigator={history} để thực hiện navigate mỗi khi history xử lý gì
//và lắng nghe nếu có sự thay đổi thì update state là action và location mới cho Router
//Nên nhớ history thay đổi thì thực hiện lắng nghe để set 1 cái location và action mới cho state
//Khi người dùng đổi url -> history bắt và update action và location mới -> Router nhận được action và location mới
//thực hiện update -> update xong thì nó tìm các Route nào bên trong thỏa mãn location và action đó thì lấy -> 
//đồng thời history.listen trong component chính bên trên cũng gọi và xử lý 

// Dùng chưa hay, nên tách 1 hook riêng bên trong cho history listen và nhớ có unlisten, sau đó hook cung data ra
// ngoài để lấy và bên trong hook xử lý khi url đổi thì hàm listen update các data đó như nào.