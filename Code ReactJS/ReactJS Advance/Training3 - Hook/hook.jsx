// # Custom hook

function useTest(count){
    React.useEffect(() => {
        if(count%2 == 0)
            console.log("hello")
        else 
            console.log("hallo")
    });
    console.log("ABC");
    // Khi dùng useEffect k truyền gì như này, nó sẽ luôn luôn được chạy sau khi hàm này được gọi, bất kể state
    // của component có đổi hay không. VD: count k đổi nhưng useTest được gọi thì nó vẫn chạy useEffect
}
function FirstBasic(){
    const [isRed, setIsRed] = React.useState(true);
    const [count, setCount] = React.useState(0);
    const increase = () => {
        setCount(count + 1);
    }
    const test = useTest(count)
    //thật ra kp là useTest là 1 hook được gọi lại liên tục đâu mà điều đặc biệt ta gọi custom hook là ta truyền vào 
    //hàm số đó 1 state var để khi nào biến setState mà thực sự làm đổi state nó sẽ render lại hàm này=> sẽ gọi lại
    //hàm custom hook nên nó mới bị gọi lại nh lần.
    React.useEffect(() => {
        console.log("effect")
        if(count%2 == 0)
            setIsRed(true)
        else 
            setIsRed(false)
    },[count])
    console.log("function")
    return(
        <div>
            <div style={{color: isRed ? "red" : "yellow"}}>Color Changed</div>
            <div>count: {count}</div>
            <button onClick={increase}>INCREASE</button>
            <button onClick={() => setIsRed(!isRed)}>Switch</button>
        </div>
    )
}
ReactDOM.render(<FirstBasic id={1} />, document.getElementById("1"))

// # Dùng context / dùng useContext
const themes = {
    light: { color: "black", backgroundColor: "white"},
    dark: { color: "white", backgroundColor: "black" }
}
const ThemeContext = React.createContext()
function ContextProviderClass(){
    return(
        <ThemeContext.Provider value={themes}>
            <ThemedButton />
        </ThemeContext.Provider>
    )
}
var objectStyle1 = null;
function ThemedButton(){
    const [isDark, setIsDark] = React.useState(true);
    const [objectStyle, setObjectStyle] = React.useState(null);
    const theme = React.useContext(ThemeContext)
    console.log(0);
    const changeMode = () => {
        if(isDark)
            setIsDark(false)
        else   
            setIsDark(true)
    }
    React.useEffect(()=>{
        setObjectStyle( isDark ? theme.dark : theme.light)
        objectStyle1 = isDark ? theme.dark : theme.light
    },[isDark])
    //Ở đây ta chỉ cần ấn nút thì theme bị đổi, ta hoàn toàn set style của nút trong hàm sự kiện được
    //nhưng ở đây ta làm dài dòng hơn là ấn nút thì biến isDark đổi, biến đổi thì useEffect
    //=>ta phải biết dùng đúng lúc khi nào cần kiểu bind property cái này cho cái kia mà có nh cái thì 
    //dùng chứ ấn 1 nút đổi mỗi 1 cái thì dùng TT đi

    //Trap kinh điển của hook: ta giả sử dùng biến isDark như trên
    //TH1: dùng biến global objectStyle ngoài class và đổi nó trong useEffect -> khi ấn nút thì isDark đổi
    //nên chạy vào useEffect đổi objectStyle->xong chạy hàm 1 lần nx mà k gọi useEffect-> ok -> có ok đâu
    //Th2: dùng biến objectStyle cục bộ trong function và đổi nó trong useEffect -> lỗi -> vì sau khi
    //chạy xong useEffect nó còn chạy thêm 1 lần nx mà k gọi useEffect mà ta khai báo object style trong hàm
    //thì lúc đó nó tạo mới biến đó mất r, k còn lấy giá trị đc gán trong useEffect nx
    //TH3: cx như TH2 nhưng ta dùng nó là state thì lại ổn bởi vì nó k tạo mới nx
    //=> Như v dùng biến cục bộ rất có vấn đề vì nếu ta cần dùng 1 biến lưu 1 cái gì đó trong function 
    //component thì nên dặt nó là state => tuy nhiên nếu thích tạo biến trong function mặc kệ nó tạo mới cơ
    //thì ta có thể k dùng useEffect ở TH trên mà gán trực tiếp luôn vẫn ok, chạy 1 lần và gán là xong
    return (
        <div>
            <button onClick={changeMode} style={objectStyle1}>Styling Button</button>
        </div>
    )
}
ReactDOM.render(<ContextProviderClass />, document.getElementById("2"));

// # React hook cơ bản / Dùng useReducer
var initialVal = 10;
function init(initialVal){ return {count: initialVal} }//chú ý giá trị ban đầu phải đúng
function reducer(state,action){
    switch(action.type){
        case 'increasement':
            console.log(action.payload)
            return {count: state.count + 1}
        case 'decreasement':
            return {count: state.count - 1}
        default:
            throw new Error();
    }
}//biến count của state ta k hề định nghĩa nó ở đâu cả mà dùng là tự có: nên tạo reducer trước với 
//state và action.payload mặc định là có mọi thứ r
function Counter(){
    const [state,dispatch] = React.useReducer(reducer,initialVal,init);
    return(
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: "increasement", payload: "Increase"})}>+</button>
            <button onClick={() => dispatch({type: "decreasement"})}>-</button>
        </div>
    )
}
ReactDOM.render(<Counter />, document.getElementById("3"))

// # Dùng useMemo useCallback
function TestMemo(){
    const [stateTest,setStateTest] = React.useState(0)
    var check = React.useMemo(() => {
        return {
            state1: stateTest,
        }
    },[stateTest])
    //tương tự useEffect phải dùng array 
    var functionCallback = React.useCallback(() => {
        console.log('Callback value: ' + check.state1)
    },[check])
    var funcEvent = () => {
        functionCallback();
        setStateTest(stateTest + 1)
    }
    return(
        <div>
            <div>Check: {check.state1}</div>
            <button onClick={funcEvent}>Change state</button>
        </div>
    )//chú ý thẻ <div><biến boolean></div> thì sẽ k hiện gì cả vì nó k hiển thị giá trị của boolean
    //nhưng số như trên thì đc. Ta ht có thể vẫn làm đc với đặt nếu true thì hiển thị gì chay
}
ReactDOM.render(<TestMemo/>, document.getElementById("4"))


// # Dùng về ref
function TestRefClass(){
    const ref = React.useRef()
    // const ref = React.createRef()
    const eventHandler = () => {
        console.log(ref.current.innerText);
    }
    return(
        <div>
            <div ref={ref}>Content of ref</div>
            <button onClick={eventHandler}>Click</button>
        </div>
    )
}
ReactDOM.render(<TestRefClass/>, document.getElementById("5"));

//Để dùng useImperativeHandler thì phải biến cái ref truyền vào thành global
function RefNotForward(props,ref) {
    const inputRef = React.useRef()
    React.useImperativeHandle(ref,() => ({//ref trở thành global sử dụng đc mọi hàm bên trong
        testFunction: () => {//cái này bị nhét vào current của ref là đối số 1 truyền từ cha
            inputRef.current.focus()
            console.log("Thực hiện gì đó ở con")
        }
    }))
    //2 là hàm số trả về 1 object nhé, lấy và thực hiện bất cứ thứ j vs object
    return (
        <input ref={inputRef}/>
    )
}
const TestRefHandler = React.forwardRef(RefNotForward)
var TestRef = React.forwardRef((props,ref) => {//chuyển tiếp cái ref của cha sang cho 1 component mới là return của hàm số
    return (
        <div>
            <div ref={ref.ref1}>Content of ref 1</div>
            <div ref={ref.ref2}>Content of ref 2</div>
        </div>
    )
})
function RefClass(){
    const ref = React.useRef();
    const ref1 = React.useRef()
    const ref2 = React.useRef()
    var eventHandler = () => {
        console.log(ref1.current.innerText);
        console.log(ref2.current.innerText);
        ref.current.testFunction();
    }
    return(
        <div>
            <TestRefHandler ref={ref}/>
            <TestRef ref={{ref1: ref1, ref2: ref2}}/>
            <button onClick={eventHandler}>Click</button>
        </div>
    )//k nhất thiết truyền vào ref 1 biến ref mà truyền 1 object như này để refer đến nhiều thẻ trong forwardRef cx đc
}
ReactDOM.render(<RefClass/>, document.getElementById("6"))

// # React hook cơ bản / Dùng useLayoutEffect
var count = 0;
function ChangeCountClass(){
    const [test1,setTest1] = React.useState(true)
    React.useLayoutEffect(() => {
        console.log("run effect");
        ++count;
        console.log(count)
    }, [test1])
    console.log("Run function")
    return (
        <div>
            {count}
            <button onClick={() => setTest1(test1 ? false : true)}>TEST 1</button>
        </div>
    )
}
ReactDOM.render(<ChangeCountClass/>, document.getElementById("7"))
//nếu count là biến state-> function->effect->function
//nếu count k là biến state-> function->effect 
//=>Th 2 bị chậm 1 nhịp vì dùng count k là state k cập nhập lại nên count là 3 thì mới hiện ra 2

// # Dùng useMemo useCallback
// dùng memo quản lý vc cha render nhưng con trong cha chỉ render lại khi cần thiết
// memo
var Con1 = React.memo(props => {
    return (
        <div name={console.log("Render Con1")}>
            Con1
        </div>
    )
})
function Cha1(){
    const [count, setCount] = React.useState(0)
    return (
        <div name={console.log("Render Cha1")}>
            <Con1 />
            <button onClick={() => setCount(count + 1)}>Cha1</button>
        </div>
    )//Ở Th này Con1 k có props gì cả mà bên trong Con1 cx k có state gì để đổi => Con1 sẽ kbh đc re-render ở TH này
    //vì đối số 2 của memo là cái gì đổi thì nó ms render lại, nếu kcj thì chả bh render lại
}
ReactDOM.render(<Cha1/>, document.getElementById("8"))

// useMemo
var Con2 = props => {
    return React.useMemo(() => {
        return (
            <div name={console.log("Render Con2")}>
                Con2
            </div>
    )},[])
}
function Cha2(){
    const [count, setCount] = React.useState(0)
    return (
        <div name={console.log("Render Cha2")}>
            <Con2 />
            <button onClick={() => setCount(count + 1)}>Cha1</button>
        </div>
    )
}
ReactDOM.render(<Cha2/>, document.getElementById("9"))
// Dùng useMemo phải bao nó trong 1 function chứ k được gọi riêng. 2 cách thật ra tương tự nhau. Dùng useMemo thì 
// nó gán Con2 cho 1 component và component đó return luôn 1 component khác thì cx như gán trực tiếp thôi