import React, { useId, useState, useMemo, useTransition, useDeferredValue } from "react";
import StudentList from "./StudentList";
import studentListData from "./mockstudentlist.json";

const Form = () => {
  // Dùng useId giúp tái sử dụng Form này ở nhiều nơi và vẫn chuẩn tính năng focus
  const id = useId();
  const [searchInput, setSearchInput] = useState("");

  // Có thể import {startTransition} from "react"; nếu k cần dùng isPending
  // Có thể đặt tên khác k nhất thiết là isPending và startTranstition khi dùng hook
  // const [isPending, startTransition] = useTransition();
  // const [filterText, setFilterText] = useState("");

  // Dùng useDeferredValue kém hơn vì k có biến isPending nhưng nhiều TH k dùng được startTransition thì phải dùng
  // useDeferredValue. List có tầm 2 ngàn phần tử sẽ thấy input rất lag khi gõ bởi vì khi ta gõ thì cứ mỗi phần
  // tử input, nó lại chạy 1 lần hàm này để render và đặc biệt sẽ gọi hàm map bên dưới chạy qua 2000 phần tử mấy 
  // lần liền. Nch là cái hook này dùng khi value được thay đổi 1 cách liên tục và ta chỉ muốn nó dùng value cuối.
  const filterText = useDeferredValue(searchInput);

  // Dùng useMemo
  const data = useMemo(() => {
    return studentListData.map(student => {
      const index = student.indexOf(filterText);
      return index === -1 ? <p>{student}</p> 
        : <p>
            {student.slice(0, index)}
            <span style={{backgroundColor: "yellow"}}>
              {student.slice(index, index + filterText.length)}
            </span>
            {student.slice(index + filterText.length)}
          </p>
    })
  }, [filterText]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    // startTransition(() => {
    //   setFilterText(e.target.value);
    // });
  }

  return (
    <div>
      <label htmlFor={id}>Search: </label>
      <input type="text" name="name" id={id} onChange={handleSearchInputChange}/>
      {/* {isPending ? <div>Loading ....</div> : <StudentList data={data}/>} */}
      <StudentList data={data}/>
    </div>
  );
}

export default Form;
