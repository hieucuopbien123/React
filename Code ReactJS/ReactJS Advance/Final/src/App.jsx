import UseDebounceLodash1 from "./UseDebounceLodash1";

// # Dùng immutable
import { Map } from "immutable";
import UseThrottleLodash1 from "./UseThrottleLodash";
import CustomDebounce from "./CustomDebounce";
import CustomThrottle from "./CustomThrottle";

const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = Map({ a: 1, b: 2, c: 3 });
console.log(map1.equals(map2)); // true
console.log(map1 === map2); // false

var map3 = map1.set('b', 50);
console.log(map1.get('b')); // 2
console.log(map3.get('b')); // 50
// => Có thể đảm bảo như trên vì biết chắc biến nào tạo ra sẽ k đổi giá trị gốc

function App() {
  return (
    <div>
      <UseDebounceLodash1/>
      <UseThrottleLodash1/>
      <CustomDebounce/>
      <CustomThrottle/>
    </div>
  )
}

export default App
