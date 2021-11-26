import { put } from 'redux-saga/effects';
//2 hàm đầu có vai trò dispatch hàm start của cái action truyền vào. Chạy hàm này thay cho vc dispatch cái action đó

export const withPromiseAndDispath = (func, params, dispatch) => {
  console.log("withPromiseAndDispath: ", params);
  return new Promise((resolve, reject) =>{
    dispatch(func({ ...params, resolve, reject }))
    console.log("AAAAAAAAAAAAAAAAAAA");
  })
  // .then(res => {console.log("this is successful: ", res)});
  //return promise có tác dụng thực hiện bất đồng bộ bên trong đồng thời chạy đc cái gì đó đằng trc thoải mái như này
  //đồng thời thực hiện luôn khi return
  //Dùng promise ở đây thì nó sẽ thực hiện bên trong bất đồng bộ-> tức là 2 hàm log và dispatch được thực hiện theo thứ
  //tự nhưng lại đồng thời với luồng bên ngoài. Nó sẽ k chạy then cho đến khi resolve bên trong đc gọi. Ta có thể muốn 
  //nó làm gì ở đây thì then catch vào
}

export const startActionWithPromise = (action, params, dispatch) => {
  console.log("start action with promise: ", action)
  return withPromiseAndDispath(action?.start, { ...params, actionMeta: action }, dispatch);
  //kiểm tra có start mới dispatch nhưng tạo bằng createActionSource thì có mặc định rồi
}

//2 hàm này sẽ xử lý thất bại hay thành công thì làm gì. Cụ thể ở đây nó thực hiện 2 hàm resolve và successCallBack
//->cần kiểm tra 2 hàm này có tồn tại trong action từ đầu k
function resoveResult(action, result) {
  console.log("resolve result")
  if (action?.resolve && typeof action.resolve === 'function') {
    action.resolve(result);
  }
  if (action?.successCallback && typeof action.successCallback === 'function') {
    action.successCallback(result);
  }
}

function rejectResult(action, result) {
  console.log("reject result")
  if (action?.reject && typeof action.resolve === 'function') {
    action.resolve(result);
  }
  if (action?.failedCallback && typeof action.failedCallback === 'function') {
    action.failedCallback(result);
  }
}

//gọi vào hàm này thì handler sẽ thực hiện action và kiểm tra action thành công hay thất bại thì làm gì
export function sagaPromise(handler) {
  console.log("saga promise for ", handler);
  return function* (action) {
    try {
      const result = yield* handler(action);
      console.log("try catch inside saga promise success");
      console.log(action)
      if (action?.payload?.actionMeta.success) {
        yield put(action.payload.actionMeta.success(result));
      }
      resoveResult(action?.payload, result);
    } catch (error) {
      if (action?.payload?.actionMeta.error) {
        console.log("try catch inside saga promise error");
        console.log(action)
        yield put(action.payload.actionMeta.error(error));
      }
      rejectResult(action?.payload, error);
    }
  }
}
//Ở ví dụ này cho ta 3 cách khác nhau để xử lý action với saga và waiter và sự thay đổi luồng khi waiter kết hợp saga
//Với ví dụ app: nó tạo như waiter bình thường và k dùng saga, nhưng nó k còn mapStateToProps và mapDispatchToProps nx.
//React-redux cung cấp 2 hàm hook là useDispatch lấy biến hàm dispatch và useSelector(state=><giá trị muốn lấy>) giúp 
//lấy giá trị của state ở trong bất cứ reducer nào được cài vào redux ở thời điểm đó. Vì render sau khi tạo store nên lúc
//đó redux có hết các reducer r nên ta muốn lấy cái nào cũng đc để dùng state, dispatch như 1 biến trong class mà k cần
//2 hàm map nx. Khi dùng như v kèm vói waiter thì ban đầu nó chỉ check trong các sagas để có waitActionForSaga thì lưu lại
//thôi. 
//Khi dùng hook của react-redux userSelector thì state chính là giá trị trả về của toàn bộ reducer, lấy cái nào cx đc

//Với ví dụ counter: chính là ví dụ dùng waiter với saga kiểu bth. phát action->dispatch nó. Với phép cộng thì dispatch
//trực tiếp mà k qua creator vì qua creator chỉ cần khi muốn bắt success/error hay truyền thêm cho đối số gì. Nch là cái
//creator chỉ dùng khi xử lý riêng ra cái đó. Ta dispatch mẹ nó cái start luôn là đc-> nhưng lần này ta k dùng start trong
//reducer tự có nx mà có saga nó sẽ để saga xử lý, nếu saga k xử lý sẽ dừng hành động->saga xử lý success-> chạy theo thú
//tự bth: start->xử lý->end->success. Nhưng nó chạy thêm công đoạn xử lý ở phần đầu, thật ra cái này là reducer ngầm chạy
//nên ta k qtr.

//Với ví dụ login: ban đầu load saga có hàm waiterActionForSaga là hàm cài việc xử lý action success và error cho saga
//tức thay vì dùng creator để làm điều đó thì bh dùng hàm này để xử lý. Khai báo làm như nào ở file này luôn. Sau khi load
//xong nó lưu giá trị return là 1 function* được lưu lại làm waiter cho saga, nếu success hay error đều chạy vào đây
//load cái login. Ban đầu có sự kiện chạy vào 2 hàm đầu để dispatch cái action.start->reducer ngầm bắt đầu chạy. Ta hiểu
//là k cần quan tâm đến những gì reducer ngầm chạy mà chỉ biết là action nào ta phát ra thì sẽ đến saga bắt action đó trc
//-> chạy vào userLogin-> throw error-> như trên đã nói cái waiterActionForSaga đã có sẽ xử lý->gọi vào rejectResult
//Chỉ cần biết là mapStateToProps đều đc chạy cả rồi, nó cứ tự động nên ta chỉ cần đổi action ở 2 cái start và success là
//xong
//Hàm truyền vào waiterActionForSaga trở thành 1 cái waiter function, nhận handler, handler true thì thực hiện trong
//try, false hay throw error thì thực hiện trong catch

//Dùng cái này phức tạp chỉ cần khi có nhiều function cần thực hiện với 1 action, cần check nhiều nx, chứ bth nên dùng 
//waiter với saga như VD 2 là ổn nhất
//Xét login: đường đi của action. Lúc đầu createActionResources tạo 1 LoginAction sẽ có 3 action là start,success,error 
//và cả 3 đầu return 1 object {login:false}. Ấn login nó phát đi startActionWithPromise cái action đó với 1 object param
//{ username: 'truong', password: '1234', successCallback, failedCallback }-> nó lại gọi withPromiseAndDispath
//với { đống param, action object có 3 actions start/success/error, nó truyền cả resolve/reject của promise nhưng chả để
//làm gì}. Tức cuối cùng nó dispatch(action.start(<pram thêm vào,action có 3 action)). Saga bắt được về sau throw error. 
//Cái waiter thực hiện khối catch, waiter nhận vào đối số chính là đối số của hàm start là 1 action nhưng lúc này
//action đó bị biến đổi thành 1 biến lớn action { biến continue, extraArgument nếu dùng, payload:{là 1 biến chứa toàn
//bộ các đối số ta truyền vào start } }
//tiếp tục nó kiểm tra nếu có hàm error thì chạy. Rõ ràng trong action.payload.metaAction có 3 hàm error,success,start
//như ta có ban đầu thì hiển nhiên có hàm error rồi nên nó sẽ put cái đó để xử lý lỗi(ở TH này ta k xử lý nên mặc định
//nó thực hiện hàm error có sẵn là trả làm gì cả). Nó còn cho phép tự thực hiện hàm reject của riêng ta chính là 
//rejectResult như ở trên. Gọi vào 2 hàm gọi lỗi khác là hàm mặc định truyền vào or hàm promise nếu muốn
//biến continue ta k dùng nhưng nó có vai trò bên trong là giúp cập nhập action thành cái mới với payload như trên
//Đáng lẽ saga chỉ cần cho biết là success hay error để reducer chạy nhưng nó lại gọi waiterActionForSaga để cài cái waiter
//vào. Cái này sẽ chờ sự kiện vào thì gọi hàm bên trong nhưng nó k gọi ngay mà sẽ gán cho action biến continue=false và 
//dispatch hay put 1 action khác bao cái action này và nhét nó vào trong payload với biến continue gán là true-> như thế
//thì ta có thể cập nhập action mới(cái này waiter tự làm bên trong)

//=>Có thể thấy đây là 1 cách làm rất khủng vì về mặt cơ chế: ta chỉ cần tạo ra 1 action resource và reducer bảo nó làm gì
//rồi dispatch start nó-> gọi success hay error để thực hiện là xong. Vc gọi đó tự làm với creator or làm trong saga. Thế
//nhưng ở TH này nó start mà lại thông qua những 2 hàm 1 là startActionWithPromise và promise->để gom lấy đối số bên
//ngoài đồng thời kiểm tra thêm với promise-> start xong. Để gọi success/error nó lại cho thông qua 1 hàm boolean và 
//waiter để cập nhập action có cả biến tự thêm từ đầu, extra argument, (và resolve,continue,action 3 loại) nx.

//Thế là ta có 4 hàm check lỗi-> hàm fail ban đầu ở class; hàm trong promise->hàm error của reducer của ta; hàm 
//rejectResult gọi hai hàm fail và promise trc or tự thêm cái gì khác cx ok luôn. Nhưng thật ra trong đó chỉ có hàm fail
//ban đầu và hàm error của reducer là ta lấy đối số thực tế để trả vào class và state của reducer để có giá trị trả ra 
//lên màn hình mà thôi

//Cơ chế->tạo resource->start->reducer xủ lý start->cho success->reducer xử lý success->lấy state+isWaiting sử dụng

//Thật ra thứ ta mong muốn bth nó k phức tạp như v. T cần khi ấn nút->thì thực hiện sự kiện nhưng trong quá trình thực
//hiện thì component đó sẽ hiển thị loading k cho tương tác với component đó-> thực hiện xong thì hiển thị lại bth.
//Đồng thời component đó là bất đồng bộ để khi làm vẫn thao tác với cái khác đc, sự kiện click nhiều thì chỉ lấy 1 lần
//=>saga với takeLastest+call+put là đủ làm điều này rồi. Trừ khi có TH phức tạp hơn ms động đến reducer
//thậm chí ở TH đơn giản nhất còn chả đụng đến promise hay async, wait cơ. Nhưng như thế vẫn cùi bắp. ta còn muốn là 
//ấn 1 phát thì bản thân cái action đó cx là bất đồng bộ luôn. Nó tách ra 1 luông riêng xong khi xử lý callAPI chẳng hạn
//thì nó lại tách 1 luồng riêng nx với put. Do đó đẻ ra ví dụ 3 ngay từ đầu đã là bất đồng bộ, mà bên trong async wait
//ta muốn thực hiện bất đồng bộ hàm dispatch thì lại async wait or promise như trên

//Nghiên cứu về sự bất đồng bộ login file này: ấn nút thực hiện bất đồng bộ, bh có 2 luồng(2)-> await thực hiện đồng bộ
//bên trong luồng thứ 2-> startActionWithPromise->withPromiseAndDispath->gặp promise thực hiện bên trong theo thứ tự
//dispatch action->saga dùng takeEvery bắt được thực hiện bất đồng bộ(3)->luồng 2 reducer xử lý hàm start rồi in ra
//AAAAAAAAA->và kết thúc->luồng 3 thực hiện userLogin-> giả sử thành công chạy vào khối try của sagaPromise-> put action
//->success(4, luồng 2 đã kết thúc)->luồng 4 là reducer thực hiện success r trả vào state mới cho class lấy bằng hook
//và két thúc-> luồng 3 đi tiếp gọi resolve()sẽ tạo(5)->luồng 5 sẽ thực hiện then và két thúc->luồng 4 đi tiếp gọi
//successCallback và kết thúc->các luồng của await kết thúc nên đi tiếp trong hàm async ban đầu r kết thúc hết
//đó là bản chất của việc xử lý bất đồng bộ đươc tách ra các luồng liên tiếp sẽ tối ưu vc xử lý. Chỉ cần 1 lệnh thực 
//hiện mà bên dưới k dùng nó, đọc lập k liên quan đến lệnh dưới or bắt lỗi bất đồng bộ lập tức dùng như v ngay

//Vấn đề dùng promise ở trên giúp giải quyết: khi ta dispatch 1 action, saga bắt được và cho success hay error, nhưng
//ta k cần những thứ đó mà muốn kết quả trả về của dispatch cơ. Mặc định thì dispatch trả ra action mà nó truyền đi, dùng
//cách trên ta lấy đc kết quả trả về của dispatch ở file Login.js là true. Cơ chế: dispatch k lấy đc giá trị trả về->
//bao nó bằng 1 promise, bao promise với async await-> thực hiện nó r trả về kết quả cho promise resolve hay reject(gía
//trị muốn trả về) or dùng then cho return đều đc-> async wait sẽ buộc chờ promise đó và lấy két quả là loginResponse
//dùng tiếp biến đó trong class => thế là nhờ 2 hàm đàu file, ta có thể gọi sự kiện, thực hiện, trả ra kết quả mà k cần
//phải thông qua reducer rồi map về nx, ta làm cứ như theo 1 thứ tự từ trên xuống ở file Login.js v
//=>cái hay là cách biến 1 function thành promise-> cách lấy giá trị trả về của bất cứ function nào