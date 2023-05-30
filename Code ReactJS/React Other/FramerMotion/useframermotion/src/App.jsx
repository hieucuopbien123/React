import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

function App() {
  const [show, setShow] = useState(true);
  const [showCard, setShowCard] = useState(false);

  return (
    <>
      {/* Path animation */}
      {/* 1 path cơ bản được cấu tạo tối thiểu như sau: */}
      <svg width="427" height="84" viewBox="0 0 427 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 39.5C38.6667 10.1667 137.3 -30.9 230.5 39.5C323.7 109.9 399.667 78.5 426 54" stroke="black"/>
      </svg>
      {/* Để có animation 1 path, giới thiệu thêm 2 thuộc tính: 
        stroke-dasharray biến path thành dashed line. VD: "10 10" thì 1 dash dài 10px và gap giữa các dash là 10px
        stroke-dashoffset đẩy pattern dashed line đi 1 đoạn là bnh trên hình path gốc
        => Để có animation: ta cho đường dash length và gap dài bằng path gốc luôn. R dung stroke-dashoffset để dịch path đến vị trí hide hoàn toàn đường dash, chỉ hiện mỗi gap ban đầu và animation nó tăng dần.
        Trong JS làm với: var pathLength = document.querySelector(".path").getTotalLength();
      */}
      <div
        className="example"
        style={{
          stroke: "#bf4d00", // tự apply thêm cho con
          border: "none",
          padding: "0",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <motion.svg
          style={{ width: "80%", height: "80%" }}
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1
            }}
            strokeWidth={4}
            fill="none" // k tô màu trong vòng kín của path
            d="M415,275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z"
          />
        </motion.svg>
      </div>
      {/* Vì framermotion tự gán sẵn stroke-dasyarray và stroke-dashoffset. Ta chỉ cần animate cái pathLength phát là xong. Mọi thứ về path và svg khác giữ nguyên */}
      <motion.svg width="100%" height="300px" viewBox="0 0 427 84" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M1 39.5C38.6667 10.1667 137.3 -30.9 230.5 39.5C323.7 109.9 399.667 78.5 426 54" stroke="red" strokeWidth={4}  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
            repeatDelay: 1,
            repeat: Infinity,
          }}
        />
      </motion.svg>

      {/* Animation transform khi xh */}
      <motion.div
        animate={{ x: 200, y: 80, scale: 2 }}
        style={{width: "100px", height: "100px", backgroundColor: "red"}}
      >
      </motion.div>

      {/* Thêm animation khi exit và xh. Vd remove khỏi 1 list */}
      {/* Giá trị animation là 1 biến và biến đó thay đổi giá trị thì cũng có animation chuyển đổi */}
      <AnimatePresence>
        {show && (
          <motion.div
            key= "a box"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 100 }}
            exit={{ opacity: 0, x: -150 }}
            style={{
              height: "140px",
              width: "140px",
              background: "blue",
              position: "relative",
            }}
          ></motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setShow(!show)} style={{padding:"15px 24px", fontSize:"22px"}} >{show? "Remove Cube": "Add Cube"}</button>

      {/* Thư viện tạo gesture animation dễ nhất */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "200px",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
        }}
      >
        <div>
          <p>No contraint</p>
          <motion.div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "blue",
            }}
            drag
          ></motion.div>
        </div>
        <div>
          <p>Drag y only</p>
          <motion.div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "blue",
            }}
            drag= "y"
          ></motion.div>
        </div>
        <div>
          <p>Drag contrainst</p>
          <motion.div
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "blue",
            }}
            drag  
            dragConstraints={{ left: 0, right: 100, top: 10 }}
          ></motion.div>
        </div>
      </div>

      {/* Hover and tap animation */}
      <motion.h1 whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }}>
        Hover and tap on me
      </motion.h1>

      {/* Để click vào thì hiện ra, ta k dùng whiletap mà dùng biến bth. Có thêm motion thì khi hiện ra sẽ tự có animation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "grey",
        }}
      >
        <motion.div
          style={{
            background: "#fff",
            padding: "3rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
          // Dùng transition có thể chỉnh được animation của layout là đổi shape thì custom như nào
          transition={{
            layout: {
              duration: 1,
              type: "spring",
            },
          }}
          // Dùng thêm layout để animation được ổn định khi component thay đổi shape or size
          layout
          onClick={() => setShowCard(!showCard)}
        >
          <motion.h4 layout="position">Hover or click</motion.h4>
          {showCard && (
            <motion.p
              style={{ width: "600px" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
            >
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum
              error reiciendis iure architecto qui magni, excepturi voluptatum
              repudiandae nihil rerum eveniet pariatur ipsa velit similique et
              aliquam, deserunt totam explicabo.
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* AnimationPresence và motion mặc định tạo animation khi lần đầu mount và unmount. Dùng initial và whileInView sẽ custom được mỗi khi nó vào viewport dựa vào scroll */}
      <div style={{ minHeight: "250vh" }}>
        <motion.p initial={{ opacity: 0, x:0  }} whileInView={{ opacity: 1, x:500 }} style={{fontSize:"150px", marginBottom:"200px"}}>
          Item one
        </motion.p>
        <motion.p initial={{ opacity: 0, x:700 }} whileInView={{ opacity: 1, x:200 }} style={{fontSize:"150px", marginBottom:"200px"}}>
          Item one
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{fontSize:"150px", marginBottom:"200px"}}>
          Item one
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{fontSize:"150px", marginBottom:"200px"}}>
          Item one
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{fontSize:"150px", marginBottom:"200px"}}>
          Item one
        </motion.p>
      </div>

      {/* Custom animation tranform */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "grey",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <motion.div
          style={{
            width: 200,
            height: 200,
            background: "white",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          animate={{
            x: 500,
            transition: {
              duration: 2,
              type: "tween", // 3 loại tween(là uniform), spring (nhanh r chậm dần) và inertia(nảy như quả bóng nảy xuống đất có trọng lực)
            },
          }}
        >Tween</motion.div>
        <motion.div
          style={{
            width: 200,
            height: 200,
            background: "white",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          // inertia transition
          animate={{
            x: 800,
            transition:{
              duration: 2,
              type: "inertia",
              velocity: 800
            }
          }}
        >Inertia</motion.div>
        <motion.div
          style={{
            width: 200,
            height: 200,
            background: "white",
            borderRadius: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          // spring transition
          animate={{
            x: 500,
            transition:{
              duration: 2,
              type: "spring",
              bounce: 0.5
            },
          }}
        >Spring</motion.div>
      </div>

      {/* Dùng multiple value với arrays */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <motion.div
          style={{
            height: "200px",
            width: "200px",
            background: "blue",
          }}
          animate={{
            // Tự chia theo phần chia thời gian
            x: [100, 200, 400, 150],
            y: [100, 200, -300, 150],
            scale: [1, 1.2, 1.4, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
            },
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        ></motion.div>
      </div>
    </>
  )
}

export default App
