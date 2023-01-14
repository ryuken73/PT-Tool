import React from 'react';
import styled from 'styled-components';
// import TransitionVideo from 'renderer/assets/SBS_Transition.mp4';
import ToRight from 'renderer/assets/toRight.webm';
import ToLeft from 'renderer/assets/toLeft.webm';
import Blur from 'renderer/assets/blur.webm';
import SplitUp from 'renderer/assets/splitUp.webm';

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 10000;
  border: ${(props) => (props.debug === 'yes' ? '3px red solid' : 'none')};
  background: ${(props) => (props.debug === 'yes' ? 'maroon' : 'transparent')};
`;
const CustomVideo = styled.video`
  background: transparent;
`;
const recourceMap = {
  toRight: ToRight,
  toLeft: ToLeft,
  blur: Blur,
  splitUp: SplitUp
};

function VideoTransition(props) {
  // eslint-disable-next-line react/prop-types
  const { handleVideoEnded, transitionResource } = props;
  const videoRef = React.useRef(null);
  const src = recourceMap[transitionResource];
  React.useEffect(() => {
    if (videoRef.current === null) {
      return;
    }
    videoRef.currentTime = 0;
    videoRef.current.play();
  }, []);
  return (
    <Container>
      <CustomVideo
        ref={videoRef}
        src={src}
        onEnded={handleVideoEnded}
        controls={false}
      />
    </Container>
  )
}

export default React.memo(VideoTransition);
