// # Dùng các thư viện chức năng / react-awesome-reveal

import Reveal, { Slide, Fade } from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-200px, -100px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

function ReactAwesomeReveal() {
  return (
    <div>
      <Slide triggerOnce>
        <p>I will animate only the first time you see me</p>
      </Slide>
      <Fade delay={1e3} cascade damping={0.1}>
        Easy-to-use animation library for React apps
      </Fade>
      <Reveal keyframes={customAnimation}>
        Hello
      </Reveal>

    </div>
  )
}

export default ReactAwesomeReveal
