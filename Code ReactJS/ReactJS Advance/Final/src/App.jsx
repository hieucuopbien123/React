import UseDebounceLodash1 from "./UseDebounceLodash1";

// # Dùng immutable
import { Map } from "immutable";
import UseThrottleLodash1 from "./UseThrottleLodash";
import CustomDebounce from "./CustomDebounce";
import CustomThrottle from "./CustomThrottle";
import ProgressiveImage from "react-progressive-graceful-image";
import UseWebWorker from "./UseWebWorker";

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
      <UseWebWorker/>

      <UseDebounceLodash1/>
      <UseThrottleLodash1/>
      <CustomDebounce/>
      <CustomThrottle/>

      {/* # Hiển thị ảnh */}
      <ProgressiveImage src={"https://picsum.photos/200/300"} placeholder={"https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0"}>
        {(src, loading) => (
          <img
            className={`image${loading ? " loading" : " loaded"}`}
            src={src}
            alt="sea beach"
            width="700"
            height="465"
          />
        )}
      </ProgressiveImage>
    </div>
  )
}

export default App
