class Panel extends React.Component {
    render() {
        console.log(this.props.children);
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.children}</div>
            </div>
        );
    }
}
//nhờ có this.props.children mà nó làm cho code của ta ở dưới nó ez hơn, chứ kp lưu 4 cái thẻ div lại thành 1 biến
//r truyền vào thành props của Panel. Cứ như v Panel tái sử dụng vô số nơi thì props nó lớn tới mức nào
//Ở đây nó cho phép truy cập vào các thẻ con của component này. Dùng hai nơi khác nhau thì thẻ con khác nhau nhưng
//dùng và thao tác chung 1 biến hết. Đổi props children thì cái thẻ thật cx đổi
class Content extends React.Component {
    render() {
        return (
            <Panel title="Browse for movies">
                <div>Movie stuff...</div>
                <div>Movie stuff...</div>
            </Panel>
        )
    }
}
//this.props.children có thể có 1 child, nh child, 0 child-> 1 node, 1 array node, undefined. Nh lúc ta muốn với mỗi
//child ta thêm các thuộc tính or chỉnh sửa gì đó mới render lên chứ k đơn giản như ví dụ trên thì this.props.children
//k đáp ứng đc điều đó. Ví dụ có 1 child thì k map đc và dữ liệu props k thể đổi.
//=>React cung API cho phép ta thao tác qua các children với React.Children chứa các hàm ánh xạ
//Tương tự còn có:count đếm số ptu, only(kiểm tra 1 react element thì return nó) 
//toArray chuyển sang array và mỗi phần tử sẽ có 1 key riêng
//forEach cũng như map nhưng k return array và ốp đổi luôn mảng
//cloneElement(ele,props,children) cũng như là <element {...element.props} {...props}>{children}</element> bằng jsx

// ReactDOM.render( <Content />, document.getElementById("training2") );
//khi ta cho thẻ lồng thẻ thì cái thẻ cha phải phụ trách việc render thẻ con. Bth các thẻ như thẻ div làm thẻ cha thì
//nó đơn giản là return children luôn nên ms vậy.Ví dụ ta k cho in thẻ con trong thẻ cha thì con sẽ k hiện ra 


class Test extends React.Component {
    render() {
        return (
            <MovieBrowser>
                <Panel title="Mad Max: Fury Road" />
                <Panel title="Harry Potter & The Goblet Of Fire" />
            </MovieBrowser>
        )
    }
}
//Đặt vấn đề ta có render ra cái trên nhưng ta muốn thêm thuộc tính là bộ phim Mad Max đang được chiếu tức isPlaying
//là true nhưng kiểu dùng bất cứ MovieBrowser ở đâu cứ có con nào đó có title là Mad Max thì thuộc tính này phải đc gán
//thêm thuộc tính, chỉnh sửa text hiển thị, chỉnh màu,..
class MovieBrowser extends React.Component {
    render() {
        const currentPlayingTitle = 'Mad Max: Fury Road';
        const childrenWithExtraProp = React.Children.map(this.props.children, child => {
            // return React.cloneElement(child, {
            //     isPlaying: child.props.title === currentPlayingTitle
            // }
            return (
                <div className="some-component-special-class" style={{color:"red"}}>{child}</div> 
            );
        });
        //ít dùng vì dù có isPlaying : true r thì cx chả có ích gì trong này nx. Ta thg dùng tạo ra các thẻ có sự thay
        //đổi đi 1 chút thì hơn, ví dụ class thay đổi
        //chú ý là bị hạn chế ví dụ k đổi đc text của các con chẳng hạn
        console.log(childrenWithExtraProp);
        console.log(this.props.children);
        //mở debug ra mà chỉnh thuộc tính
        return (
            <div>
                {childrenWithExtraProp}
            </div>      
        );
    }
}
ReactDOM.render( <Test />, document.getElementById("training2") );