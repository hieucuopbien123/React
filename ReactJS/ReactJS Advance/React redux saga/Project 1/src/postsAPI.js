import axios from 'axios';

export const  getPostData = () => {
  // return axios.get('https://jsonplaceholder.typicode.com/posts');

  // return axios({
  //   method: "GET",
  //   url: 'https://jsonplaceholder.typicode.com/posts'
  // })

  //fetch là 1 hàm promise, tức bên trong nó xử lý mọi thứ như bth, nhưng nó để vc xử lý ở trong then, sau đó trả 
  //ra biến response và return response; -> rất đơn giản ta gọi nó .then tiếp để nó đi tiếp thôi. Các hàm nói là hàm 
  //promise đều là như v
  // return new Promise((resolve, reject) => {
  //   const url = 'https://jsonplaceholder.typicode.com/posts';
  //   if(!('fetch' in window)){
  //     console.log("Fetch API not found, try including the polyfill");
  //     return;
  //   }
  //   fetch(url, {
  //     method: 'GET'
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       console.log(response.headers.get('Content-Type'));
  //       console.log(response.type);//trả ra basic, cors, opaque
  //       console.log(response.url);

  //       if (!response.ok) {
  //         console.log("Mã lỗi: ", response.status);
  //         throw Error(response.statusText);
  //       }
  //       return response.json()})
  //     .then((res) => {
  //       console.log(res);
  //       resolve({data: res });//do promise cứ khai báo là thực hiện nên ở đây nó thực hiện đến đây luôn
  //     })
  //     .catch((error) => {
  //       reject(error);
  //     });
  // });
  //câu hỏi: tại sao phải dùng promise bao lấy fetch-> hiểu bản chất bất đồng bộ và đồng bộ thì éo cần nhé. Làm như 
  //dưới cx đc vì nó lấy đc giá trị return mà. Nếu dùng như trên k có vai trò gì bất đồng bộ hết vì bên trong promise
  //(kp trong then) thực hiện theo thứ tự mà

  return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET'
    })
      .then((response) => {
        console.log(response);
        console.log(response.headers.get('Content-Type'));
        console.log(response.type);

        if (!response.ok) {
          console.log("Mã lỗi: ", response.status);
          throw Error(response.statusText);
        }
        return response.json()})//.json() phát là ra ngay các object
      .then((res) => {
        console.log(res);
        return {data: res };//Nên return ra 1 object cho dễ hiểu
      })
      .catch((error) => {
        return error;
      });
}
//khi viết code cho web site có hàng tá web APIs mà ta có thể sử dụng. Miễn là trình duyệt có hỗ trợ thì ta
//có thể dùng nó để viết code cho web. Các web APIs phần lớn đc dùng với js nên dùng js rất có lợi. 
//VD hàm json hay fetch là web APIs mà ta có thể dùng mà k cần cài các thư viện khác như axios. Có thể dùng nó
//truy cập vào hê thống DOM, CSS, rest api với server
//lệnh fetch là 1 API thông dụng của web API, xử lý dễ dàng hơn thao tác cũ là XMLHttpRequest. Các API này có
//trong window của ta luôn. Ở trên chính là lệnh kiểm tra API có k. Đôi khi trình duyệt cũ k hỗ trợ, lúc đó 
//ta phải viết các hàm của riêng ta or phải tải về polyfill-1 tập hợp đoạn mã js trên web. Khi ta tạo dự án 
//bth cx đã tự có polyfill r,chỉ có IE ngày xưa ms phải cài polyfill thủ công thôi

//Hàm fetch('<link có dữ liệu cần xử lý>',{optional object}) trả ra 1 promise luôn là resolve(<response>), nó chỉ thất 
//bại duy nhất khi k có kết nối mạng; response nhận đc ở then đầu tiên là 1 object lưu các thứ như response.ok, 
//response.status, response.statusText, url để xem xét các TT của dữ liệu thành công hay k như ví dụ trên.Đối số 2 thg có
//{method: POST,headers:{"Content-Type:application/<>;charset=UTF-8"},body:'<foo=bar&lorem=ipsum>'}
//=> đó là gửi lên dữ liệu dạng string, gửi lên dạng json với JSON.stringify(<object>)
//Để xác thực thông tin: đối số 2 thêm {credentials:"include(same-origin/ omit)"}=>là đi kèm cookie; same-origin là gửi
//request cùng nhà; omit thì k cho trình duyệt gửi thông tin xác thực. VD:
/*  fetch(url, {
  credentials: 'include';//include gửi kèm thông tin xác thực cookie(user là ai)
})
*/

//Để truy cập vào nd trả về dùng phương thức .json() của response(chỉ đc gọi 1 lần)

//Các response.type: basic nếu ứng dụng gửi request cho server cùng nhà. K có giới hạn vc xem thông tin
//trên response; cors: tức server và client cách xa nhau, lúc đó ta bị giới hạn, chỉ biết đc ít thông tin hơn
//opaque: cho các request ở xa nhưng lại k nhận cors, k xem đc dữ liệu, k xem đc status luôn. TH này xảy ra
//khi ng dùng server chủ động cấm cors chứ bth vẫn truy cập đc
//trả về cors, ta có thể truy cập vào các thành phần headers: Cache-Control, Content-Language, Content-Type,
//Expires, Last-Modified, Pragma => vd trên truy cập vào Content-Type đó
/*
// VD upload multiple file lên server:
// đầu tiên nạp nội dung vào thẻ input-> tạo 1 form-> lấy nội dung thẻ input->nhét files đo vào form->nhét nó vào 
//phần body vói method POST lên server
var formData = new FormData();
var photos = document.querySelector("input[type='file'][multiple]");
formData.append('title', 'My Vegas Vacation');
formData.append('photos', photos.files);
fetch('https://example.com/posts', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
*/