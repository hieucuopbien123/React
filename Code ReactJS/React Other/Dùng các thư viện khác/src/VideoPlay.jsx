// # Các thư viện components / react-player

import ReactPlayer from 'react-player/youtube' // có react-player/lazy cho phép load video lazy

const Vid = () => {
    return(
        <ReactPlayer
            url={"https://www.youtube.com/watch?v=7sDY4m8KNLc"}
            pip={true}
            playing={false}
            controls={false}
            light={false}
            loop={false}
            playbackRate={1.0}
            volume={0.8}
            muted={true}
        />
    );
};

export default Vid;