function ArrayToList(props) {
    const numbersArray = props.numbers;
    const numberList = numbersArray.map((number,index) => {
        return (
            <li key={index}>
                {number * 3}
            </li>
        )
    })//map trong React có thể biến đối thành component. map bth nhận 2 đối số, 1 là function(currentValue, index, arr)
    //2 là thisvalue, với index là số thứ tự của currentValue trong arr, là optional thg bỏ qua
    //mỗi phần tử trong list luôn phải có 1 key duy nhất (đính vào li) để quản lý vc thay đổi ptu nào trong list. Ta
    //nên có 1 id xác định cho mỗi phần tử trong arr. TH bí quá mới phải dùng đến index vì index của mỗi phần tử
    //trong arr luôn là duy nhất nhưng dùng như v có thể dẫn đến sai lầm về sau. Bên trên là VD dùng index
    console.log(numberList);
    return (
        <ul>
            {numberList}
        </ul>
    )
    //quy trình: truyền mảng vào component-> map object đó để tạo ra list của ta và phải có
    //key lưu vào 1 biến-> render biến đó với {}
}
const numbers = [1,2,3,4,5];
ReactDOM.render( <ArrayToList numbers={numbers} /> , document.getElementById("arrayToList") )
//có thể truyền biến vào props của 1 component từ ngoài vào bằng dấu {}

// function ListItem(props) {
//     const value = props.value;
//     return (
//       /* Sai: không cần key ở đây */
//         <li key={value.toString()}>
//         {value}
//         </li>
//     );
// };
// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//       /* Sai: key nên được sử dụng ở đây: */
//       <ListItem value={number * 2} />
//     );
//     return (
//         <ul>
//         {listItems}
//         </ul>
//     );
// };
// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );
//Trap: ta chỉ SỬ DỤNG đc key trong phạm vi component có mảng đang sử dụng.Nếu truyền key cho component mà phần tử đó
//k có mảng đang xét thì k hiển thị đâu. VD ở trên: ta thích tạo ra ListItem chứa key cơ, thế thì k đc dùng key ở
//ListItem mà phải gán ở trong NumberList vì đơn giản ListItem k có mảng đang sử dụng. Máy nó hiểu là tự dưng ta có
//1 component có mỗi 1 thẻ li mà lại gán key vào, nó tìm mảng trong component có key đó lại k thấy
//TH tương tự nhưng dùng đúng, or dùng TT trong return miễn thỏa mãn key và mảng thuộc cùng 1 component
function ListItem(props) {
    return <li>{props.value}</li>;
};
function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        /* Sử dụng đúng phải dùng key ở đây*/
        <ListItem key={number.toString()} value={number * 2} />
    );
    console.log(numbers);//gọi hàm tự do trong hàm là 1 component
    console.log(listItems);
    console.log("Key: " + listItems[0].key);
    console.log(listItems[0].props);
    //khi có 1 biến lưu component thì dùng như object v, cứ chấm liên tục đến các thứ. Chú ý là props nó chỉ lưu 
    //value mà thôi. Còn các giá tị khác lấy TT
    return (
        <ul>
            {listItems}
            {
                props.numbers.map((number) => 
                    <ListItem key={number.toString()} value={number * 2} /> 
                )
            }
        </ul>
    );//nhúng map vào JSX miễn trả ra 1 component là đc
};
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('NumberList')
);

//Trong cùng 1 component, 1 class or 1 function khi sử dụng 1 mảng thành dạng list thì key của mọi list dùng mảng
//đó phải tương đương. VD: 1 mảng ta làm thành 2 list như dưới thì key phải như nhau giữa các ptu 2 list
function Tutorial(props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
            <li key={post.id}>
                {post.title}
            </li>
            )}
        </ul>
    );
    //éo phải map mới tạo ra component, ta cứ cho var biến gán = (component) luôn chả sao. Trong code jsx dùng
    //javascript hàm map thoải mái miễn code javascript trong ngoặc {} phải return về 1 component JSX
    //post dùng cả 2 TH đều phải gán key cùng là id
    
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr />
            {content}
        </div>
    );
};
const posts = [
    {id: 1, title: 'Học Javascript', content: 'Chào mừng bạn đền Javascript!'},
    {id: 2, title: 'Học React.js', content: 'Bạn có thể bắt đầu học React.js sau khi cài đặt.'}
];
ReactDOM.render( <Tutorial posts={posts} />, document.getElementById('root') );