import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { isWaiting, useWaiter } from 'redux-waiters'
import { increAction, subtractActionCreator, subtractAction, multiplyActionCreator, multiplyAction } from './reducers/counter'

const isIncrSelector = isWaiting(increAction.id)
const isMultiplySelector = isWaiting(multiplyAction.id)
const isSubtractSelector = isWaiting(subtractAction.id)

function Counter() {
  //useState của react hook; use Dispatch/useSelector của react-redux; useWaiter của redux-waiters->ptr từ hook hết
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter)
  const [isIncr] = useWaiter(isIncrSelector)
  const [isMultiply] = useWaiter(isMultiplySelector)
  const [isSubtracting] = useWaiter(isSubtractSelector)

  const handleClick = async () => {
    console.log("Click")
    await dispatch(increAction.start(1));
  }
  return (
    <>
      <button onClick={() => dispatch(multiplyActionCreator(2))}>Multiply with 2</button>
      <button onClick={() => dispatch(subtractActionCreator())}>Desc</button>
      <button onClick={() => handleClick()}>Incr</button>

      Counter: {counter}
      {
        isIncr && <p>Loading...</p>
      }
      {
        isMultiply && <p>Mutiplying...</p>
      }
      {
        isSubtracting && <p>Substracting...</p>
      }
    </>
  );
}

export default React.memo(Counter);
//class component có thể k render khi props đc truyền vào là giống nhau bằng cách sử dụng pureComponent(k học) và
//shouldComponentUpdate, nhưng điều này đc làm sẵn cho ta luôn, vì khi ta dùng redux để truyền mapStateToProps liên
//tục nhưng nó có render éo đâu. 
//Cách mới là React.memo(<component>)(bh thì k mới nx) là 1 higher order component. Nó sẽ ghi nhớ kết quả nếu cung
//cùng 1 props thì nó bỏ qua vc render, dùng ez như ví dụ này thôi. Nhưng nó chỉ shallowly compare với các object
//phức tạp, nếu muốn kiểm soát thì truyền thêm đối số 2 là hàm so sánh
// function areEqual(prevProps, nextProps) {
//   /*Tự viết hàm ss Trả về true nếu nextProps bằng prevProps, ngược lại trả về false */
// }
// export default React.memo(MyComponent, areEqual);
//shallowly compare là so sanh giá trị khi vô hướng và tham chiếu khi có hướng. 
//shallow copy là copy vẫn còn liên quan tới biến ban đầu, deepcopy là copy hoàn toàn, cắt đứt qh biến bđ