import { all, takeEvery, delay, put, takeLatest } from 'redux-saga/effects'

import { increAction } from './reducers/counter'
import { loginAction } from './reducers/login'

import { sagaPromise } from './utils/saga-promise-helpers'

function* incrCounter(action) {
  try {
    console.log('call incrCounter start', action)
    yield delay(4000)
    console.log('call increcounter continue')
    yield put(increAction.success(1));
    console.log('call incr success')
  } catch (err) {
    console.log('err', err)
    return 'erro';
  }
}
function* watchIncrCounter() {
  console.log("saga increase counter");
  yield takeLatest(increAction.start, increAction.waiterActionForSaga(incrCounter))
}
//saga kiểm soát action đến như bth, có điều waiterActionForSaga sẽ thực hiện update dữ liệu cho biến action, gán
//continue bằng true r sau đó thực hiện bên trong incrCounter như bth. Hàm gián đoạn ông chủ và công nhân 1 thời
//gian ngắn để update action 

//watchLog ez k có gì đáng nói
function* watchLog() {
  yield takeEvery('*', function* log(action) {
    console.log('action', action)
  })
}

//chạy saga, thực hiện lệnh error
function* userLogin() {
  // //Simulate login successful
  const loginResult = true;
  yield delay(4000);
  return loginResult;

  // Simulate login failed
  // console.log("user login")
  // yield delay(2000);
  // throw new Error('not found');
}
function* watchLogin() {
  yield takeEvery(loginAction.start, loginAction.waiterActionForSaga(sagaPromise(userLogin)));
}//waiterActionForSaga cài waiter cho saga

export default function* rootSaga() {
  yield all([
    watchIncrCounter(),
    watchLog(),
    watchLogin()
  ])
}