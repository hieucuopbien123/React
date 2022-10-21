// # React hook cơ bản / Dùng useEffect / Tạo đồng hồ đếm ngược bằng hook

//Ta cần tạo 1 cái đồng hồ đếm ngược. Dùng setTimeout ok rồi nhưng dùng setInterval mới pro và performance tốt
const ErrorInterval = () => {
    const [time, setTime] = React.useState(100);
    // console.log(time);
    React.useEffect(() => {
        let interval = setInterval(() => {
            setTime(time - 1);
            // console.log(time);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            {time}
            <button onClick={() => setTime(time - 1)}>Click</button>
        </div>
    )
}
ReactDOM.render(<ErrorInterval />, document.getElementById("Interval1"));
//NN là vì lần đầu tiên chạy từ trên xuống nó hiện ra 100 và mới chạy useEffect lần 1 thì time lúc này là 100 đáng lẽ
//là 99, đó là lý thuyết khi dùng setInterval bình thường nhưng trong React thì khác: 1 thuộc tính là mỗi lần render chỉ
//access state của riêng nó, đó là lý do mà các biến [time, setTime] là constant tức k thể thay đổi trong lần render đó 
//mà mọi thay đổi setState sẽ thể hiện ở lần render sau với 1 biến constant mới. 
//VD ở trên hàm setInterval k được gọi lại nhiều lần mà chỉ được gọi duy nhất ở lần render đầu tiên và ta set sau mỗi
//1s sẽ gọi hàm callback của setInterval (mà vừa được gọi ở lần render đầu tiên) cx với dữ liệu ở lần render đầu tiên. 
//Các lần render sau nó éo gọi lại nx vì tham số hook ta dùng là []. 
//Cụ thể ở đây lần render đầu thì dòng 8 in ra 100 và sau đó chạy lại từ đầu gặp dòng 4 in ra 99. Nhưng cái time ở 
//trong interval nó vẫn là 100 như ở lần render đầu tiên vì nó được gọi lúc đó chứ lần render thứ 2 là 99 thì nó chả được
//gọi nx => in ra 99 => cứ sau 1s nó lại chỉ gọi 100 - 1 = 99 mãi như v. Tức cái time trong setInterval nó là của lần 
//render đầu tiên(chỉ các biến thôi chứ setTime hay các hàm set luôn là của data lần render mới nhất)

//Vấn đề là khi react render, mỗi lần render như tách biệt với nhau. Cái nào tồn tại ở lần render nào thì chỉ dùng số 
//liệu ở lần render đó. Bình thường dữ liệu ở 1 lần render khi chả còn gì thì sẽ bị xóa đi. 
//VD1: render lần 1 dùng 1 biến useState, render lần 2 update biến useState của render lần 1. Giả sử k có gì thêm thì 
//trong data của react sẽ chỉ có mỗi data của render lần 2. Ta tưởng tượng nó đóng vào khung kiểu:
//[data render lần 1] -> [data render lần 2] -> ... -> [data render lần mới nhất] => lần nào k cần dùng thì xóa đi. VD
//ở TH này nó chỉ còn [data render lần mới nhất]. Đương nhiên có các biến const nx
//VD2: render lần 1 dùng useEffect và useState, các lần sau dùng chỉ còn useState vì useEffect có [] thì data lưu kiểu
//[data render lần 1 gồm useEffect và useState] -> [data render lần mới nhất gồm useState]. Nếu kcj thay đổi thì các 
//lần sau có thể vẫn mang data useState của các lần trước. Thực tế giá trị hiện ra màn hình là state chuẩn duy nhất ở
//mọi lần vì useState k khởi tạo biến mới mà dùng chung 1 biến cũ, chỉ là các hàm như setInterval nó gọi đúng 1 lần
//ở frame useEffect đầu tiên và chỉ sử dụng data ở frame đầu tiên nên mới v. TH đặc biệt khi 1 hàm vẫn tồn tại duy nhất
//ở lần render đầu tiên dù đã có nhiều lần render khác trải qua nhưng k bị xóa vì useEffect k gọi tiếp nx
//=> các lần ở giữa k cần dùng gì nên k có ở đây. Nên nhớ là useState và useEffect chỉ lưu data render ở lần đó vì nếu 
//đổi bằng setState thì nó chả đổi được luôn. Các hàm setState mà gọi ở lần render trước đó có thể đổi được state ảnh 
//hưởng đến lần render mới nhất. Ta cũng có thể truy cập đến state của lần render mới nhất thông qua ref(Cách giải quyết
// 3). Hiểu được như v ta có thể chế thành như sau:
const TestInterval = () => {
    const [time, setTime] = React.useState(100);
    console.log(time);
    React.useEffect(() => {
        var test = time;
        let interval = setInterval(() => {
            setTime(test);
            test -= 1;
            console.log(test);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            {time}
        </div>
    )
}
ReactDOM.render(<TestInterval />, document.getElementById("Interval2"));
//Cách này khá hay vì ta cũng tạo biến test ở trong useEffect[] để nó chỉ được tạo ra ở lần đầu tiên mà thôi
//Cách này hay ngang cách giải quyết 1, chỉ khác là callback ở cách dưới nó truy cập thẳng vào time ở lần render cuối
//còn cách này nó vẫn ở lần render đầu nhưng ta tạo ra biến test có sự thay đổi y hệt biến time và chỉ tồn tại trong
//lần render đầu
//Cái này nó tương đương với closure function của JS. Khi mà 1 biến dù nằm ngoài và function và bị out of scope nhưng
//function vẫn tồn tại thì biến đó sẽ vẫn được copy và dùng trong riêng hàm đó chứ k biến mất hoàn toàn. Dù đúng là
//bị xóa do outofscope và các thú khác k truy cập được, chỉ hàm đó có copy mới truy cập được. Ở đây TH lỗi bđ nó copy
//time nên time k đổi, ở Th này nó copy biến test=100 và dùng riêng trong hàm setInterval ok dù test bị outofscope do
//useEffect lần đầu tiên đã kết thúc

//Cách giải quyết 1: hàm setState nó cho phép ta nhận 1 hàm callback với params truyền vào state ở tương lai
//và body của hàm chỉ được chỉnh sửa biến state đó
const IntervalFix1 = () => {
    const [time, setTime] = React.useState(100);
    console.log(time);
    React.useEffect(() => {
        let interval = setInterval(() => {
            setTime(time => time - 1);
            console.log(time);//vẫn luôn là 100, chỉ có hàm setTime bên trên nhận callback thì time là params luôn
            //mang giá trị mới nhất ở future
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            {time}
        </div>
    )
}
ReactDOM.render(<IntervalFix1 />, document.getElementById("Interval3"));
//Tưởng hay nhưng nếu ta muốn đặt điều kiện dừng setInterval khi time giảm về 0 thì cách trên chưa làm được(cách đầu tiên
//dùng var test vẫn làm được)
//Điều này đồng nghĩa với việc. Hoặc là ta check ở lần render 1 nếu time mới nhất = 0 thì dừng setInterval
//Hoặc là ta check ở lần render mới nhất nếu time = 0 thì xóa interval ở lần render đầu tiên nhưng cách thứ 2 có 
//vẻ k ổn khi mà truy cập dữ liệu ở lần render trước đó mặc dù điều này vẫn có thể thực hiện được bằng cách lưu id của
//interval vào 1 biến state để check r xóa nhưng rất rối nếu làm v. Tuy nhiên React còn 1 cơ chế nữa ta có thể lợi dụng
//để dừng cái interval như sau: Mỗi lần useEffect mới được tạo ra ở lần render mới thì cái useEffect cũ cùng tên với
//nó sẽ tự kết thúc và gọi vào hàm return(nếu có) => ta có thể check ở lần render mới nhất nếu time = 0, thì tạo ra
//1 useEffect k làm gì cả thì useEffect cũ sẽ mất, tât nhiên điều này có thể làm ez bằng cách đặt vào if else

//Cách giải quyết 2: Ở trên thì biến time nó chỉ đổi do hàm setInterval mà setInterval luôn gọi từ lần render đầu tiên
//100-1=99 => ta chỉ cần cho hàm callback của setInterval gọi setTime(<dữ liệu được thay đổi theo lần render mới nhất>)
//tức là mỗi lần render ta lại cho 1 biến gì đổi mà update theo count mới nhất, xong trong setInterval ta gán setTime
//là dữ liệu mới nhất đó. Đương nhiên cái biến đổi theo dữ liệu mới nhất k thể dùng useState rồi vì callback của 
//setInterval luôn dùng biến state của frame lần đầu tiên được gọi. Ở đây ta dùng ref.current => kể cả nó là const thì
//nó vẫn update được theo dữ liệu mới nhất. 
const IntervalFix2 = () => {
    const [time, setTime] = React.useState(100);
    const counterRef = React.useRef(100);

    React.useEffect(() => {
        counterRef.current = time;
    }, [time]);
    React.useEffect(() => {
        let interval = setInterval(() => {
            setTime(counterRef.current - 1);
        }, 1000)
        return () => clearInterval(interval);
    }, []);
    return(
        <div>
            {time}
        </div>
    )
}
ReactDOM.render(<IntervalFix2 />, document.getElementById("Interval4"));
//[dữ liệu lần render 1 gồm callback của interval, useRef lưu count mới nhất, useState time hiện tại là hằng số] -> [dữ
//liệu lần render mới nhất]

//VD ứng dụng cách 2 tạo stop time
const Clock = () => {
    const [timeData, setTime] = React.useState(5);
    const [stop, setStop] = React.useState(false);
    const counterRef = React.useRef(5);

    React.useEffect(() => {
        counterRef.current = timeData;
    }, [timeData]);

    React.useEffect(() => {
        if (timeData > 0 && stop == false) {
            const idInterval = setInterval(() => {
                if (counterRef.current >= 1) {
                    setTime(counterRef.current - 1);
                } else {
                    setStop(true);
                }
            }, 1000);
            return () => clearInterval(idInterval);
        }
    }, [stop]);

    return (
        <div>
            {timeData}
        </div>
    );
};
ReactDOM.render(<Clock />, document.getElementById("Interval5"));
//cách trên mỗi lần render phải chạy thêm 1 useEffect nhưng k chỉ là render do interval đâu mà mọi lần render lại do đó 
//nên tách thành 1 component riêng or dùng useMemo để hạn chế . Dù sao cách đầu tiên dùng var test vẫn thấy ổn nhất

//Cách 3 là dùng setTimeout or setInterval cho đổi liên tục
const IntervalFix3 = () => {
    const [count, setCount] = React.useState(100);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);
    return (
        <div>{count}</div>
    )
}
ReactDOM.render(<IntervalFix3 />, document.getElementById("Interval6"));

//Cách 4 là dùng redux của React hook
const reducer = (state, action) => {
    switch(action.type) {
        case "Decrement":
            return state - 1;
        default:
            return state;
    }
}
function IntervalFix4() {
    const [state, dispatch] = React.useReducer(reducer, 100);
    React.useEffect(() => {
        setInterval(() => {
            dispatch({type: "Decrement"});
        }, 1000);
    }, []);
    return (
        <div>
            {state}
        </div>
    )
}
ReactDOM.render(<IntervalFix4 />, document.getElementById("Interval7"));
//Cách này hay nhưng dùng dao mổ trâu giết gà, nếu muốn tùy chỉnh tăng giảm nhân chia thì nên dùng. Thay vì lấy render
//lần 1 hay lần cuối này nọ ta lưu mẹ vào state global rồi lấy lúc nào cx đc. Khi này react chả cần lưu các lần render 
//nào mà chỉ có: [data lần render cuối] + store global

/*
//Trong dự án Auction, các anh dùng customHook: input là 1 mốc tg fix, output là countdown lưu thời gian đó giảm dần
//isTimeUp là cục báo hiệu sự kết thúc. 
const CountdownHook = (toDate) => {
    //timer lưu id của interval với useRef. useRef bên cạnh vc ref tới DOM, nó cũng ref tới bất cứ 1 giá trị nào 
    //trong component để thao tác với component đó. Nó k khởi tạo lại và là duy nhất trong mỗi lần render
    const timer = useRef();
    const [isTimesUp, setTimesUp] = useState(false);
    const [countdown, setCountdown] = useState(null);

    const tick = () => {
        const delta = moment(toDate).diff(moment());//moment là từ: import moment from "moment";
        if (delta <= 0) {
            clearInterval(timer.current);
            timer.current = null;
            setTimesUp(true);
        } else {
            setCountdown(delta);
        }
    };

    useEffect(() => {
        if (toDate) {
            tick();
            timer.current = setInterval(tick, 1000);
        }
        return () => clearInterval(timer.current);
    }, [toDate]);

    return [isTimesUp, countdown];
};
export default CountdownHook;
// Cơ chế thì bên trong rất đơn giản. Do nó là hook nên input nhận vào có thể thay đổi chứ k còn là fix nên useEffect
//dùng kiểu [toDate]. Khi đó setInterval cho nó giảm dần sau mỗi 1s và lấy ra kết quả, khi timeup thì làm gì
//countdown ở đây trả ra sự chênh lệch thời gian lúc đó so với hiện tại. Dùng:
    const [isTimesUp, countdown] = useCoundownHook(endTime*1000);
    const textCountDown = useMemo(() => {
        if (countdown) {
            const duration = moment.duration(countdown);
            const h = Math.floor(duration.asHours());
            const m = duration.minutes();
            const s =  duration.seconds();
            return `${h < 10 ? "0"+h : h}:${m < 10 ? "0"+m : m}:${s < 10 ? "0"+s : s}`;
        }
        return "00:00:00";
    }, [countdown]);
// Thực tế ta nhận vào biến thời gian chuẩn và tính toán lệch thời gian so với hiện tại chứ k ai nhận vào 1 ktg 
// và tự động cho đếm ngược cả. Nó rất lố bịch vì như v sẽ tùy thuộc vào máy ai có lag hay không. Do đó các dự 
// án thực tế nó tính lại tg liên tục như v. Bên cạnh đó, để tránh sự chệnh lệch về múi giờ, ta nên dùng chung
// epoch time. Do mỗi lần tính lại và tg hiện tại cứ trôi đi nên k cần lo biến state này nọ lỗi như bên trên
*/