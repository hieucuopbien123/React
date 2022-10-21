// # Basic / Phân biệt gọi hàm hay gán hàm khi truyền vào sự kiện

function Test() {
    const [title, setTitle] = React.useState("");
    function handleEvent(text){
        setTitle(title + text);
    }
    return(
        <div>
            <div>{title}</div>
            <button onClick={() => handleEvent("Hieu ")}>Test</button>
        </div>
    )
    //chỉ có 2 cách dùng: 1 là gọi hàm; 2 là bind hàm. Nhưng ta biết là bind hàm thì hàm được gán cho 1 đối số chứ k 
    //chạy. Nếu ta cho onClick={handleEvent.bind(null,"Hieu")}; thì sẽ chạy tốt vì render lần đầu tiên chạy qua cái này
    //mặc định sẽ tạo ra 1 hàm ở vị trí này là chạy với this = null và tham số "Hieu"; thì từ đó trở đi cứ ấn là chạy 
    //hàm như v. Nhưng nếu onClick={handleEvent("Hieu")}; thì éo vì như này thực hiện hàm lấy giá trị trả về gán
    //cho sự kiện onClick nên các lần click sau chỉ return GT trả về là trả có gì cả nên dùng v vô dụng-> còn 
    //() => handleEvent("Hieu ") tức là mỗi lần click sẽ thực hiện hàm này gọi handleEvent ra kết quả chuản như ta mong
    //muốn
    //Hỏi ngu: thế tại sao TH 1 nó thực hiện hàm lấy giá trị trả về cho onClick nên ấn trả làm gì cả. Còn TH2 lại gán 
    //hàm cho onClick để ấn là thực hiện hàm mỗi khi click=> bởi vì TH 1 là ta k gán hàm mà dùng kiểu thực hiện hàm
    //TH2 là nếu ra cái hàm đó chứ k chạy
    //Tức là: onClick={handleEvent.bind(null,"Hieu")}; => gán hàm vì khai báo ra 1 hàm
    //onClick={handleEvent("Hieu")}; => chạy hàm với đối số "Hieu" luôn
    //() => handleEvent("Hieu ") => gán hàm vì chỉ nếu ra hàm chứ k chạy
    //(() => handleEvent("Hieu "))(event) => chạy hàm với tham số event
}

ReactDOM.render(<Test />, document.getElementById("test"))