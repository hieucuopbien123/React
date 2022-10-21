// # Basic / K nên dùng code React thuần

//file jsx chứa code react/JSX/javascript
//with JSX=> class k viết truyền props nhưng tự hiểu là có truyền vào còn function bth buộc phải truyền
class PersonJSX extends React.Component {
    //2 cách dùng hàm và dùng class của JS ES6. Dùng class thì phải kế thừa class React.Component và tạo component
    //thông qua hàm render()
    render() {//còn lại tương tự nhưng phải thêm this
        return (
            <div className="person-info">
                <h3>Person {this.props.personNo}:</h3>
                <ul>
                    <li>First Name: {this.props.firstName}</li>
                    <li>Last Name: {this.props.lastName}</li>
                </ul>
            </div>
        );
    }
}
const element1 = document.getElementById('person1')
const element2 = document.getElementById('person2')
const element3 = document.getElementById('personDefault')
ReactDOM.render(
    <PersonJSX personNo='1' firstName='Bill' lastName='Gates' />, element1
)

//Without JSX->compicated!!
class PersonWithoutJSX extends React.Component{
    render() {
        var h3Element = React.createElement("h3", null, 'Person ' + this.props.personNo);

        var ulElement = React.createElement("ul", null, [
            React.createElement("li", null, "First Name: " + this.props.firstName),
            React.createElement("li", null, "Last Name: " + this.props.lastName)
        ]);//khi tạo mảng 2 phần tử là children

        var e = React.createElement("div", {
            class: 'person-info'
        }, [h3Element, ulElement]);//vẫn luôn phải có 1 thẻ bao ngoài 
        return e;
    }//React.createElement(<tên tag>, <attribute>, [mảng các con]/string nếu chỉ có text node)
}
PersonWithoutJSX.defaultProps = {//thay thế getDefaultProps ở bản cũ
    personNo: '0',
    firstName: "Nguyen",
    lastName: "Nam"
}
ReactDOM.render(
    <PersonWithoutJSX personNo='2' firstName='Donald' lastName='Trump' />, element2
)
ReactDOM.render(
    <PersonWithoutJSX />, element2
)