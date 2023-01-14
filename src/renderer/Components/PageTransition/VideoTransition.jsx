import React from 'react';
import styled from 'styled-components';
// import TransitionVideo from 'renderer/assets/SBS_Transition.mp4';
import TransitionVideo from 'renderer/assets/toLeft.webm';

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
`

function VideoTransition(props) {
  const {handleVideoEnded} = props;
  const videoRef = React.useRef(null);
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
        src={TransitionVideo}
        onEnded={handleVideoEnded}
        controls={false}
      />
    </Container>
  )
}

export default React.memo(VideoTransition);
