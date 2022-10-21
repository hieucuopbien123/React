// # Thao tác với thẻ con

class Panel extends React.Component {
    render() {
        console.log(this.props.children);
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.children}</div>
            </div>
        );
        //Tương tự trong function component có hết chỉ cần bỏ this đi
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

//ReactDOM.render( <Content />, document.getElementById("training2") );
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
            //     isPlaying: child.props.title === currentPlayingTitle,
            //     className: "some-component-special-class"
            // })
            console.log(child.type.name.toString())
            return (
                <div className="some-component-special-class" style={{color:"red"}}>{child}</div> 
            );
        });
        //ít dùng vì dù có isPlaying: true r thì cx chả có ích gì trong này nx. Ta thg dùng tạo ra các thẻ có sự thay
        //đổi đi 1 chút thì hơn, ví dụ class thay đổi. Ta đơn giản là k đổi con mà chỉ thêm 1 thẻ div có style mong muốn
        //bao ngoài con mà thôi
        //chú ý là bị hạn cế ví dụ k đổi đc text của các con chẳng hạn. Đó là do ta cho các children tĩnh thôi
        //Ta có thể thêm vào props của các child con các thứ như isPlaying, text hiển thị cũng có thể truyền vào props
        //được thì child có thể điều khiển mọi thứ từ cha.
        //Nhưng giả sử ta k muốn chỉnh sửa child mà vẫn muốn nó thay đổi cơ vì ta muốn tái sử dụng Parent ở nhiều nơi
        //Khi đó vấn đề nằm ở cấu trúc parent child của ta có vấn đề, ta có thể fix lại cho nó dễ hơn. Nếu k react vẫn
        //có thể thực hiện được bằng cloneElement để tạo ra child mới từ child cũ có thêm thuộc tính ra và điều khiển 
        //nó bằng các hàm của react nhưng chác chắn rất phức tạp=> tuyệt đối k hđi hướng này mà nên chỉnh structure
        //Nếu muốn đổi style thì được chứ đổi content text cụ thể thì k
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

//nói chung là có hàm React.Children... nhiều tính năng giúp lấy và làm gì đo với children ở cha