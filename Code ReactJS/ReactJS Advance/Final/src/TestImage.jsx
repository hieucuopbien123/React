import React, { useEffect, useState } from "react";

const TestImage = () => {
  const [url, setURL] = useState(null);
  useEffect(() => {
    setURL("https://images.firstpost.com/wp-content/uploads/2019/02/Mon.jpg");
  }, []);

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {
        !url && (
          <div>Skeleton</div>
        )
      }
      {
        url && (
          <>
            <div style={{
              width: "50%", 
              minWidth: "100px",
              maxWidth: "500px",
              borderRadius: "20px",
              overflow: "hidden"
            }}>
              <img style={{ 
                width: "100%",
                verticalAlign: "bottom",
                boxSizing: "border-box",
                backgroundColor: !imageLoaded ? "transparent" : "gray",
                display: imageLoaded ? "none" : "block"
              }} src={"./logo192.png"} onLoad={() => setImageLoaded(true)} alt=""/>
              <img style={{
                width: "100%",
                verticalAlign: "bottom", // Chặn lỗi thừa pixel dọc
                boxSizing: "border-box", // Chặn lỗi thừa pixel ngang
                backgroundColor: imageLoaded ? "transparent" : "gray", // Có ích nếu kích thước xác định
                display: !imageLoaded ? "none" : "block"
              }} src={url.startsWith("http") ? url : "./logo192.png"} 
                onLoad={() => setImageLoaded(true)} alt=""
                onError={() => setURL("./logo192.png")} // Error image
                loading="lazy"
                // Có thể prefetch ảnh này với <head> link rel="preload" href="path" as="image"></head>
              />
            </div>
          </>
        )
      }
    </>
  )
}

export default TestImage;