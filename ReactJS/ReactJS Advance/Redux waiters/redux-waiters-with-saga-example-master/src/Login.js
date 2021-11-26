import React from 'react'
import { useDispatch } from 'react-redux'
import { loginAction } from './reducers/login'
import { isWaiting, useWaiter } from 'redux-waiters'
import { startActionWithPromise } from './utils/saga-promise-helpers'

const isLoginSelector = isWaiting(loginAction.id)

function Login() {
  const dispatch = useDispatch();
  const [isLogining] = useWaiter(isLoginSelector);
  //use waiter luôn mà k cần map
  //nếu dùng useSelector lấy biến login ra thì là false như mặc định ban đầu

  const successCallback = (result) => {
    console.log('success callback', result)
  }

  const failedCallback = (error) => {
    console.log('fail callback', error)
  }

  const handleLogin = async () => {
    try {
      console.log("Run handle login")
      const loginResponse = await startActionWithPromise(loginAction, { username: 'truong', password: '1234', successCallback, failedCallback }, dispatch);
      //Cách dung: async có phạm vi bất đồng bộ ở bên trong nó nhưng bên trong của bên trong thì lại k, tức là hàm 
      //startActionWithPromise thực hiện xong thì mới chạy bên dưới. Nhưng bên trong startActionWithPromise sẽ là đồng
      //bộ nên k cần await nx. Muốn dùng bất đồng bộ trong đó lúc nào cx đc với promise or async wait.
      //Chú ý: startActionWithPromise thực hiện xong mới đi xuống dưới, thực hiện xong ở đây tức là mọi luồng. Nếu bên
      //trong chia ra nhiều luồng thì tất cả phải end hết mới đi xuống dưới. Hay là dispatch và xử lý xong hết
      console.log('login ok with response', loginResponse);
    } catch (error) {
      console.log('error occurred when logged in', error)
    }
  }

  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
      {
        isLogining && <p>Logining...</p>
      }
    </>
  )
}

export default React.memo(Login)

// hiển thị và gọi hàm để dispatch action start cái login