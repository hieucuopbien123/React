// # Dùng context / Giải quyết vấn đề về rerender

// const = React.createContext({
//     nickname: "",
//     username: "",
//     movies: []
// })
// function Header() {
//     const {nickname, setNickname} = React.useContext(Context1);
//     console.log("Header");
//     return(
//         <div>
//             {nickname}
//             <button onClick={() => setNickname("Hello")}>Test</button>
//         </div>
//     )
// }
// function Movies() {
//     const { movies } = React.useContext(Context1);
//     console.log("Movies");
//     return(
//         <ul ref={console.log("Movies")}>
//             {movies.map(item => (
//                 <li>{item}</li>
//             ))}
//         </ul>
//     )
// }
// function A1() {
//     const [nickname, setNickname] = React.useState("Hieu");
//     const [movies] = React.useState([
//         "Phim 1",
//         "Phim 2"
//     ])
//     const [time, setTime] = React.useState(1);
//     const value = { nickname, setNickname, movies };
//     // const value = React.useMemo(() => {
//     //     console.log("Akj");
//     //     return {nickname, setNickname, movies }
//     // },[nickname, movies]);
//     console.log("render A1");
//     return(
//         <div>
//             <Context1.Provider value={value}>
//                 <Header/>
//                 <Movies/>
//             </Context1.Provider>
//             <button onClick={() => setTime(time + 1)}>Test1</button>
//         </div>
//     )
// }
// ReactDOM.render(<A1/>, document.getElementById("0"));

// Chú ý default value k có setNickname nhưng dùng useContext vẫn lấy được nickname
// Ở bên trên ta ấn Test1 và tăng lên 1 đơn vị thì A1 sẽ render lại dẫn đến Header và Movies render lại giảm performance
// biến value cũng được tạo lại liên tục. Dù ta dùng useMemo làm cho biến value không còn được tạo lại liên tục nhưng 
// A1 vẫn render lại kéo theo header và movies cũng v.
// Ta fix bằng cách: hoặc là dùng useMemo cho components Header và Movies ở trong A1, hoặc là dùng memo ở trong từng
// Header và Movies thì bên trong memo đó dùng useContext thì nó chỉ vị render lại khi context truyền vào có giá trị
// thay đổi mà rõ ràng value dùng useMemo k đổi khi + time nên k render lại
// const Context1 = React.createContext({
//     nickname: "",
//     username: "",
//     movies: []
// })
// const Header = React.memo(() => {
//     const {nickname, setNickname} = React.useContext(Context1);
//     console.log("Header");
//     return(
//         <div>
//             {nickname}
//             <button onClick={() => setNickname("Hello")}>Test</button>
//         </div>
//     )
// })
// const Movies = React.memo(() => {
//     const { movies } = React.useContext(Context1);
//     console.log("Movies");
//     return(
//         <ul>
//             {movies.map(item => (
//                 <li>{item}</li>
//             ))}
//         </ul>
//     )
// })
// function A1() {
//     const [nickname, setNickname] = React.useState("Hieu");
//     const [movies] = React.useState([
//         "Phim 1",
//         "Phim 2"
//     ])
//     const [time, setTime] = React.useState(1);
//     const value = React.useMemo(() => {
//         console.log("Akj");
//         return {nickname, setNickname, movies }
//     },[nickname, movies]);
//     console.log("render A1");
//     return(
//         <div>
//             <Context1.Provider value={value}>
//                 <Header/>
//                 <Movies/>
//             </Context1.Provider>
//             <button onClick={() => setTime(time + 1)}>Test1</button>
//         </div>
//     )
// }
// ReactDOM.render(<A1/>, document.getElementById("0"));

//Vẫn mắc lỗi là nickname đổi thì movies cũng render lại trong khi ta chỉ muốn movies render lại khi movie đổi thôi
//Ta có thể chia ra làm nhiều context khác nhau sẽ fix được điều này => occho dùng useMemo là xong hết vì 
//chọn được là render lại khi từng thành phần nào đổi
const Context1 = React.createContext({
    nickname: ""
})
const Context2 = React.createContext({
    movies: []
})
const Header = React.memo(() => {
    const {nickname, setNickname} = React.useContext(Context1);
    console.log("Header");
    return(
        <div>
            {nickname}
            <button onClick={() => setNickname("Hello")}>Test</button>
        </div>
    )
})
const Movies = React.memo(() => {
    const movies = React.useContext(Context2);
    console.log("Movies");
    return(
        <ul>
            {movies.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    )
})
function A1() {
    const [nickname, setNickname] = React.useState("Hieu");
    const [movies] = React.useState([
        "Phim 1",
        "Phim 2"
    ])
    const [time, setTime] = React.useState(1);
    const value = React.useMemo(() => {
        return {nickname, setNickname }
    },[nickname]);
    console.log("render A1");
    return(
        <div>
            <Context1.Provider value={value}>
                <Header/>
            </Context1.Provider>
            <Context2.Provider value={movies}>
                <Movies/>
            </Context2.Provider>
            <button onClick={() => setTime(time + 1)}>Test1</button>
        </div>
    )
}
ReactDOM.render(<A1/>, document.getElementById("0"));
//Ở TH này ta k cần phải useMemo nx vì movies là state của components sẽ k bị khởi tạo lại sau mỗi lần đổi các cái khác
//nên tự nó k render lại Movies nếu k đổi movies

//kinh nghiệm: nếu có biến ở trong function-> hãy dùng useMemo cho nó => chỉ khi cần deep compare
//nếu có hàm trong function -> dùng useCallback cho nó => chỉ khi tính phức tạp
//Nếu các components con bên trong bị render lại-> memo or useMemo cho nó => chỉ khi component lớn 