// # Module redux (bỏ) / Dùng redux thuần

console.log("1");

class Test extends React.Component {
    constructor (props) {
        super(props);
        console.log("9");
        this.state = {
            age: 10
        }
        this.boundActionCreators = Redux.bindActionCreators(this.props.onAddNumber, this.props.dispatch);
        //chú ý các function đi với this thì là 1 tp và dùng đc ở ngoài, k đi với this thì k dùng đc ở ngoài. Nhưng các hàm ở ngoài sẽ 
        //dùng được ở mọi nơi(trù constructor thì phải bind)
        //Ta có thể var <actionCreators var>=Redux.bindActionCreators({object tập hợp các hàm},<dispatch>);
        //lúc này <actionCreators var> là tập hợp các action creator có thể truyền làm return hàm mapDispatchToProps
        //Điều đặc biệt là nó thường bind ở ngoài hay bind ở 1 file khác phân cấp thư mục
    }

    //xử lý các hàm sự kiện bên dưới, dùng dữ kiện về thông tin phần tử thay đổi để tạo ra 1 biến action. Buộc có tp 1 là type
    //2 là data nếu cần, nhiều data thì gom 1 object. dispatch cái action với dispatch là hàm có sẵn trong props của class r
    // handleEvent = (data) => {
    //     console.log("8");
    //     var action = {
    //         type: 'EVENT1',
    //         data: data
    //     }
    //     console.log(this);
    //     this.props.dispatch(action);
    // }
    

    handleEvent = (data) => {
        console.log("10");
        this.props.onAddNumber(data);
        // this.boundActionCreators();/or dùng
    }

    render () {
        //viết code hiển thị component. Giả sử đã có dữ kiện trả về trong props r, ta dùng nó để viết code tạo giao diện từ những dữ liệu đó
        //có sự kiện làm thay đổi giao diện thì gọi vào các hàm, nhớ truyền mọi đối số cần thiết tối thiểu để lấy các thông tin từ giao diện 
        //đó cần cho vc thay đổi. VD: muốn xóa 1 phần tử trong list thì truyền id của phần tử đó là đủ chẳng hạn
        var number = this.props.number;
        console.log("11");
        return (
            <div>
                {number} + {this.props.job}
                {/* ta coi cái này nó là class tạo bởi connect luôn và dùng bth vì vào thời điểm render cái này
                biến đã đc tạo rôi */}
                <button onClick={this.handleEvent.bind(null, number)}>Test</button>
            </div>
        )
    }//truyền null vào bind thì mặc định this trong hàm sẽ theo chính nó ban đầu là class này, truyền this thì sẽ dùng this vẫn là chính nó
    //ở đây truyền null thể hiện rằng ta k cần dùng cái this ở chỗ khác để truyền đc number vào, chả có j qtr
}

console.log("2");
//khai báo biến ngoài nếu cần sử dụng, các hàm ở ngoài nếu cần tấch, sử dụng
var counter = 0;
function increaseCounter(){
    counter++;
}

//1 reducer xử lý action
const reducer = (/*biến lưu giá trị props ban đầu của component gọi là old state của component, biến action gửi đến từ lúc trước */ 
    state = 1,action) =>//dùng = 1 là sai nhé, phải là {number: 1}
{
    //copy cái biến props ban đầu của ứng dụng ra và từ h thao tác trên nó để đổi nó thành các giá trị mới cần thiết để cập nhật lại giá trị
    //này cho ứng dụng về sau
    let copyState = state.number;
    console.log("12");
    console.log(state);
    console.log(action);

    //switch type cái action để xử lý từng sự kiện một. Sử dụng biến dữ liệu ban đầu lúc chưa đổi(biến copy), thông tin từ biến action(đối số 2),
    //biến ngoài hay bất cứ các hàm gì bên ngoài ta tách ra thoải mái đều sử dụng đc ở đây để đổi cái biến vừa copy thành ý ta
    switch(action.type)
    {
        case 'EVENT1': 
            increaseCounter();
            copyState += counter;
            break;
        case 'EVENT2': 
            increaseCounter();
            copyState -= 1;
            break;
    }

    //return biến sau khi đổi, nhớ convert về đúng dạng giá trị ban đầu của component

    return { number: copyState };//buộc phải return {}-> kể cả dùng return <biến object> cx sai mà bắt buộc có {}
}
//Ở hàm trên chú ý 1 thứ là ta phải xác định 1 thứ lưu tất cả các thứ sẽ thay đổi trong component và gom nó thành 1 kiểu object-> đối số 1
//truyền vào và return bắt buộc phải là 1 object or 1 mảng

console.log("3");
//store hàm độc nhất dùng 1 lần là nơi lưu trữ
// let store = Redux.createStore(/*biến reducer return giá trị sau khi thay đổi bên trên, 
//                                 giá trị ban đầu cho thứ thay đổi trong component đúng type mà ta nói bên trên,
//                                 third-party middleware */
//                                 reducer, { number: 1 },  window.devToolsExtension ? window.devToolsExtension() : undefined);
function logger(helo) {
    var { getState } = helo;
    console.log(helo);
    return next => action => {
        console.log('will dispatch', action)
        const returnValue = next(action)
        console.log('state after dispatch', getState())
        return returnValue
    }
}
//hàm của đối số middleware có dạng: function middleware({ getState }) => (next) => (action) => next(action)
let store = Redux.createStore(reducer, { number: 1 },  Redux.applyMiddleware(logger))
console.log("4");

const mapStateToProps = (/*biến lưu giá trị thay đổi của component nhưng là sau khi thay đổi rồi*/ state,ownProps) => {
    //hàm trả về giá trị là props của component sau khi thay đổi nhờ biến sau khi thay đổi(truyền vào)
    //Ví dụ return { a: "10"} thì props là 1 object có thuộc tính a là 10
    console.log("13");
    console.log("ownProps: ", ownProps);
    return { number: state.number };
}
console.log("5");

const addNumber = number => ({
    type: 'EVENT1',
    data: number
})
const addNumber1 = number => ({
    type: 'EVENT2',
    data: number
})

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log("14");
    console.log(ownProps);//đối số 2 là ownProps là props truyền vào cho component sinh ra bởi hàm connect. Props của 
    //component sinh bởi connect sẽ đè lên props của class ban đầu nếu trùng. OwnProps chỉ lưu props của component
    //sinh bởi connect, k lưu props class ban đầu, dùng khi cần sử dụng đến nó để kết hợp data từ store trả ra props
    //cả 2 hàm map đều có. Hàm mapDispatchToProps chỉ gọi 1 lần để lưu những cái bên dưới vào class, nhưng nếu ownProps
    //truyền vào nó thay đổi thì hàm này sẽ gọi lại lần nx. Tái sử dụng nếu đc
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)); },
        dispatch
        //truyền lại dispatch vào thì vẫn dùng đc dispatch thủ công trong class nhưng chả ai làm thế, nên tách ra
    }
}
console.log("6");
//hàm có vai trò tạo ra 1 component mới có tính chất của redux dựa trên component cũ và hàm ánh xạ giá trị
const /*tên component redux*/ TestRedux = ReactRedux.connect ( /*tên hàm mapStateToProps */ mapStateToProps,
    /*tên hàm mapDispatchToProps*/mapDispatchToProps)(/*tên component react*/ Test);

//đối số 2 của connect là hàm mapDispatchToProps, có 2 cách dispatch action: component tự dispatch với hàm nằm trong props của nó dispatch();
//cách 2 là tự tạo 1 hàm mapDispatchToProps và truyền vào connect nó sẽ gửi hàm này thành 1 thành phần của props của component và dùng hàm này
//chủ động thay cho dispatch bth. Hàm này có 2 dạng: function và object
//Khai báo dạng function thì nhận 1 là hàm dispatch, 2 là ownProps(optional). khi dùng đối số 2 thì nó là props truyền vào component. Nó đc goi
//lại mỗi khi component nhận props mới. Nếu k có đối số thứ 2, hàm này sẽ chỉ gọi truyền vào compnent 1 lần ! .Hàm này buộc trả về 1 object. VD:
// const increment = (ownProps) => ({ type: 'INCREMENT', ...ownProps })
// const decrement = () => ({ type: 'DECREMENT' })
// const reset = () => ({ type: 'RESET' })
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         // dispatching actions returned by action creators
//         increment: () => dispatch(increment(ownProps)),
//         decrement: () => dispatch(decrement()),
//         reset: () => dispatch(reset()),
//     }
// }
// //cách 2 là dùng như 1 object. Nên dùng cách này trừ khi có TH ta có nhu cầu thay đổi hành động dispatch(theo ownProps)
// const actionCreators = {//đặt tên khác thôi
//     increment,//là actionCreator được tạo từ bindActionCreator rồi
//     decrement,
//     reset,
// }
//và ng ta thường import 3 biến kia từ file khác vào để nó là hằng số phân loại với các type khác nhau
//ng ta cx thg export default connect(mapState, actionCreators)(Counter) kiểu thành 1 object dùng trong hàm khác luôn
//TypeError: this.props.dispatch is not a function là 1 lỗi thg gặp xảy ra khi gọi mapDispatchToProps nhưng dispatch k đc đưa vào component
//Dispatch chỉ đc đưa vào props của component khi: k truyền mapDispatchToProps vào connect; return hàm mapDispatchToProps lại chứa dispatch.

//TK: mapDispatchToProps. ta có thể dùng 2 dạng function và object
//return bindActionCreator(<1 hàm or 1 object nhiều hàm >, <dispatch>);
//return { dispatch, <các hàm khác gọi dispatch>}
//return {dispatch, ...bindActionCreator(<tương tự>)} =>tức nếu kèm cả hàm + bindActionCreator thì phải thêm 3 chấm
// = { <các action creators> }
//action creator ví dụ: a: ()=> ({type:add,}); là 1 action creator-> k có dispatch nhé

console.log("7");
ReactDOM.render(//ReactRedux.Provider là view framework hiển thị dữ liệu cung cấp bởi store
    <ReactRedux.Provider store={store} name={console.log("15")}>
    {/*biến component redux, có thể console ở 1 attribute để kiểm tra đã render ra nó chưa */}
    {/* chú ý là trong provider cũng chỉ đc có 1 thẻ duy nhất */}
    <TestRedux job="100"/>
    </ReactRedux.Provider>,
    document.getElementById('redux')
);
// store.dispatch({
//     type: 'EVENT1',
//     data: 10
// })
let boundActionCreators = Redux.bindActionCreators(addNumber, store.dispatch)//đối số thứ 2 phải tồn tại, rất may là store là global nên ok
boundActionCreators();

console.log("8");
console.log(store);

//Luồng react file này: chạy từ trên xuống bth gặp khai báo k thực hiện cho đến khi gặp createStore nó truyền vào reducer nên chạy hàm 
//reducer->đi tiếp gặp render() -> render Provider lên nhiệt tình vì có store r-> render TestRedux -> quay lên kiểm tra xem tồn tại component
//TestRedux k thì phải thực hiện connect-> thực hiện mapStateToProps để lấy cái state mặc định trong store-> thực hiện mapDispatchToProps
//truyền vào props của Test hàm onAddNumber và return ra 1 component y hệt class Test nhưng props lại có 2 thuộc tính đó-> đó chính là TestRedux
//và render nó lên màn hình. Điều này tức cái thứ ta render lên màn hình là TestRedux được tạo bởi connect chứ kp là Test, Test nó là 1 class 
//giống y hệt TestRedux mà thôi. Bh ta click vào sự kiện thì nó sẽ xử lý event của ta, gọi vào hàm onAddNumber với đối số, hàm này được truyền 
//vào props thây, nó sẽ khởi tạo rồi dispatch cái action của ta-> dispatch thì nó đi ra lần lượt các thẻ lớn hơn chờ bắt cái action đó thì 
//gặp thẻ Provider có store lưu cái reducer sẽ xử lý cái action + props cũ truyền từ mapStateToProps trả ra 1 object mới-> xong cái thẻ của ta 
//sẽ gọi mapStateToProps để truyền Object đó vào props và thực hiện render. Nếu tiếp tục bấm sẽ thực hiện tương tự: xử lý event->dispatch action
//reducer xử lý action và props cũ cho ra object mới-> lại mapStateToProps nhét vào TestRedux(mapDispatchToProps chỉ định nghĩa và thực hiện 1 
//lần thôi)-> trước khi dispatch đi nó cũng chạy vào middleware nx

//Phân chia file: (components) sẽ lưu các thứ hiển thị với giao diện, ở đây là class Test; (actions) sẽ lưu các hành động xử lý từ cái data 
//truyền vào; (containers) sẽ mapStateToProps và mapDispatchToProps r thực hiện connect để đưa nó vào trong props của class; (reducer) là nơi 
//xử lý hành động và props cũ, trả ra 1 props mới. Bh ta đã phân chia file xong để hiển thị thì ta chỉ cần store lưu reducer, thẻ lưu 2 hàm map
//vào props của class bằng hàm connect là xong=> (App.js) lấy class đã được connect ở container và render lên; (index.js) tạo store và render 
//cái thứ trong app qua Provider store.

//-Ngoài ra còn có các hàm: combineReducers({object các reducers}). Reducer là thứ định nghĩa các hàm xử lý các action lưu vào 1 store. Giả sử 
//có 2 class có các props và hàm khác nhau được truyền từ 2 hàm mapStateToProps và mapDispatchToProps. Như v mỗi class có 1 container khác nhau 
//nhưng tất cả chung 1 reducer switch case xử lý từng function-> và reducer đó lưu vào chung 1 store. Tuy nhiên đấy là với cùng 1 nhóm các 
//actions thôi. Nếu nhiều hàm quá thì ta k thể cứ 1 ông reducer switch case hoài đc->tách ra nhiều file reducer khác nhau rồi hợp lại bằng hàm
//combineReducers-> chỉ cần import mỗi file này lưu vào store thôi chứ kp import từng reducer lưu vào store nx.
//- store.dispatch(); store sau khi tạo ra thì có thể dispatch 1 action(cx chỉ là dispatch 1 object). Thật ra store và mọi object gọi connect
//đều có hàm dispatch(với điều kiện k truyền đối số mapDispatchToProps or truyền đối sô phải gọi hàm dispatch). Và cứ gọi thì nó vẫn làm như bth
//đi lên trên xem có ông reducer nào bắt action này k, nếu store gọi thì chính reducer của store đó bắt actions luôn và thực hiện 1 lần thôi

//Hàm ảo diệu ở đây là mapStateToProps: ta biết cơ chế của store là có sự kiện thì nó sẽ phân phát lại toàn bộ dữ liệu vào bên trong các thẻ
//bị bao bởi cặp thẻ Provider, nhờ cơ chế đó mà k truyền props từ cha sang con phức tạp. Và các thẻ bắt nó bằng mapStateToProps và tiến hành 
//render lại. Thế chẳng nhẽ trong cùng 1 thẻ Provider có 1 store thì reducer của store chạy thì tất cả các component đều dùng mapStateToProps
//để cập nhập lại và render lại hết. Rất đúng nhưng vấn đề là chả sao hết. Bởi vì chỉ hàm nào chạy mapStateToProps thì nó mới bắt và thấy props
//đc set nó mới thực hiện component liftcycle và render lại. Chính vì v dữ liệu thay đổi ở hàm nào thì ta mới cần mapStateToProps chứ thực hiện
//action k đổi dữ liệu thì mapDispatchToProps là đc r còn đối số kia để null-> k có mapStateToProps component sẽ kbh render lại nên k lo.

//Liệu có xảy ra xung đột: có vì cứ thay đổi là nó bổ vào mapStateToProps ngay. Thành ra đối số truyền vào mapStateToProps là cái reducer nó
//return mà với mỗi action khác nhau nó lại return bao nhiêu thứ. 
//TH1: trong cùng component-> cùng 1 component thì tên thuộc tính ắt phải khác nhau ta return 1 object truyền vào thì ok
//hết. Kiểu 1 1 thuộc tính của props thay đổi mà ta phải set lại toàn bộ props component-> ok hết k ảnh hưởng nhiều vì 1 
//component thì đằng nào chả đc
//TH2: khác component ok luôn

//Hàm bindActionCreators(actionCreators, dispatch)=> Hàm mapDispatchToProps có 2 dạng 1 là func, 2 là object. Nếu là obj thì các phần tử bên
//trong chính là actionCreator và có thể truyền làm đối số 1 hàm này(actionCreator là biến hàm trả ra 1 action thôi). Hàm này chỉ đơn giản là 
//bind cái hàm dispatch vào 1 biến mà thôi. Ở trên ta bind vào biến test và gọi nó, bind là gắn vào 1 biến và dùng biến nó sau này. Dùng 
//store.dispatch thoải mái, nch là hàm này khá vô dụng. Trừ khi ta muốn dispatch ở phần code kp là redux thì khi đó nó mới công hiệu