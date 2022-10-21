import React from 'react';

const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  return `https://picsum.photos/id/${randomId}/300/300`;
}

function RandomPhoto(props) {
  const { name, imageUrl, onImageUrlChange, onRandomButtonBlur } = props;

  const handleRandomPhotoClick = async () => {
    if (onImageUrlChange) {
      const randomImageUrl = getRandomImageUrl();
      onImageUrlChange(randomImageUrl)
    }
  }

  return (
    <div>
      <button
        name={name}
        onBlur={onRandomButtonBlur}
        onClick={handleRandomPhotoClick}
      >
        Random a photo
      </button>
      <div>
        {imageUrl && <img src={imageUrl} alt="Ooops ... not found. Please click random again!" />}
      </div>
    </div>
  );
}

export default RandomPhoto; 