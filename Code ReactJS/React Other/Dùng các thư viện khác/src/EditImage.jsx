// # Các thư viện components / react-avatar-edit

import React, { useState } from 'react'
import Avatar from "react-avatar-edit";

function MyEditor () {
  const [img, setImg] = useState();
  const [preview, setPreview] = useState(null);

  const handleInputFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if(file.size > 102400){
      console.log({error: "File size cannot exceed more than 100MB"});
    } else {
      setImg(file);
    }
  };
  const handleCrop = (croppedImg) => {
    setPreview(croppedImg);
  }

  return (
    <div>
      New File: <input type="file" onChange={handleInputFile} accept="image/*"/>
      <br />
      <Avatar
        width={390}
        height={295}
        onCrop={handleCrop}
        onClose={() => setPreview(null)}
        src={img || "https://fakeimg.pl/300/"}
      />
      <div style={{minHeight: "300px"}}>
        <img src={preview} alt="Preview" />
      </div>
    </div>
  )
}

export default MyEditor