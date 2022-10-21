// # Module redux saga

import { takeEvery, takeLatest, call, delay, put } from 'redux-saga/effects'
// import Api from '...'
//saga được xd dựa trên generator function, hàm có khả năng hoãn thực hiện mà vẫn giữ đc context, nhờ đó mà hàm có thể
//chạy->dừng->lại chạy, là chìa khóa giúp giải quyết vấn đề bất đồng bộ, dừng chờ đợi async chạy xong r thực hiện tiếp
//Mọi hiệu ứng saga đều trong thư mục effects

//tạo ra các công nhân và ông chủ
function* testCall(test){
    console.log("Call function: ", test);
}

function* removeWorker(){
    yield delay(1000);
    yield call(testCall, "Hieu")
    console.log("Bắt đầu chạy việc");
    console.log("Đây là nơi xử lý remove action");
    console.log("Đã chạy việc xong")
}//các hàm như này gọi là saga

export function* postWatcher() {
	yield takeEvery('ADD_POST', function* () {
		console.log('hello saga')
	})
    yield takeLatest('REMOVE_POST', removeWorker);
}
//takeEvery sẽ bắt tất cả các action có type là ADD_POST mà store có middleware này bắt đc, r thực hiện hàm function*
//số lần chạy là vô hạn mà k cần biết các function tương tự ở sự kiện lần trc đã chạy xong chưa
//1 helper khác là takeLatest() gần như hệt takeEvery(), chỉ khác là nó chỉ cho phép một function được chạy trong một
//thời điểm. Tức là nếu như trước đó function này của sự kiện trc đang chạy, nó sẽ hủy function đó và chạy lại lần nữa 
//với dữ liệu mới nhất.Tg tự takeEvery(),generator sẽ không bao giờ ngừng lại và tiếp tục chạy cho đến khi một action 
//chỉ định được diễn ra. Nếu hđ khớp nó có thể gửi cho worker xử lý nên ta có thể phân chia nhiều worker và watcher với
//hàm này như bên trên. 
//Latest tức là nếu nhiều action được gởi tới đồng thời, thì nó chỉ nhận 1 action cuối cùng và gởi action này cho worker
//xử lý, hủy tất cả các nhiệm vụ đã giao trước đó => Cơ chế: check gửi action tới khớp k với take->khớp thì check xem nv
//trc hoàn thành chưa, nếu chưa thì gọi cancel('<task>')sau đó gọi fork. Vai trò fork là tạo task nền xử lý và lưu lại 
//kết quả cho hành động tiếp theo lại từ đầu(vòng lặp) 
//takeLeading: xử lý action gửi tới đầu tiên->các action gửi tới sau sẽ k nhận nếu chưa hoàn thành cái trc
//cơ chế:đặt trong vòng while true->check action tới trùng thì đi tiếp với take-> nếu đi tiếp đc thì gọi call xử lý
//hàm đó(k chạy nền như fork)và lưu kq cho vòng sau lại lặp lại. Vì đặt trong vòng while nên xử lý lặp liên tục nhưng
//nó cx vô hàng đợi cái trc hoàn thành xong
// =>Đó là cơ chế bên trong của 2 hàm take

//hàm take('<action.type>'): sẽ chỉ chờ 1 lần duy nhất và sang lệnh kế tiếp
//call(func,paras): gọi 1 hàm để xử lý, hàm này có thể là 1 Promise, 1 function bình thường hoặc 1 Generator function
//nếu trả ra 1 promise thì nó sẽ tạm dừng cho đến khi promise được handle, nếu trả ra bth k là promise thì đi tiếp bth
//select: effect này là bộ chọn cung cấp tiện ích để chúng ta thao tác với dữ liệu được chọn từ store->éo dùng
//delay(time): cho phép delay ứng dụng lại 1 khoảng thời gian trước khi chạy đến đoạn mã tiếp theo. Ví dụ mấy thg ngu
//bấm sự kiện 10 lần nhanh vì chúng nó vội. ta phải dùng debounce time như trên để xử lý. Đầu tiên, takeLatest sẽ bỏ
//9 lần click trước và chỉ lấy lần click  cuối cùng để gửi đi. Nhưng nó đã lỡ call api cho server 10 lần rồi vì 
//takeLatest k dừng call api thì delay sẽ delay lại 1 k tg call api dồn lại thành 1 lúc để cuối cùng chỉ có 1 api được
//gọi chứ kp 10 api gọi liên tiếp nhau
//=>Cú pháp thêm từ khóa yield đằng trc, VD: yield take('WAITING);
//put giúp dispatch 1 action trong redux store. VD: yield put({ type: 'INCREMENT' }) bất cứ đâu trong saga
//trong saga có phân chia blocking và nonblocking, ví dụ put là nonblocking, delay là blocking
//putResolve: giống put nhưng blocking, dùng khi cần dispatch action xong lấy kq trả về r mới đi tiếp. put có thể k 
//thực hiện ngay nếu có task vẫn trong hàng chờ
//race: chạy nhiều effect đồng thời và chỉ lấy kq của effect nhanh nhất, hủy những cái chậm(giống promise)(kiểu đua xe ấy)


//quy trình thường dùng của call api với saga: bắt action request => thực hiện call api sẽ blocking, nhưng ta lại đặt
//nó trong 1 takeEvery chẳng hạn thì là nonblocking->tức hàm callapi block 1 task khác bất đồng bộ thôi
//thành công thì phát ra action thành công or thất bại thì reducer sẽ xử lý tiếp 2 TH ra sao
/*function* fetchUser(action) {
    try {
        const user = yield call(Api.fetchUser, action.payload.userId);
        //1 là hàm call api, 2 là user id truyền vào để call api. Call api cũng chỉ là hàm fetch(lấy về)thông tin từ
        //server về 1 user nào đó thông qua userID(ở TH này)
        yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    } catch (e) {
        yield put({type: "USER_FETCH_FAILED", message: e.message});
    }

// function* mySaga() {
//     yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }//takeEvery là non blocking sẽ thực hiện bất đồng bộ việc call API
// Alternatively you may use takeLatest. Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
// dispatched while a fetch is already pending, that pending fetch is cancelled
// and only the latest one will be run.
function* mySaga() {
    yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
export default mySaga;*/

// const todos = yield call(fetch, '/api/todos');
// const user = yield call(fetch, '/api/user');
// //Effect thứ 2 sẽ không được thực hiện cho đến khi effect thứ nhất được giải quyết.
// //hàm all sẽ giúp các saga bên trong nó chạy song song, khác với call chạy lần lượt
// //Có thể gom tất cả saga vào hàm r nhét 1 thể 
// const [todos, user]  = yield all([
//     call(fetch, '/api/todos'),
//     call(fetch, '/api/user')
// ]);
//giá trị trả về của hàm yield bth thì là undefine vì k xác định. Nhưng đặc biệt là nếu fetch API thì nó sẽ trả ra giá
//giá trị được fetch, nó là 1 thú chuyên để gọi bất đồng bộ fetch API. VD ở TH fetch 1 list từ 1 server thì bên trong 
//nó là 1 object có chứa list đó, url, status,...

//Fork được sử dụng để tạo nhiều task nền, được đính kèm với task cha.
//Spawn cũng giống như fork, nó khác ở chổ là tạo ra cái task nền tách rời với task cha.
//Tức là spawn thực hiện trong 1 luồng-> luồng đó vẫn đi tiếp nhưng k đc kết thúc cho đến khi spawn kết thúc
// function* fetchResource(resource) {
//     console.log(`Fetch ${resource} start`);
//     const response = yield call(fetch, "https://jsonplaceholder.typicode.com" + resource);
//     const text = yield call(response.text.bind(response));
//     console.log(`Fetch ${resource} end`);
// }
// function* fetchAll() {
//     console.log("Fork or Spawn start");
//     // this is pseudo code, I mean here that you can use either
//     // fork or spawn, check results below
//     const task1 = yield fork||spawn(fetchResource, "/posts/1"); 
//     const task2 = yield fork||spawn(fetchResource, "/posts/2");
//     console.log("Fork or Spawn end");
// }
// function* main() {
//     console.log("Main start");
//     yield call(fetchAll);
//     console.log("Main end");
// }
// RESULTS WITH FORK():   |  RESULTS WITH SPAWN():
// Main start             |  Main start
// Fork start             |  Spawn start
// Fetch /posts/1 start   |  Fetch /posts/1 start
// Fetch /posts/2 start   |  Fetch /posts/2 start
// Fork end               |  Spawn end
// Fetch /posts/2 end     |  Main end <-- 
// Fetch /posts/1 end     |  Fetch /posts/2 end
// Main end <--           |  Fetch /posts/1 end

/*
VD: ứng dụng race
function* fetchPostsWithTimeout() {
    const {posts, timeout} = yield race({
        posts: call(fetchApi, '/posts'),
        timeout: delay(1000)
    })
    if (posts)
        yield put({type: 'POSTS_RECEIVED', posts})
    else
        yield put({type: 'TIMEOUT_ERROR'})
}
*/

/* Tổng kết: mặc định là các hàm được gọi kèm với yield
takeEvery: mọi request của user đều lấy
takeLatest: user gọi nhiều thì chỉ lấy cái cuối, dừng những cái đã gọi 
call: gọi 1 hàm bất kỳ thực hiện lần lượt
delay: chờ 1 khoảng thời gian r mới thực hiện tiếp 
put: dispatch 1 action bất đồng bộ
takeLeading: user gọi nhiều hàm thì chỉ lấy cái đầu
take: gọi 1 hàm đúng 1 lần, các lần sau sẽ k bắt
fork: thực hiện bất đồng bộ hàm đó nhưng chỉ khi xong mới thực hiện hàm sau hàm cha gọi nó. Kiểu hàm cha gọi nó cần dùng
thì phải chờ cho nó xong=> bất đồng bộ nhưng ta lại muốn nó đồng bộ thêm 1 lúc để tiết kiệm thời gian ấy
spawn: bất đồng bộ hoàn toàn, gọi hàm nhưng data bên trong k qtr xong hay chưa, cứ gọi bất đồng bộ khi nào xong thì lấy
all: chạy mọi hàm bên trong bất đồng bộ cùng lúc
putResolve: dispatch 1 action đồng bộ, phải dispatch xong mới cho đi tiếp
race: thực hiện đồng bộ mọi hàm bất đồng bộ bên trong cùng lúc, cái nào xong trước thì lấy kết quả, biến lưu cái chưa 
xong trả ra null 
*/