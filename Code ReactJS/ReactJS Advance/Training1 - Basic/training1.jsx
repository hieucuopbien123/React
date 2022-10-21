// # Module react router dom / v5 / Basic

const PageA = (props) => {
    return (
        <div>
            This is content of page A!
        </div>
    )
}

const PageB = (props) => {
    return (
        <div>
            This is content of page B!
        </div>
    )
}

function PageC(props){
    var { match } = props;
    console.log("params: ", match.params);
    console.log("isExact: ", match.isExact);
    console.log("path: ", match.path);
    console.log("url: ", match.url);
    return (
        <div>Id: {match.params.id}</div>
    )
}

class ClassRouter extends React.Component{
    render(){
        return (
            <ReactRouterDOM.BrowserRouter>
                <div>
                    <ReactRouterDOM.NavLink exact to="/" activeClassName="routerSelected">
                        Page A
                    </ReactRouterDOM.NavLink>
                    <br />
                    <ReactRouterDOM.NavLink to={{
                        pathname:"/pageB",
                        search: "?sort=name",
                        hash: "#noHash",
                        state:{
                            title: "title of state"
                        }
                    }}>
                        Page B
                    </ReactRouterDOM.NavLink>
                    <br />
                    {/* dùng thẻ Link k dùng đc exact => dùng tùy TH */}
                    <ReactRouterDOM.Link to="/post/1" >
                        Page with id 1
                    </ReactRouterDOM.Link>
                    <br />
                    <ReactRouterDOM.NavLink exact to="/post/2" activeClassName="routerSelected">
                        Page with id 2
                    </ReactRouterDOM.NavLink>
                    <br />
                    <ReactRouterDOM.NavLink exact to="/redirect" activeClassName="routerSelected">
                        Redirect to PageA
                    </ReactRouterDOM.NavLink>
                    <ReactRouterDOM.Switch>
                        <ReactRouterDOM.Route exact path="/" component={PageA}/>
                        <ReactRouterDOM.Route path="/pageB" children={() => {
                            return (
                                <div>
                                    Here is page B
                                </div>
                            )
                        }}/>
                        <ReactRouterDOM.Route path="/post/:id" component={PageC}/>
                        <ReactRouterDOM.Route exact path="/redirect" children={() => {
                            return (
                                <ReactRouterDOM.Redirect to="/"/>
                            )
                        }}/>
                        {/* chú ý đây kp là cách chuẩn dùng redirect vì khác gì ấn link đâu */}
                    </ReactRouterDOM.Switch>
                </div>
            </ReactRouterDOM.BrowserRouter>
        )
    }
}
ReactDOM.render(<ClassRouter />, document.getElementById("seventh"));

// # Module redux (bỏ bản cũ)
class ClassRedux extends React.Component{
    constructor(props){
        super(props);
        this.bindAction = Redux.bindActionCreators(this.props.onAddNumber,this.props.dispatch);
    }
    handleEvent = (number) => {
        this.bindAction(number);
    }
    handleEvent1 = (number) => {
        this.props.onAddNumber1(number);
    }
    render(){
        var number = this.props.number;
        return(
            <div>
                <h3>Number: {number} </h3>
                <button onClick={this.handleEvent.bind(null, number)}>Increase number</button>
                <button onClick={this.handleEvent1.bind(null, number)}>Increase number</button>
            </div>
        )
    }//bind null là this trong hàm là mặc định class. Nếu TH nào đó mặc định là k có thì undefine thôi
    //null là lấy mặc định chứ kp dùng this là null nhé
}
const reducer = (state = {number: 2}, action) => {
    console.log("Type: ", action.type);
    console.log("reducer is working with state: ", state.number);
    var res = state.number;
    switch(action.type){
        case "ADD_NUMBER":
            res = action.number + 1;
    }
    console.log("reducer is working with state: ", res);
    return {number: res};
}
const reducer1 = (state = {number: 2}, action) => {
    console.log("reducer1 is working with state: ", state.number);
    var res = state.number;
    switch(action.type){
        case "ADD_NUMBER1":
            res = action.number + 1;
            break;
    }
    console.log("reducer1 is working with state: ", res);
    return {number: res};
}
//vấn đề căng: trong TH này thì state.number và action number khác gì nhau. Ta hiểu các state của các reducer là độc lập
//với nhau, cho là store nó lưu theo từng ngăn, mỗi ngăn là 1 reducer state khác nhau. Ta phải chắc chắn return default
//luôn là return state; để lúc nào cx lấy nó đúng. Ở TH này action.number là number ta truyền đi, là number đang dùng
//trong object. Còn state là number mà ta lưu trong store. Khi có một hành động bắt ra thì cả 2 reducer đều bắt, reducer
//nào có đúng type thì thực hiện, reducer khác type thì return default là state.number
//Ví dụ ta chạy ADD_NUMBER liên tục, làm cho number ở trong class tăng lên, xong lại chạy ADĐ_NUMBER1 1 phát thì 
//sẽ xuất hiện action.number hiện là 1 số rất lớn, nhưng state.number lai là 1 số rất nhỏ ban đầu=> state nó k liên quan
//j đến dữ liệu hiện tại ta chuyển đi nên ta phải chủ động cập nhập lại nó tất cả trong suốt quá trình. Khi đó nếu ta
//thao tác với số rất lớn action.number tạo ra 1 số rất lớn thì vòng sau state cập nhập từ số bé lên số lơn luôn
//Ta hiểu hết bản chất thì ok r, nhưng nếu xảy ra điều như v thì rất khó kiểm soát. Ta phải luôn đảm bảo phải return liên
//quan đến state và cái state phải luôn bắt kịp với tiến độ hiện tại.
//=> Do đó ta nên: nếu thực hiện 1 action mà gây ảnh hưởng đến state của 1 reducer khác thì nên để nó bắt và cập nhập 
//state để luôn đúng với tiến trình. Tức là dữ liệu return của 2 reducer bị xung đột nhau hay kỹ hơn là action A được
//reducer A thực hiện nhưng thực hiện xong thì ảnh hưởng đến dữ liệu trong state của reducer B và nó cần được cập nhập
//lúc đó ta có thể cho cả reducer B bắt và return để cập nhập->nhưng nếu mapStateToProps của reducerB éo cần cập nhập
//thì lại k mong muốn 
//=> Tốt nhất nên tránh điều đó xảy ra. 1 component thì 1 reducer và k có chuyện ông A thực hiện ảnh hưởng state ông B
//=> tách reducer phải hợp lý
var reducerAll = Redux.combineReducers({
    reducer, reducer1
})
var mapStateToProps = (state, ownProps) => {
    return state.reducer;
}
var addNumber = number => ({
    type: "ADD_NUMBER",
    number: number
})
var addNumber1 = number => ({
    type: "ADD_NUMBER1",
    number: number
})
var mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddNumber: (number) => { dispatch(addNumber(number)) },
        onAddNumber1: (number) => { dispatch(addNumber1(number)) }
    }
}
var logger = (temp) => {
    var { getState } = temp;
    return next => action => {
        next(action);
        console.log(getState());
    }
} 
var middleware = Redux.applyMiddleware(logger);
var store = Redux.createStore(reducerAll, { reducer: {number: 0} }, Redux.compose(middleware));
var mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, stateProps, dispatchProps, ownProps);
}
const ReduxComp = ReactRedux.connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClassRedux);
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReduxComp ownProps="Hello"/>
    </ReactRedux.Provider>,
    document.getElementById("eighth")
);
store.dispatch({type: "INIT", number: 0});

// # Module Bootstrap
class BootstrapClass extends React.Component{
    render(){
        return(
            <ReactBootstrap.Container fluid>
                
                <ReactBootstrap.Card className="m-2 w-50 justify-content-center text-center">
                    <ReactBootstrap.Card.Img variant="top" src="https://picsum.photos/200/50"></ReactBootstrap.Card.Img>
                    <ReactBootstrap.Card.Title>
                        This is title of card
                    </ReactBootstrap.Card.Title>
                    <ReactBootstrap.Card.Subtitle>
                        This is subtitle
                    </ReactBootstrap.Card.Subtitle>
                    <ReactBootstrap.Card.Text>
                        This must be text of the card
                    </ReactBootstrap.Card.Text>
                </ReactBootstrap.Card>

                <ReactBootstrap.Breadcrumb className="w-30">
                    <ReactBootstrap.Breadcrumb.Item>First</ReactBootstrap.Breadcrumb.Item>
                    <ReactBootstrap.Breadcrumb.Item active>Second</ReactBootstrap.Breadcrumb.Item>
                    <ReactBootstrap.Breadcrumb.Item>Third</ReactBootstrap.Breadcrumb.Item>
                </ReactBootstrap.Breadcrumb>

                <ReactBootstrap.Form>
                    <ReactBootstrap.FormGroup controlId="form">
                        <ReactBootstrap.Row>
                            <ReactBootstrap.Form.Label tag="h3" className="h-75 mb-0 pt-1">
                                Label:
                            </ReactBootstrap.Form.Label>
                            <ReactBootstrap.Col>
                                <ReactBootstrap.FormControl type="email" placeholder="Placeholder text">
                                </ReactBootstrap.FormControl>
                                <ReactBootstrap.Form.Text className="text-muted">
                                    Text of form control input
                                </ReactBootstrap.Form.Text>
                            </ReactBootstrap.Col>
                            <ReactBootstrap.Button variant="outline-secondary" type="submit" className="h-50"> Submit </ReactBootstrap.Button>
                        </ReactBootstrap.Row>
                    </ReactBootstrap.FormGroup>
                </ReactBootstrap.Form>
                {/* form dùng dạng mẫu có sẵn toàn bị mỗi dòng 1 thứ label,input,button. Nếu muốn khác phải tự
                custom nó or chỉnh sửa. ở trên lồng row vào thì nó ép sang ngang */}

                <ReactBootstrap.Alert variant="success" className="w-75">
                    Content of alert
                </ReactBootstrap.Alert>

            </ReactBootstrap.Container>
        )
    }
}
ReactDOM.render(<BootstrapClass />, document.getElementById("ninth"));