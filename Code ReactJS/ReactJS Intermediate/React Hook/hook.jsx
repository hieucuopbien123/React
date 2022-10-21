// # Dùng HOC

const withSecretToLife = (WrappedComponent) => {
    class HOC extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    secretThing={42}
                />
            );
        }
    }
    return HOC;
};
//Đây là 1 HOC cơ bản. Nó nhận vào 1 component tiến hành thay đổi 1 chút(thêm vào props) và trả ra component khác
//Để sử dụng:
const DisplayTheSecret = props => (
    <div>
        The secret to life is {props.secretThing}.
    </div>
);
const WrappedComponent = withSecretToLife(DisplayTheSecret);
//HOC k chỉnh sửa component ban đầu. WrappedComponent được thêm props cx chả qt prop đến từ đâu.
//Ta dùng HOC tức là dùng 1 hàm số nhận 1 component và cho ra component cần dùng, Tương tự ta có thể tạo ra 
//WrappedComponent2, WrappedComponent3 từ DisplayTheSecret với props khác nhau or từ component nào khác với cùng 
//props đó=> nch là khả năng tái sử dụng bằng 1 hàm số mà thôi. Như v WrappedComponent sẽ là cái class HOC bên trên
//props chỉ là 1 thứ bth, ta có thể tái sử dụng, thêm nhiều component xung quanh hơn là chỉ truyền thêm props
//Ta dùng kiểu, đang có 1 component, bh ta muốn tái sử dụng nó bằng cách thêm 1 thuộc tính khác cho nó thì dùng

// # React hook cơ bản
// Dùng useState, Dùng useEffect

function Example(props) { //vẫn truyền props vào bth
    const [count, setCount] = React.useState(0);
    const [fruit, setFruit] = React.useState('banana'); // fruit là readonly, chỉ đổi đc với setFruit(<val>)
    const [todos, setTodos] = React.useState([{ text: 'Learn Hooks' }]); // gọi là local state of function component
    const [repos, setRepos] = React.useState([]); // nếu truyền state từ cha sang con nhớ truyền cả hàm set
    const [loading, setLoading] = React.useState(false)
    const [isOnline, setIsOnline] = React.useState(null); // state nên khai báo đầu function

    React.useEffect(() => {
        document.title = `You clicked ${count} times`;
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET"
        }).then((res) => { 
            setLoading(false); 
            return res.json()
        }).then(res=>console.log(res))//chú ý là res.json() nó vẫn là 1 kiểu promise và phải .then phát nx mới
        //in ra đc kết quả như này
        Promise.resolve("10").then(res => console.log(res))
    },[]);
    //xử lý call api + loading để update giao diện, nó sẽ tự cập nhập nhưng k lấy đc gt trả về bởi vì khi ta call api thì
    //response.json() nó là 1 kiểu promise chỉ lấy đc khi dùng await ở TH này. Nếu là hàm promise return gt bth thì đc

    console.log("6")
    React.useEffect(() => {
        console.log("7")
        document.title = `You clicked ${count} times`;
        console.log("9")
    });
    
    React.useEffect(() => {
        return console.log('Unmount!'); // hàm này đang return undefined nè
    });
    return (
        <div>
            <p rel={console.log(8)}>You clicked {count} times</p>
            <button onClick={() => {
                setCount(count + 1)
            }}>
                Click me
            </button>
            <br />
            {loading ? "loading" : "loaded"}
        </div>
    );
}
ReactDOM.render(<Example />, document.getElementById("hook1"));
//useEffect dùng trong hàm này thì dùng đc state, props của hàm

//xét lần render đầu tiên: gọi hàm chạy từ trên xuống->6->return xong mới thực hiện useEffect vì lần đầu tiên gọi sẽ
//gán các giá trị, gán giá trị tức có sự thay đổi nên gọi useEffect->7
//đáng lẽ như thế là xong nhưng hàm useEffect fetchAPI lại setLoading thay đổi state 1 lần nx làm nó lại chạy lại hàm
//->6->useEffect bắt mọi thứ lại chạy tiếp ->7 => 6767

// # Custom hook
function usecheckBool(id){
    const [isTrue, setIsTrue] = React.useState(true);
    console.log("2")
    React.useEffect(() => {
        console.log(isTrue)
        if(id%2 == 0)
            setIsTrue(false);
        else 
            setIsTrue(true);
    })//để mặc định tức id đổi(props đổi) nó tự sẽ chạy lại và render lại
    console.log("5")
    function getIsTrue(){
        console.log("8")
        return isTrue;
    }
    return getIsTrue();//cồng kềnh vl có thể return isTrue; luôn
    //có thể return 1 thẻ jsx, return 1 mảng nhiều phần tử cx đc
}
//Với custom hook có thể làm đc vô số thứ và là công cụ phải master

var idList = [1,2,3,4,5];
function TestCustomHook(props) {//đổi giá trị custom hook bằng cách truyền vào biến ảnh hưởng đến vc đổi
    const [id, changeId] = React.useState(0);
    const [test, changeTest] = React.useState(0);
    console.log("4")

    // Kiểm soát custom hook k chạy lại bằng useCallback nếu muôn. Dùng useCallback thực chất làm tốn tài nguyên hơn
    const isTrue = React.useCallback(() => { return usecheckBool(id)}, [id]);
    //dùng thế này cx hiểu là isTrue là 1 state của component này, nó đổi thì cx render
    //lại component này-> hàm get là chính nó còn hàm set ta đổi id là được, id là props sẽ gọi lại useEffect customHook
    //isTrue đổi khi id đổi => ta có thể xử lý điều này bằng 1 useEffect thông thường. Dùng như này k tốt vì bất cứ
    //cái gì đổi thì hàm này gọi lại là isTrue đều được set lại=> or useMemo

    console.log("3");
    //giá trị hook lấy từ ngoài vào nó sẽ thay đổi theo bên ngoài, k đc sử dụng kèm {} trong return
    //sử dụng thế chỉ đúng với các cái thuộc về component này mà thôi nên ta buộc phải làm như dưới
    var check = null;
    // if(isTrue)
    //     check = <div>isTrue: true</div>
    // else
    //     check = <div>isTrue: false</div>
    check = isTrue ? (<div>isTrue: true</div>) : (check = <div>isTrue: false</div>)
    return <div>
        {check}
        <button onClick={() => changeId(id + 1)}>Change Props</button>
        <button onClick={() => changeTest(test + 1)}>IncreaseTest</button>
        <div style={{backgroundColor: (id > 3) ? "green" : "red "}}>Color change</div>
        <select
            value={id}
            // value chính là cái id, nó đổi làm giá trị trong select cx đổi nhưng khi quá 5 tức quá sl item thì
            //nó quay trở về giá trị thấp nhât
            onChange={e => changeId(Number(e.target.value))}
        >
            {idList.map(item => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
}
ReactDOM.render(<TestCustomHook />, document.getElementById("hook2"));//props là readonly k đổi đc
//khi sử dụng hàm số component, nếu state đổi nó đều thực hiện lại hàm số đó luôn. Do đó nếu state đổi nó chạy lại từ đầu
//thì hàm checkBool nó cx chạy lại dẫn đến isTrue lại tạo biến mới và cập nhập lại nên để const cx đc. Các biến nào là
//state rồi thì chỉ tạo 1 lần, sẽ k tạo lại(dùng component này ở nhiều chỗ thì mỗi chỗ sẽ như v),các thứ khác đều tạo lại
//ví dụ bên trên thì check được tạo lại liên tục. Dùng hàm tiện hơn vì gọi bất cứ code js nào trực tiếp đều đc

//luồng trên: 425834258342583. Vì ấn phát state id đổi sẽ thực hiện từ trên xuống->4->2->5->8->3->4->2->5->8->3-> do 
//lần này lại làm isTrue đổi khiến render lần nx->42583->đó là lần render đầu tiên
//Khi ấn cx hiện y như v: Bởi vì nó đơn giản kp thực hiện xong là dừng lại mà nó sẽ chạy hàm lại liên tục cho đến khi 
//lần cuối cùng k còn 1 cái hook nào cần chạy nx thì thôi nên thực hiện 2 lần, lần 3 thấy k còn thì dừng

//Bản chất tại sao usecheckBool dùng useEffect(). Ta hiểu là mỗi lần state đổi thì sẽ chạy lại cái function này
//hay nói đúng hơn kể cả nó k đổi nhưng gọi hàm set của nó thì nó cx sẽ thực hiện lại function. Nếu dùng custom hook 
//thì k có hàm set nên k tính. Do đó nếu k dùng useEffect thì setIsTrue gọi liên tục dẫn đến render vô hạn bị lỗi
//đổi props ở TH này cx làm nó render lại. Tức là gọi vào setIsTrue chính nó(giá trị thực tế k đổi thì nó vẫn render lại)
//đổi state thì chạy lại hàm-> gọi đến custom hook nhưng custom hook chỉ thực hiện các hàm hook đổi giá trị theo tham số
//nó phụ thuộc mà thôi

// # Dùng context
// # Dùng useContext
const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};
const ThemeContext = React.createContext(themes.light);//giá trị mặc định
function App() {
    return (
        <ThemeContext.Provider value={themes.dark}>{/*Có provider nên k lấy giá trị mặc định */}
            <Toolbar />
        </ThemeContext.Provider>
    );
}
function Toolbar(props) {
    return (
    <div>
        <ThemedButton />
        {/* k cần truyền theme trung gian tiếp như props nx */}
    </div>
    );
}//chia file xàm lol quá
function ThemedButton() {
    const theme = React.useContext(ThemeContext);//1 cách lấy dữ liệu từ cha sang con
    //trả ra giá trị của context, giá trị mà bao ngoài cái này ở Provider gần nhất vs attribute value, k có thì default
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
}
ReactDOM.render(<App />, document.getElementById("hook3"));

// # React hook cơ bản
// Dùng useReducer
const initialState = {count: 0};
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        default:
            //trong redux lần đầu tiên nó gọi INIT chạy vào default nhưng hook éo cần luôn, nó lấy giá trị ban đầu 
            //của useReducer đối số 2. Cho nên kbh chạy vào default nên nếu chạy vào default tức type action k tồn tại
            //hay sai và ta cho in ra lỗi
            throw new Error();
    }
}
function Counter() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    //giá trị ban đầu có thể dùng state, props function này thoải mái
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </div>
    );
}
ReactDOM.render(<Counter />, document.getElementById("hook4"));

function init(initialCount) {
    return {count: initialCount};
}
function reducer2(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}
function Counter2({ initialVal }) {
    const [state, dispatch] = React.useReducer(reducer2, initialVal, init);
    //cách khác dùng đối số thứ 3 để khai báo 1 hàm tạo giá trị ban đầu, đối số 2 sẽ là para của đối số 3
    //hàm khai báo k có para thì cho 2 là undefined là đc

    var fruitStateVariable = React.useState('banana');
    console.log(fruitStateVariable);
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'reset', payload: initialVal})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </div>
    );
}
ReactDOM.render(<Counter2 initialVal={5}/>, document.getElementById("hook5"));

//giống như componentDidMount và componentWillUnmount phải đối lập nhau xóa những gì đã tạo để tránh memory leak.
//Ta phải tạo ra clean up nếu sử dụng 1 cái gì đó ngay lập tức. Tại vì mỗi lần render thì hàm truyền vào useEffect đã
//thay đổi. Nếu như mỗi vòng ta tạo 1 biến gì đó ảnh hưởng tới bộ nhớ mà k clean thì sang lần render sau ta k gặp đc nó
//nx. Hàm return cứ như là componentWillUnmount v.

// # React hook cơ bản
// Dùng useEffect với setInterval
const IntervalExample = () => {
    const [seconds, setSeconds] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => {
            console.log("clean");
            clearInterval(interval);
        }
    },[]);
    //ví dụ ta dùng setInterval như này. Nếu dùng [] ở cuối thì nó sẽ chạy 1 lần duy nhất ban đầu và cứ thế này sẽ kbh 
    //dừng trừ khi cả component unmount thì các hàm useEffect sẽ thực hiện return và bị xóa hoàn toàn. Th này nó xóa hoàn
    //toàn vì may mắn chỉ có 1 cái đồng hồ interval và gọi clear phát là xong.
    //Nếu ta k dùng [] mà để trống ở cuối, giả sử có thêm hàm bấm nút thì đổi 1 thuộc tính khác chẳng hạn. Nó sẽ tạo ra
    //1 cái interval->ta k làm gì cả chờ hết 1s, setinterval chạy làm đổi giá trị seconds-> state thay đổi chạy lại hàm
    //này->render xong gọi useEffect do đối số 2 trống nên sẽ chạy vào hàm bên trong-> lại có quy tắc trc khi thực hiện
    //1 useEffect mới thì useEffect cũ bị clean tức thực hiện hàm return xóa interval cũ-> lại tạo 1 interval mới và
    //thực hiện tương tự. Cứ như v tạo và xóa liên tục khác với TH trc chỉ có 1 cái. Nếu ta ấn nút thay đổi state nào
    //đó liên tiếp thì thời gian dừng lại là vì nó useEffect thực hiện tạo và xóa cái trc liên tục-> dừng ấn thì ms chạy
    //bth. Nếu bỏ [] đơn giản chỉ thấy xuất hiện "clean" liên tục
    // => Rõ ràng là ta ít khi nào cần kiểu để trống thì lúc nào render cx chạy lại-> chỉ những biến phụ thuộc ms cần thôi
    // các biến bth thì out of scope tự xóa nhưng interval thì k nên mới phải như v. Mỗi lần render nó sẽ thực hiện xóa
    // các biến cơ bản như v tự động và tạo ra các biến mới

    //useCallback và useMemo chính là thay thế shouldComponentUpdate.

    const getStyle = React.useMemo(() => {
        return {
            color: 'blue',
            background: 'gold',
        };
    }, []);
    //dùng biến getStyle-> dùng như thế này với [] là param2 sẽ thực hiện duy nhất 1 lần ban đầu và sử dụng biến này
    //mãi mãi(useMemo là 1 biến, useCallback là func),k có memo sẽ tạo lại biến này để sử dụng mỗi lần re-render rất tốn 
    const onChangeHandler = React.useCallback(() => {
        console.log("Hàm muốn dùng lưu vào onChangeHandler nhưng k muốn tạo lại liên tục")
    }, [seconds]);
    const replaceFunc = React.useMemo(() => {});//dùng phải có đối số 2 chứ k có thì như 
    //useMemo giúp ta lưu 1 biến thay đổi theo biến khác, useCallback giúp lưu 1 hàm thay đổi theo 1 biến khác
    //còn useEffect là thực hiện 1 hàm số khi biến khác đổi. Nó khác nhau và useEffect nó k return luôn
    //customHook rất ít khi dùng

    return (
        <div className="App">
            <header className="App-header">
                {seconds} seconds have elapsed since mounting.
            </header>
        </div>
    );
};
ReactDOM.render(<IntervalExample />, document.getElementById("hook6")); 

//1 ví dụ áp dụng đối số 2. Ví dụ setup an subcription, subscribe 1 id và return unsubscribe id đó thì đối số thứ 2
//ta dùng luôn id để nếu id của user đăng nhập thay đổi thì thực hiện đăng xuất user cũ.

// # Dùng về ref
// Dùng useRef
function TextInputWithFocusButton() {
    const inputEl = React.useRef("default value");//như createRef nhưng là mutable value, chỉnh sửa thoải mái
    //truyền vào nó default value, nó sẽ lưu trong current
    const onButtonClick = () => {
        console.log(inputEl.current);//trả ra thẻ này chứ j nx
        inputEl.current.focus();//ấn là chạy nhưng k render lại vì k có state hay props nào đổi cả.
        // K nên dùng useCallback mà hàm số thì chấp nhận khởi tạo lại 
    };
    return (
        <div>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </div>
    );
}
ReactDOM.render(<TextInputWithFocusButton />, document.getElementById("hook7")); 

// Dùng forwardRef
function TestRef(){
    const FancyButton = React.forwardRef((props, ref) => (
        <button ref={ref} className="FancyButton">
            {props.children} Funny {props.id}
            {/*cái children là text node click me đó */}
        </button>
    ));
    // You can now get a ref directly to the DOM button:
    const ref = React.createRef();
    return <FancyButton id={1} ref={ref}>Click me!</FancyButton>;
}
ReactDOM.render(<TestRef />, document.getElementById("hook8")); 

// Dùng useImperativeHandle
function FancyInput(props, ref) {
    const inputRef = React.useRef();
    React.useImperativeHandle(ref, () => ({
        focusFunction: () => {
            console.log("gọi vào đây")
            //VD từ cha mà muốn focus vào cái input này qua ref thì k đc mà phải dùng input ref mà inputRef k có
            //trong class cha. useImperativeHandle sẽ định nghĩa các hàm mà cha có thể gọi để tác động vào đây
            inputRef.current.focus();
            //ví dụ tạo ra nhiều useRef với nhiều thẻ r dùng hàm này quy hết về 1 ref parent này sẽ dùng đc tất cả
        }
    }));
    return <input ref={inputRef} />;
}
//FancyInput = React.forwardRef(FancyInput);
const FancyInputComp = React.forwardRef(FancyInput);
//Tương tự: forwardRef chỉ nhận hàm trả ra 1 component như trên, ta dùng như 1 component.
//dùng useRef bên trong thay thế createRef thôi k có ý nghĩa khác. Nếu ta dùng thẻ input ref={ref} thì thẻ nào dùng 
//component này có thể chỉnh sửa các thuộc tính của input.Nhưng nó cung cấp useImperativeHandle(ref,createHandle,[deps])
//=>giúp tăng cường sử dụng cái ref này. Nếu lúc trc với createRef và useRef ta có thể truy cập mutable đc thẻ nào đó
//nhưng k tái sử dụng đc, nhờ forwardRef tái sử dụng đc thì bh dùng kết hợp thêm useImperativeHandle có thể dùng 1 ref
//mà truy cập đến nhiều ref của con. Ta có thể gói nó vào trong 1 object thì object này chính là current luôn + dùng đc
//hiệu ứng của hook là dùng đối số 3 của useImperativeHandle là deps. VD truyền vào props state của parent, nếu state
//parent đổi->props này đổi->useImperativeHandle sẽ khởi tạo lại hàm với tham số mới
function Parent(){
    const refFromParent = React.useRef();

    return <div>
        <button onClick={() => refFromParent.current.focusFunction()}> Click</button>
        <FancyInputComp ref={refFromParent}/>
    </div>
}
ReactDOM.render(<Parent />, document.getElementById("hook9")); 
//ta chỉ dùng ref khi cần làm gì liên quan đến các thẻ
//useRef giúp ta làm gì ở cha mà thay đổi thẻ ở trong chính component đó
//forwardRef mạnh hơn giúp làm gì ở cha mà thay đổi con ở xa nhưng chỉ được 1 con
//useImperativeHandle mạnh hơn nx giúp ta làm gì ở cha mà thay đổi được rất nhiều thẻ ở con thoải mái

// # React hook cơ bản / useLayoutEffect / Lỗi của useEffect
function TestLayoutEffect(){
    const ref = React.useMemo(() => {
        return {value: "1"}
    },[]);
    // Chỉ nên hoặc tạo const or useState, k đc khai báo biến var trong function nếu k sẽ reset sau mỗi lần gọi function
    React.useEffect(() => {
        ref.value += 'some value'; // tạo lỗi của useEffect
        console.log("1: ", ref.value);
    })
    React.useLayoutEffect(() => {
        console.log("2: ", ref.value) 
    })

    //Nếu chỉ dùng useEffect or chỉ dùng biến bth trong hàm thì k gây lỗi. Nhưng nếu dùng useMemo thì cẩn thận vì nó sẽ
    //k tạo lại biến. VD Th này: đổi state-> chạy lại hàm-> render với state mới-> chạy vào useEffect đổi ref.value
    //-> không chạy lại hàm nx dẫn đến ref.value k phải là giá trị mới nhất-> nó chậm 1 bước
    
    const [number,getNumber] = React.useState(1);
    return <div>
        <div>{ref.value}</div>
        <button onClick={() => getNumber(number + 1)}>INC</button>
    </div>
}
ReactDOM.render(<TestLayoutEffect />, document.getElementById("hook10"));

var value = 0;
function Trang() {
    const [test, setT] = React.useState(1);
    React.useEffect(() => {
        if(test == 3)
            value = 6;
    },[test]);

    //dùng thế này sẽ có lỗi chứ là biến state dùng TT thì k có lỗi đâu
    var check = null;
    if(value == 6)
        check = <div>Hello</div>
    else 
        check = <div>World</div>
    return <div name={console.log("render")}>
        <div>{test}</div>
        {check}
        <button onClick={() => {setT(test + 1)}}>Test</button>
    </div>
}
ReactDOM.render(<Trang />, document.getElementById("hook11"));

// # Dùng useMemo useCallback / Dùng React.memo

//Vấn đề: khi re-render lại cha thì sẽ thực hiện tất cả các function component con. Đây là 1 điều k thể tránh. Nếu dùng
//context chẳng hạn mà cho 1 ông cha provider thì cha đổi context thì cha và con đều re-render
//Nhưng rõ ràng đó chả phải là vấn đề, quan trọng là các sibling thì k tác động j về re-render hết. Ví dụ như dưới ta ấn
//nút thì sẽ rerender Cha nên Con cx bị re-render. Nếu k muốn thì tách nút ra làm 1 component riêng biến nó thành sibling
//thì Con sẽ k re-render nx. Do đó ta nên ưu tiên dùng sibling mà tránh dùng 1 cha có tất cả truyền cho các con thì cha
//đổi phát là tất cả mọi thứ bị re-render rất yếu về performance. VD: ta k dùng cha vs 1 context lớn mà chia ra bao
//nhiều context nhỏ rời nhau. Nếu k chia đc nx thì đúng là chúng phụ thuộc vào nhau và re-render là cần thiết r.
// function Con(){
//     console.log("a");
//     return <div name={console.log("Con")}>Hello</div>
// }
// function Cha(){
//     const [counter,setCounter] = React.useState(2);
//     return <div name={console.log("Cha")}>
//         <Con />
//         <button onClick={() => setCounter(counter + 1)}>Click</button>
//     </div>
// }
// ReactDOM.render(<Cha />, document.getElementById("hook12"));

//Cách2: làm Con k bị rerender Dùng React.Memo
// const Con = React.memo(props => {//chỉ props đổi thì mới render lại con
//     return <div name={console.log("Con")}>Hello</div>
// })

//truyền vào props vào hàm rất lằng nhằng vì kp hook, nên dùng useMemo. Căn bản là ta muốn tách ra làm nhiều sibling 
//nhất có thể để tránh TH cha đổi nh lần thì từng con đều render lại thì cần cấu trúc file tốt hơn.
//Dùng React.useMemo (còn useContext thế hoàn toàn kiểu truyền prosp cũ) như dưới sẽ tránh render con
const Con = props => {
    return React.useMemo(() => { // vì useMemo trả ra luôn chứ kp như React.memo gán 1 hàm
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
ReactDOM.render(<Cha />, document.getElementById("hook12"));
//hàm React.memo là hàm tạo ra 1 component từ 1 hàm trả về 1 component. Component trả ra có đặc điểm chỉ render lại khi
//props của nó thay đổi

// # React hook cơ bản / Dùng useEffect
//test về sự thay đổi của state khi dùng useEffect và khi click:
//Khi ta gọi hàm set của state, nó k set ngay đâu mà phải chờ vòng render sau chạy đến useState giá trị đó mới tăng
//Cơ chế: ấn đổi-> phát ra signal đổi state-> mỗi khi component phát ra signal này sẽ tự render lại-> render đến giá trị
//đó thì mới kích hoạt đổi và hiển thị ra màn hình
//Khi có useEffect được kích hoạt-> nó render nốt vòng đó mới chạy useEffect(useEffect k render lại)
//Khi gọi hàm set state-> nó sẽ kích hoat render lại
//Do đó useEffect ta k đổi state mà làm cái éo gì thì nó sẽ k render lại và chả có gì cả
function HookTest(){
    console.log("Data1: ", data1);
    const [data1, setData1] = React.useState(0);
    const [data2, setData2] = React.useState({number: 0});
    console.log("Data2: ", data2);
    console.log("Data1: ", data1);
    React.useEffect(() =>{
        setData1(data1 + 1);
        console.log("Data1: ", data1);
    },[data2]);
    return (
        <div rel={console.log("render")}>
            <div>{data1}</div>
            <div>{data2.number}</div>
            <button onClick={() => {
                setData2({number: 0})
                console.log("Won't increase data2: ", data2);
            }}>Increase Data2</button>
            <button onClick={() => {
                setData1(data1)
                console.log("Won't increase data2: ", data2);
            }}>Increase Data2</button>
        </div>
    )
}
ReactDOM.render(<HookTest />, document.getElementById("hooktest"));
//Luồng chuẩn=> Render lần đầu tiên: data2 và data1 đều được gán giá trị ban đầu là 0-> data2 cũng coi là đổi giá trị
//như v useEffect sẽ kích hoạt nhưng chỉ chạy sau khi render-> render ra 0,0-> data2 đổi nên useEffect gọi setData1->
//data1 k đổi ngay mà hàm đổi state sẽ gọi lại hàm-> chạy qua data1 sẽ thay đổi và render ra 1,0
//khi ấn tăng data2-> đổi state sẽ phát signal render lại-> chưa tăng vào lúc set-> gọi lại hàm-> chạy đến useState của 
//data2-> tăng data2 thật sự-> bỏ qua useEffect mà render luôn 1,1-> sau đó ms chạy useEffect gặp set state data1-> gọi 
//lại hàm mới gán data1 thực sự-> render ra 2,1
//Khi dùng biến k là state-> nếu là const thì k đổi được giá trị luôn luôn fix; nếu là var thì nếu ta k gán giá trị ban
//đầu thì nó là undefined thì chả hiện gì cả, nếu ta gán giá trị ban đầu thì nó lại luôn fix vì mỗi lần render lại nó
//đều khởi tạo lại chạy vào hàm gán đó=> chỉ dùng biến k là state trong function khi gán nó bằng 1 hàm khác nếu k sẽ chỉ
//dùng như constant=> khi đó ta nên truyền vào như props or dùng useMemo
//Các biến k là state thì nó đổi sẽ k render lại và tạo mới mỗi lần chạy lại hàm, in nó ra sẽ k tự đổi
//Nếu ta gọi hàm set mà state var k đổi thì: sẽ k render. Nhưng trong react hook nó chắc chắn hơn bằng cách, nếu ta ấn 
//mà data k đổi lần đầu thì nó vẫn render lại và tiến hành lưu lại để check-> ta ấn các lần sau nếu vẫn k đổi thì sẽ k
//render lại-> rất tối ưu