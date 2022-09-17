import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
import usePlayerSource from 'renderer/hooks/usePlayerSource';
import usePlayerEvent from 'renderer/hooks/usePlayerEvent';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Player = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('re-render Player props =', props);
  const { assetId: sourceId, source } = props;
  const { url } = source;
  const playerRef = React.useRef(null);
  usePlayerSource(sourceId, url, playerRef);
  const {
    isPlaying,
    getCurrentTime,
    getDuration,
    onClickPlay,
    onClickForward10,
  } = usePlayerEvent(playerRef, sourceId);

  return (
    <Container>
      <VideoPlayer {...props} ref={playerRef} />
    </Container>
  )
}

export default React.memo(Player);
