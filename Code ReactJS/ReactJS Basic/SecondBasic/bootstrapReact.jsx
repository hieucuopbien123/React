// # Module Bootstrap
class Test extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="btn-group">
                <button className="btn btn-primary">Nút 1</button>
                <button className="btn btn-danger dropdown-toggle dropdown-toggle-split" 
                data-toggle="dropdown"></button>
                <div className="dropdown-menu dropdown-menu-right">
                    <a href="#" className="dropdown-item">Content 1</a>
                    <div className="dropdown-divider"></div>
                    <a href="#" className="dropdown-item">Content 2</a>
                </div>
            </div>
        )
    }
    //dùng như bth bằng cách chuyển từ html sang jsx thôi, bootstrap chỉ là thêm thẻ và class cho giao diện đẹp lên thôi
}
ReactDOM.render(<Test />, document.getElementById("testJsBootstrap"))