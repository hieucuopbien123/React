// # Dùng các thư viện chức năng / Dùng react-transition-group 

const { CSSTransition, TransitionGroup, Transition } = ReactTransitionGroup;

class MyDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stateOfIn: true,
            message : ""
        };
    }

    onEnterHandler()  {
        this.setState({message: 'Begin Enter...'});
    }

    onEnteredHandler ()  {
        this.setState({message: 'OK Entered!'});
    }

    onEnteringHandler() {
        this.setState({message: 'Entering... (Wait timeout!)'});
    }

    onExitHandler() {
        this.setState({message: 'Begin Exit...'});
    }

    onExitingHandler() {
        this.setState({message: 'Exiting... (Wait timeout!)'});
    }

    onExitedHandler() {
        this.setState({message: 'OK Exited!'});
    }

    render()  {
        return (
            <div>
                <CSSTransition
                    // classNames="example"
                    classNames={{
                        appear: 'appear',
                        appearActive: 'appearActive',
                        appearDone: 'appearDone',
                        enter: 'example-enter',
                        enterActive: 'example-enterActive',
                        enterDone: 'appearDone',
                        exit: 'example-exit',
                        exitActive: 'example-exit-active',
                        exitDone: 'example-exit-done',
                    }}
                    in={this.state.stateOfIn}

                    // timeout = {{ enter: 1500 }}

                    onEnter = {() =>  this.onEnterHandler()}
                    onEntering = {() =>  this.onEnteringHandler()}
                    onEntered={() =>  this.onEnteredHandler()}

                    onExit={() =>  this.onExitHandler()}
                    onExiting={() =>  this.onExitingHandler()}
                    onExited={() =>  this.onExitedHandler()}

                    //cái này k xđ tg kết thúc nên cứ chạy
                    // addEndListener = {() => console.log("Running...")}
                    
                    //cái này là code mẫu xác định thời gian kết thúc trans thì exited/entered
                    addEndListener={(node, done) => {
                        // console.log(node);
                        // console.log(done);
                        node.addEventListener('transitionend', done, false);
                    }}
                    //Phân tích: Hàm addEventListener của js gán sự kiện vào 1 thẻ or 1 node nào đó. VD: document.addEventListener thì gán sự 
                    //kiện cho cái document của ta. 1 là event nào nó phát ra.VD: document.getElementById("button").addEventListener("click",
                    //<function>,) thì gán cho cái thẻ button đó sự kiện nào thì thực hiện function gì. 1 là tên sự kiện phát ra, thường là 
                    //bỏ on đi là đc. 2 là function làm gì, 3 là useCapture.
                    //VD khi ta click vào 1 thẻ thực hiện 1 event, thẻ cha của thẻ đó cũng có event click-> v nó sẽ thực hiện của con hay 
                    //của cha=> mặc định thì nó sẽ chạy các hàm event từ con đến cha, nó sẽ kiểm tra mọi cha của thẻ đó và thực hiện theo thứ
                    //tự. Cái đó gọi là bubbling hay xử lý theo kiểu nổi bọt từ thấp đến cao. Ngược lại là capturing tức là thực hiện từ cha
                    //đến con, nó sẽ tìm chạy các hàm sự kiện dần từ thẻ lớn nhất là <html> đến thẻ đó. Khi ta addEventListener đối số thứ 3 
                    //true or false chính là dùng capture hay bubbling đó. Hàm này cho phép ta thêm sự kiện vào 1 list nên nếu có cả sự kiện
                    //capture và bubbling thì nó sẽ thực hiện các sự kiện capture trước, các sự kiện bubbling sau vẫn theo đúng thứ tự
                    //Ở trên transitioned là sự kiện phát ra khi 1 thẻ chạy attribute, node ở trên là cái component này, done là hàm thực hiện
                    //phát signal exited và entered=> 2 đối số này là luôn có mặc định r
                    //tuy nhiên như thế nó chỉ xử lý exited chứ k xử lý entered nên vẫn cần enter timeout
                    appear
                >
                    {
                        (stateName)=>{
                            console.log(stateName);
                            return (
                            <div className ="my-div">
                                <ul>
                                    <li className ="my-highlight">Now 'in' = {String(this.state.stateOfIn)}</li>
                                    <li>  false --&gt; true (Enter)</li>
                                    <li>  true  --&gt; false (Exit)</li>
                                </ul>
                                <div className="my-message">{this.state.message}</div>
                            </div>
                            )
                        }
                    }
                </CSSTransition>

                <button onClick={() => {this.setState({ stateOfIn: true });}}>Set stateOfIn = true</button>
                <button onClick={() => {this.setState({ stateOfIn: false });}}>Set stateOfIn = false</button>
            </div>
        );
    }//CSSTransition là 1 TH riêng giúp làm vc với transition dễ hơn, TH tổng quát nên dùng Transition thôi
    //CSSTransition giống transition nhưng nó thêm 1 thuộc tính classNames="tên"
    //Thẻ wrap đầu tiên bên trong nó sẽ lần lượt được gán các class <tên-enter>/ <tên-enter>,<tên-enter-active>/
    //<tên-enter-done> tương úng 3 TT enter và tương tự với 3 trạng thái exit. 
    //Đó là mặc định.Cách 2 có thể truyền vào className 1 đối tượng nếu muốn rõ ràng khi nào thì có class nào
    //Dùng className chỉ đổi đc cho cả component chứ kp các component nhỏ bên trong
}
//Có thể thấy mấy cái in, timeout dùng trong component Transition, thật ra nó là props của component đó. Ta chỉ đơn
//giản gọi component Transition với props như v, còn các hàm như onEnter,.. là callback function của component.
//Mỗi lần render() nó phải tạo lại các component cực nhanh liên tục như v

ReactDOM.render(<MyDiv/>, document.getElementById('transition3'))

//Ngoài các thứ trong ví dụ còn: các props=> appear=true(false); mountOnEnter=true(false); enter(exit)=true(false);
//là vô hiệu hóa hay chạy tính năng enter/exit mặc định là true;
//Ví dụ ta set state ban đầu sang trạng thái enter xong gọi mountOnEnter thế thì mountOnEnter trở thành vô dụng-> nó sẽ
//bỏ qua mountOnEnter
//props: appear sẽ quyết định nếu lần load web đầu tiên có load component đó thì component đó có transition vào lần đầu k.
//Có appear tức có transition-> nó sẽ gọi entering -> entered, còn k thì nó chỉ có entered tức hiện luôn.
//lúc đó mỗi class nó sẽ tự động dùng class có tên gán cho object className là appear, appearDone, appearActive trong
//k tg enter/entering/entered lần đầu tiên thay cho class enter/enterActive/enterDone -> nó chỉ quản lý vc hiện lần đầu 
//tiên mà thôi. Nếu ta k gán 3 class appear thì nó coi như k có và coi như các component hiện bth. Thật ra nó tự tìm
//class trùng tên với appearDone để hiện ra, nó kiểu tìm mấy cái tên trùng ấy.
//Ở TH trên ta set trong css cho appearActive 5s mà enter có 1500 tức lúc appear lần đầu đang tăng từ 0->1 thì nó dừng lại
//vọt phát lên 0.5 luôn vì chưa hết 5s nhưng cái enter hết trc nó tự dừng enter và gán class mới vào luôn
//addEndListener = {<hàm>} cho phép thêm 1 hàm tự thực hiện khi bắt đầu qtr transition entering or exiting. Bth timeout
//là đk required để biết entering và exiting khi nào dừng nhưng nếu dùng hàm này thi k cần nx vì có thể dùng hàm này xđ
//bh thì dừng entering/exiting. Nếu hàm này k xác định or k có hàm này mà timeout cx k có thì sẽ duy trì vĩnh viễn 
//entering và exiting k bh kết thúc. Ta có thể dùng code mẫu để làm cho khi nào transition kết thúc thì tự exit như trên.
//dùng <TransitionGroup></TransitionGroup> bao ngoài 1 tập hợp các thẻ <Transition> or <CSSTransition> để quản lý, dùng 
//chung cho cả tập hợp các thuộc tính appear, enter, exit,..
//Trong TransitionGroup có thể dùng childFactory là 1 props ={function}, hàm này dùng khi muốn các con thay đổi sang 
//các thuộc tính mới. function nhận từng child và thg dùng hàm cloneElement của React để return ra element có props mới
//Hàm React.cloneElement(component muốn copy(required),(optional){1 object mới muốn lưu vào props},[...children] thay
//thế các children đã tồn tại)=> bỏ éo dùng Transition Group luôn

//Các hàm react khác: React.isValidElement(object) để check 1 element

//Transition tốt hơn CSSTransition vì ta có thể specific class từng phần tử bên trong chứ kp cả cục