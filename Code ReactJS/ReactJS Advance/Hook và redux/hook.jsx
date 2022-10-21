// # Basic

function Example(props) {
    const [count, setCount] = React.useState(0);

    console.log("1");
    React.useEffect(() => {
        console.log("2");
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <div>{count}</div>
            <button onClick={() => setCount(count + 1)}>Increase count</button>
        </div>
    )
}
ReactDOM.render(<Example />, document.getElementById("hook1"));

// # Custom hook
function useCustomHook(id) {
    const [boolean, setBoolean] = React.useState(true);
    React.useEffect(() => {
        console.log("call custom hook1");
        if(id % 2 == 0)
            setBoolean(true)
        else
            setBoolean(false)
    },[id])
    console.log("call customhook");
    return boolean;
}
//nếu ta để phụ thuộc là mặc định chứ kp [id] thì hook được gọi kp là phụ thuộc vào state đâu vì kể cả state k đổi nhưng
//render lại nó vẫn gọi hook-> nó sẽ gọi hook bất cứ khi nào hàm được render lại và hàm render lại khi: được gọi, đổi 
//state, props của hàm. Nếu như v thì TestCustomHook cứ đổi bất cứ state nào thì useCustomHook đều gọi useEffect dù
//nó chả đổi gì cả, điều này là k tốt về hiệu suất nên phải thêm biến phụ thuộc vào mỗi useEffect chứ k để mặc định

function TestCustomHook() {
    const [parentClass, setParentClass] = React.useState(0);
    const [id, changeId] = React.useState(0);
    const customHook = useCustomHook(id);
    return(
        <div>
            <div>{customHook}</div>
            <button onClick={() => setParentClass(parentClass + 1)}>Đổi state</button>
            <button onClick={() => changeId(id + 1)}>Đổi custom Hook</button>
        </div>
    )
}
ReactDOM.render(<TestCustomHook />, document.getElementById("hook2"));

// # React hook cơ bản / Dùng useReducer
function getInitialVal(){
    return {count: 0};
}
function reducer(state, action){
    switch(action.type){
        case "ADD": 
            return {
                ...state, // nếu state là 1 object để ta k buộc phải khai báo đầy đủ state
                count: ++state.count
            };
        case "DEC":
            return {count: --state.count};
        default:
            throw new Error("Wrong Type of Action"); // or cứ return state; là được vì có thể case nào đó vào ta kb
    }
}
var TestReducerHook = () => {
    const [state, dispatch] = React.useReducer(reducer, undefined, getInitialVal);
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: "ADD"})}>+</button>
            <button onClick={() => dispatch({type: "DEC"})}>-</button>
        </div>
    )
}
ReactDOM.render(<TestReducerHook />, document.getElementById("hook3"));

// # Dùng useMemo useCallback
function TestCallbackAndMemo(){
    const [person, setPerson] = React.useState("true");
    const memoVar = React.useMemo(() => {
        if(person)
            return{
                name: "Hieu",
                age: 18
            }
        else
            return{
                name: "Trang",
                age: 19
            }
    },[person]);
    var callbackFunc = React.useCallback(() => {
        console.log(person);
    },[person]);
    //useCallback k hưu dụng bằng useMemo. VD: cần nếu persion true thì hàm này, persion false thì là hàm khác thì k dùng
    //useCallback đc mà phải là useMemo-> useMemo nó bao cả useCallback
    return (
        <div>
            <div>Name: {memoVar.name}; Age: {memoVar.age}</div>
            <button onClick={callbackFunc}>Func</button>
            <button onClick={() => setPerson(!person)}>Change name and age</button>
        </div>
    )
}
ReactDOM.render(<TestCallbackAndMemo />, document.getElementById("hook4"));

// # Dùng về ref
//createRef cho phép refer tới 1 thẻ bất kỳ ở trong component. Nó kp là hook nên nếu dùng trong function component sẽ
//tạo lại liên tục giảm hiệu suất
//useRef là hook giúp truy cập vào bất kỳ thẻ nào trong component hiện tại. Truyền ref từ cha cho con có thể giúp truy cập
//vào bât cứ component nào của con=> nch là bh đã có thể truy cập vào bất cứ thẻ nào ở component hiện tại và con của 
//component hiện tại r
//forwardRef chỉ làm phần truyền ref từ cha sang con với 1 cú pháp khác mà thôi-> useRef bth vẫn làm đc toàn bộ
//Tưởng ổn r nhưng vẫn chưa làm đc kiểu có 1 component dùng chung cho nh component khác, các component khác muốn ref đến
//component đó và thực hiện component đó với các hàm giống nhau. V thì việc tái sử dụng các hàm của component đó chưa làm
//được. Mọi cha đều phải tạo ref truyền cho con, mỗi cha đều phải tạo lại những hàm như nhau với các thao tác với con 
//như nhau=> useImperativeHandle ra đời, đồng thời giúp truyền 1 ref refer đến nh thẻ 1 lúc kết hợp 3 hàm
//đồng thời giúp cha ấn 1 nút nhưng đổi hàng đống component của con cơ
function TestUseRefChild(props) {
    return (
        <div>
            <div ref={props.id}>{props.children}Hello</div>
        </div>
    )
}
function TestUseRefParent() {
    var testRef = React.useRef();
    return (
        <div>
            <TestUseRefChild id={testRef}>Parent </TestUseRefChild>
            {/* muốn ref nhiều thẻ thì truyền object các ref vào */}
            <button onClick={() => testRef.current.innerText = "World"}>CLick</button>
        </div>
    )
} 
ReactDOM.render(<TestUseRefParent />, document.getElementById("hook5"));

//forwardRef nhận component có (props,ref) trả ra component bth 
function TestRef(props, ref) {
    const ref1 = React.useRef("value");
    console.log(ref1.current);
    const ref2 = React.useRef();
    const ref3 = React.useRef();
    React.useImperativeHandle(ref, () => ({
        changeColor: () => { 
            ref1.current.style.backgroundColor = props.color;
            ref2.current.style.backgroundColor = "yellow";
            ref3.current.style.backgroundColor = "green";
        },//chú ý phải là hàm số
        changeText: () => {
            ref1.current.innerText = "Changed Text 1";
            ref2.current.innerText = "Changed Text 2";
            ref3.current.innerText = "Changed Text 3";
        }
    }));
    return (
        <div>
            <div ref={ref1}>Text 1</div>
            <div ref={ref2}>Text 2</div>
            <div ref={ref3}>Text 3</div>
        </div>
    )
}
const FancyTestRef = React.forwardRef(TestRef);
function RigthWayUseRef() {
    const refTest = React.useRef();
    return (
        <div>
            <FancyTestRef ref={refTest} color={"red"}/>
            <button onClick={() => refTest.current.changeColor()}>Change Color</button>
            <button onClick={() => refTest.current.changeText()}>Change Text</button>
        </div>
    )
} 
function RigthWayUseRef2() {
    const refTest = React.useRef();
    return (
        <div>
            <FancyTestRef ref={refTest} color={"cyan"}/>
            <button onClick={() => refTest.current.changeColor()}>Change Color</button>
            <button onClick={() => refTest.current.changeText()}>Change Text</button>
        </div>
    )
} 
var Combination = () => {
    return (
        <div>
            <RigthWayUseRef />
            <RigthWayUseRef2 />
        </div>
    )
}
ReactDOM.render(<Combination />, document.getElementById("hook6"));

// # Dùng useMemo useCallback
const Con = props => {
    console.log("Chạy hàm con");
    return React.useMemo(() => {
        return (
            <div name={console.log("Con")}>Hello</div>
        );
    },[]);
};
function Cha(){
    const [counter,setCounter] = React.useState(2);
    return <div name={console.log("Cha")}>
        <Con />
        <button onClick={() => setCounter(counter + 1)}>Click</button>
    </div>
}
ReactDOM.render(<Cha />, document.getElementById("hook7"));
