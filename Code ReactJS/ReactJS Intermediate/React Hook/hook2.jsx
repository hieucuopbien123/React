// # Dùng useMemo useCallback

// Trap dùng useCallback
function CandyDispenser() {
    const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
    const [candies, setCandies] = React.useState(initialCandies)
    
    // Cách 1: dùng chay. Mặc định nó tạo r xóa liên tục
    // const dispense = candy => {
    //     setCandies(allCandies => allCandies.filter(c => c !== candy))
    // }

    // Cách 2: dùng call back
    // const dispense = React.useCallback(candy => {
    //     setCandies(allCandies => allCandies.filter(c => c !== candy))
    // }, []);
    // Cách này tương đương với 
    const dispense = candy => {
        setCandies(allCandies => allCandies.filter(c => c !== candy))
    }
    const dispenseCallback = React.useCallback(dispense, []); // Dùng dispenseCallback
    // Thực tế, hàm số đối số 1 của useCallback được perform như 1 hàm bth, tức nó tốn thêm bộ nhớ cho useCallback
    // Thêm nữa, ở lần render thứ 2, khi dùng callback thì cách 1 sẽ xóa cũ tạo mới nhưng cách 2 nó tạo mới nhưng 
    // vẫn giữ bản cũ bởi vì dependencies của useCallback k đổi. Nếu dùng dependencies thì nó thậm chí lưu thêm bản
    // copy của dependency để check equality lại càng tệ hơn

    return (
        <div>
            <h1>Candy Dispenser</h1>
            <div>
                <div>Available Candy</div>
                {candies.length === 0 ? (
                    <button onClick={() => setCandies(initialCandies)}>refill</button>
                ) : (
                    <ul>
                        {candies.map(candy => (
                            <li key={candy}>
                                <button onClick={() => dispense(candy)}>grab</button> {candy}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
ReactDOM.render(<CandyDispenser />, document.getElementById("hooktest1"));

// Usecase dùng useMemo useCallback

// Referential equality(so sánh tham chiếu): VD ta muốn render lại component chỉ khi bar và baz thay đổi
function Foo({bar, baz}) {
    const [id, setId] = React.useState(0);
    const options = {bar, baz}
    React.useEffect(() => {
        console.log(options);
    }, [options]);
    return <div onClick={() => setId(id + 1)}>foobar</div>;
}
function Blub() {
    return <Foo bar="bar value" baz={3} />
}
ReactDOM.render(<Blub />, document.getElementById("hooktest2"));
// Trong JS thì so sánh 2 hàm số hay so sánh 2 object nó sẽ ss tham chiếu nên nếu Foo bị render lại thì dù bar và baz
// k đổi vẫn chạy hàm của useEffect vì options được tạo mới liên tục nên so sánh tham chiếu luôn khác nhau

// Cách fix1:
function Foo2({bar, baz}) {
    const [id, setId] = React.useState(0);
    const options = {bar, baz}
    React.useEffect(() => {
        console.log(options);
    }, [bar, baz]);
    return <div onClick={() => setId(id + 1)}>foobar</div>;
}
function Blub2() {
    return <Foo2 bar="bar value" baz={3} />
}
ReactDOM.render(<Blub2 />, document.getElementById("hooktest3"));
// Như v thay vì ss object ta chỉ cần chuyển về ss biến là xong. Ở TH này dù Blub2 render lại và in lại Foo2 thì bar 
// bar là ss giá trị nên luôn đúng. Nhưng nếu bar và baz là hàm hay object hay mảng thì vẫn sai

// Cách fix2: 
function Foo3({bar, baz}) {
    const [id, setId] = React.useState(0);
    const options = {bar, baz}
    React.useEffect(() => {
        console.log(options);
    }, [bar, baz]);
    return <div onClick={() => setId(id + 1)}>foobar</div>;
}
function Blub3() {
    const bar = React.useCallback(() => {}, [])
    const baz = React.useMemo(() => [1, 2, 3], [])
    return <Foo3 bar={bar} baz={baz} />
}
ReactDOM.render(<Blub3 />, document.getElementById("hooktest4"));
// Vc dùng useCallback và useMemo đảm bảo dù Blub3 có render lại cũng k tạo lại biến bar và baz. Nhờ v ss tham chiếu với
// useEffect luôn chuẩn vì vẫn là biến cũ

// React memo and friends. Để tránh ấn 1 button nhưng cả 2 đều render lại thì ta dùng React.memo
const CountButton = React.memo(function CountButton({onClick, count}) {
    console.log(count);
    return <button onClick={onClick}>{count}</button>
})
function DualCounter() {
    const [count1, setCount1] = React.useState(0)
    const increment1 = React.useCallback(() => setCount1(c => c + 1), [])
    const [count2, setCount2] = React.useState(0)
    const increment2 = React.useCallback(() => setCount2(c => c + 1), [])
    return (
        <div>
            <CountButton count={count1} onClick={increment1} />
            <CountButton count={count2} onClick={increment2} />
        </div>
    )
}
ReactDOM.render(<DualCounter />, document.getElementById("hooktest5"));
// Nhưng thực tế mỗi khi DualCounter khi render lại sẽ tạo mới 2 hàm increment1 nên React.memo ss props xem có thay 
// đổi k với 2 hàm là ss tham chiếu nên luôn khác nhau và render lại nên ta phải dùng useCallback 
// Thực tế, ta k cần quan tâm optimize như v vì tốc độ react đủ nhanh để ta bỏ qua. Nếu làm vc với Graph hay hiển thị
// cái gì nặng thì mới cần quan tâm. Khi làm ta cần hiểu rõ khi nào component render lại và hạn chế tối đa

// Computationally expensive calculations
// Do k bị lỗi như callback nên useMemo có thể dùng mọi lúc khi 1 biến được lấy ra từ 1 biến khác. Chỉ khi biến phụ
// thuộc thay đổi, nó mới tính lại. Vc dùng useMemo(k dùng cho hàm) ở TH 1 biến tính ra từ 1 biến khác luôn làm
// giảm resource nhưng thực chất k đáng để bận tâm vì việc ta làm code dài thêm xong nó phải lưu và so sánh với 
// giá trị dependency để quyêt định có tạo biến mới hay không lại móc thêm việc ra. Ta chỉ nên dùng khi cần tính
// toán phức tạp computationally expensive mà thôi
function kcanthiet(){
    const a = React.useMemo(() => ({b: props.b}), [props.b]);
    return <div>{a}</div>;
}