import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";
const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000)
);
function bblSort(arr){
  for(var i = 0; i < arr.length; i++){
    for(var j = 0; j < (arr.length - i - 1); j++){
      if(arr[j] > arr[j+1]){
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  console.log(arr);
}

function SortingArray() {
  // Trương hợp block ui
  const [sortStatus, setSortStatus] = React.useState(false);
  const onSortClick = () => {
    setSortStatus(true);
    const result = bblSort(numbers);
    setSortStatus(false);
    console.log("Finish normal sort")
  };

  // Trường hợp dùng useWorker
  // Lấy được status, hàm worker cứ truyền hàm gì vào làm hàm đó được gọi trên 1 worker riêng
  const [sortWorker, { status: sortWorkerStatus }] = useWorker(bblSort);
  console.log("WORKER:", sortWorkerStatus);
  
  const onWorkerSortClick = () => {
    sortWorker(numbers).then((result) => {
      console.log("Buble Sort useWorker()", result);
      console.log("Finish bubble sort");
    });
  };

  return (
    <div>
      <button
        type="button"
        disabled={sortStatus}
        onClick={() => onSortClick()}
      >
        {sortStatus ? `Loading...` : `Buble Sort`}
      </button>
      <button
        type="button"
        disabled={sortWorkerStatus === WORKER_STATUS.RUNNING}
        onClick={() => onWorkerSortClick()}
      >
        {sortWorkerStatus === WORKER_STATUS.RUNNING
          ? `Loading...`
          : `Buble Sort useWorker()`}
      </button>
    </div>
  );
}

export default SortingArray;