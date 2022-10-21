// # Module redux
// Dùng react-redux hook

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addCount } from "./actions/actions.js";
import TestFetchAxios from "./components/TestFetch";

function App() {
  const dispatch = useDispatch();
  //Luồng HĐ tương tự: useDispatch là tham chiếu đến hàm dispatch của redux, useSelector là dùng biến state nào
  //thay vì truyền xuống từng cấp 1 thì dùng redux hook sẽ ra riêng function component nào có thì gọi 
  //2 cái này chứ chả phải truyền từ đâu cả. Khi dispatch, action sẽ bắn ra cho store bắt và reducer xử lý
  //trả ra giá trị cho biến state dùng trong useSelector bắt được để cập nhập biến count class này

  const { count, count1 } = useSelector(state => ({ 
    // chú ý kiểu gán lấy {} là lấy 1 phần của object phải đúng
    // dùng redux toolkit thì mọi thứ sẽ rất khác, cách dùng với redux thuần như này thì bỏ
    count: state.count,
    count1: state.count
  }), shallowEqual)
  //useSelector nó định nghĩa việc lấy gì từ state, trong reducer trả ra thì là 1 object, trong đây ta thích
  //return 1 số hay gì cx đc. useSelector chỉ được thực hiện và hàm sẽ rerender lại khi nó so sánh giá trị 
  //trước đó và giá trị hiện tại có sự thay đổi
  //useSelector dùng so sánh ===, ta có thể chuyển sang so sánh nông với shallowEqual. Hàm connect cũ của redux cx dùng
  //ss nông. Dùng so sánh tham chiếu === thì chỉ cần đổi 1 chút cũng là khác và render lại còn shallow nó nhẹ hơn

  return (
    <main>
      <div>Count: {count}</div>
      <button onClick={() => dispatch(addCount(count))}>Add to count</button>
      <TestFetchAxios/>
    </main>
  );
}

export default App;

//useDispatch và useSelector gọn hơn về cách code vì k còn connect với HOC nhưng dễ loạn nếu k dùng cẩn thận và
//performance cũng chỉ như redux bth k hơn => nên luôn dùng hook