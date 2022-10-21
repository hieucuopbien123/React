// # Basic / Dùng Fragment

class UL extends React.Component {
    render() {
        return (
            <ul>
                <LI /> 
            </ul>
        );
    }
}
class LI extends React.Component {
    render() {
        return (
            <React.Fragment>
                <li>Hello</li>
                <li>World</li>
            </React.Fragment>
        );
    }
}
/*
Trong nh TH ta cần bao tất cả các tag bên trong 1 tag nào đó, thg ta dùng div nhưng html khi cho div vào nó phá vỡ
cấu trúc ta muôn hiển thị vì nó là 1 block tag chiếm 1 dòng. Để fix điều đó ta dùng React.Fragment
C1:
<React.Fragment key={<id>}>
    //content
</React.Fragment>
C2:
<>
    //content
</>
=> C2 là cách viết gọn của React.Fragment nhưng 1 số trình duyệt nó éo chạy được nên dùng C1 hơn. C1 dùng đc key khi hiển
thị dạng list, C2 thì k
*/
ReactDOM.render(<UL />, document.getElementById("fragment"));