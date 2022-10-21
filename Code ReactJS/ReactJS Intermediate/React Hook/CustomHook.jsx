// # React hook cơ bản / Dùng useEffect
let test = 100;
const A = () => {
    const check = test;
    console.log("render A");
    return(
        <div>
            <div>{check}</div>
            <div>Hello</div>
        </div>
    )
}
ReactDOM.render(<A/>, document.getElementById("customHook"));

const B = () => {
    console.log("render B");
    return(
        <div>
            <div>Hello: {test}</div>
            <button onClick={() => console.log(++test)}>Click</button>
        </div>
    )
}
ReactDOM.render(<B/>, document.getElementById("customHook2"));

const C = () => {
    console.log("render C");
    const [count, setCount] = React.useState(0);
    const data = test;
    React.useEffect(() => {
        console.log(test);
    }, [test]);
    return(
        <div>
            <div>Hello: {test}</div>
            <button onClick={() => setCount(count+1)}>Ép render lại</button>
        </div>
    )
}
ReactDOM.render(<C/>, document.getElementById("customHook3"));
//1) 1 component sẽ k render lại nếu state và props nó k đổi. Dù ta có tạo ra nhiều biến bên trong class
//mà thay đổi thoải mái nó vẫn k render lại đâu, phải là state props cơ
//2) Thậm chí dùng useEffect với dữ liệu bên ngoài k là state hay props cx k được vì nó k đổi đối với component này

// # Custom hook
const useCustomHook = (id) => {
    const [data, setData] = React.useState(0);
    React.useEffect(()=>{
        setData(data + 1);
    },[id]);
    return data;
}
const D = () => {
    console.log("render D");
    const dataFromCustomHook = useCustomHook(0);
    React.useEffect(() => {
        console.log("Hello");
    },[dataFromCustomHook]);
    return(
        <div>Hello</div>
    )
}
ReactDOM.render(<D/>, document.getElementById("customHook4"));

const E = () => {
    console.log("render E");
    const [test, setTest] = React.useState(10);
    const dataFromCustomHook = useCustomHook(test);
    React.useEffect(() => {
        console.log("Change");
    },[dataFromCustomHook]);
    return(
        <div>
            <div>{test}</div>
            <div>{dataFromCustomHook}</div>
            <button onClick={() => setTest(test + 1)}>Click</button>
        </div>
    )
}
ReactDOM.render(<E/>, document.getElementById("customHook5"));
//CustomHook là tách biệt nhau. Component D và E cùng dùng custom hook thì D làm cho tham số của customhook đổi thì D
//tự render lại, còn E cũng dùng customhook đó nhưng chả liên quan gì đến customhook của E nên vẫn thế. 

//CustomHook sinh ra với ban đầu là bên trong nó có useState và useEffect để nó xử lý cái biến useState theo phụ thuộc
//vào biến gì và component gọi nó sẽ lấy ra. Vd vẫn xử lý như bên trên rằng D và E cùng dùng hook useCustomHook tách riêng
//ra và D và E cùng bắt sự thay đổi của biến trả về để làm gì đó. 
//Bên trên thì ok nhưng nếu bên trong customHook mà luôn bị thay đổi bởi 1 cái gì đó bên ngoài thì có thể E và D cùng 
//bị thay đổi dù tách riêng nhau. Ta k tái hiện nó ở đây
//VD: D thay đổi url và customhook bắt sự thay đổi của url bằng hàm của webAPI như trong dự án auction, thì cả E và D
//cùng render lại do biến dataFromCustomHook tách riêng 2 TH nhưng cùng bị thay đổi bởi 1 tác nhân bên ngoài là url thì 
//nó tự update. Tức là customHook tự bắt sự thay đổi bên ngoài k phụ thuộc và E và D làm gì mà chỉ phụ thuộc vào url bên 
//ngoài

