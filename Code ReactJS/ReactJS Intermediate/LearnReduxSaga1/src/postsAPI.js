import axios from 'axios';

export const getPostData = () => {
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
  //(kp trong then) thực hiện theo thứ tự mà. Nhưng nếu có promise thì sẽ specific error để try catch ở file saga bắt
  //vì nếu catch error như dưới nó hiểu là resolve thì try catch ở file saga chả bh hoạt động => ngáo, chỉ cần gọi
  //reject tiếp trong catch là được thôi

  return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET'
    })
      .then((response) => {
        console.log(response);
        console.log(response.headers.get('Content-Type'));// Truy cập vào Content-Type đó
        console.log(response.type);

        if (!response.ok) {
          console.log("Mã lỗi: ", response.status);
          throw Error(response.statusText);
        }
        return response.json()})//.json() phát là ra ngay các object
        // Để truy cập vào nd trả về dùng phương thức .json() của response(chỉ đc gọi 1 lần)
      .then((res) => {
        console.log(res);
        return {data: res };//Nên return ra 1 object cho dễ hiểu
      })
      .catch((error) => {
        return error;
      });
}