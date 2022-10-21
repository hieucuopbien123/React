// # Module redux saga

import { call, put, takeLatest } from 'redux-saga/effects';

import { getPostData } from './postsAPI';
import { getListPostSuccess } from './action';

function* getListPostSaga(action) {
  try {
    //ta có thể thêm các hàm put action pending ở đây khi muốn nó hiện lên cái gì trong thời gian loading api
    const data  = yield call(getPostData);
    //chú ý là takeLastest là 1 hàm non-blocking, nó như là async v -> tức các hàm trong này cx tự chạy trên luồng riêng
    console.log("Data: ", data);
    //kiểu object khi axios trả ra về bth
    yield put(getListPostSuccess(data));
  } catch (error) {
    //handle error => put action error ở đây
  }
}

function* postsSaga() {
  yield takeLatest('GET_LIST_POST', getListPostSaga);
}

export default postsSaga;
//Cơ chế xử lý chờ: phát action yêu cầu call API -> saga bắt action đó và tiến hành call api, nhưng nhờ takeLatest là 
//bất đồng bộ nên nó vẫn chạy vào reducer cho ra state mới để render giao diện-> lúc này ta phải kiểm soát state như
//thế nào thì giao diện in ra như thế nào. Trong lúc đó thì hđ call api vẫn diễn ra và nếu thành công thì lại dispatch
//action tới reducer luôn in ra cái gì
//Nếu đang lấy api dở lại thực hiện 1 action khác thì sao-> phải gọi vào hàm all để các saga chạy đa luồng tức là vừa 
//fetch api cho dữ liệu action này, vừa thực hiện cho action khác ở luồng khác nx

//mọi giá trị của trả về của yield đều là undefined nhưng nếu là 1 object Promise thực hiện 1 hàm callAPI thì nó sẽ
//trả ra giá trị object lưu kết quả của promise đó. VD promise đó resolve hay reject cái gì thì lấy hoặc đơn giản
//chả có resolve hay reject mà là đối số nó trả về để truyền vào hàm .then đầu tiên

//khi nhét vào store thì nó tự động gọi next để chạy các hàm function* và đồng thời nhét vào 1 vòng lặp nên: các function
//saga sẽ thực hiện hết 1 lần với mỗi 1 action nó chạy và action sau tới nó cx sẽ thực hiện tiếp hàm. Vấn đề là tại sao
//lại dùng function*=> là vì ví dụ ta dùng 1 yield để bắt 1 action A-> bắt đc A và chưa xử lý xong lại 1 action A khác
//đi vào=> nếu dùng các hàm bth nó sẽ đưa vào hàng đợi nhưng dùng function* nó sẽ chạy luôn function* và cái yield tiếp
//tục xử lý tùy vào ta muốn takeLatest,.. hay j => sai dùng nó là để dùng yield+promise tạo hiệu ứng chờ promise
//dùng async await chờ promise mà function* yield(function*(promise)) cũng chờ promise tùy function* là non/blocking

//Thật ra promise là bất đồng bộ còn yield là thực hiện đến đó là dừng lại. 2 cái hoàn toàn độc lập với nhau k có gì đáng
//nói. Nhưng cái ta cần là 1 hàm thực hiện độc lập với các hàm khác nhưng bên trong nó gọi hàm phải chờ kiểu như bên
//trên ý. getListPostSaga thực hiện độc lập xong call cái kia cx độc lập nhưng lại chờ vc nó thực hiện xong mới đi 
//tiếp trong cái hàm độc lập đó
//từ khóa yield sẽ chờ Promise thực hiện xong và mặc định Promise thực hiện sẽ tự gọi next để thực hiện tiếp hàm *
//Nó ngầm gọi như v hay nói cách khác function* yield+promise là chờ 1 hàm bất đồng bộ thực hiện xong. Nhưng vì js thấy
//nó phức tạp quá nên ng ta mới cho ra đời phiên bản mới của nó là async/await. Saga thì nó vẫn dùng cách cũ là
//yield promise nên cứ v thôi

//Thế có phải dùng function*+yield+promise bằng với vc gọi hàm bth k-> k, thật ra tất cả các hàm nào tốn thời gian hay
//gọi là side effect đều là các hàm bất đồng bộ. VD hàm fetch hay get của axios, nó tự động là các hàm bất đồng bộ rồi nên
//ta buộc phải dùng function*+yield đi với nó để chờ như ý ta ở TH trên. Chứ nếu gán biến bth thì kể cả nó có chờ cx k
//lấy đc giá trị để dùng vì promise mà, yield 1 promise sẽ chờ và lấy đc giá trị nên bên trên là bắt buộc. Đúng hơn là 
//mọi hàm side effect đều gọi next liên tục thì đúng hơn. Có thể yield 1 function* or 1 promise(các hàm put, call cx là
//funtion* tự thân nó r)