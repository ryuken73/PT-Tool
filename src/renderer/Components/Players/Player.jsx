import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
import PlayerControl from 'renderer/Components/Players/PlayerControl';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import usePlayerSource from 'renderer/hooks/usePlayerSource';
import { isHlsStream } from 'renderer/lib/appUtil';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Player = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('re-render Player props =', props);
  // const { asset } = props;
  // eslint-disable-next-line react/prop-types
  const { assetId, src, srcId, show, srcIndex, objectFit, isSwipeActive } = props;
  const playerRef = React.useRef(null);
  const { loadHLS } = usePlayerSource(
    assetId,
    src,
    srcId,
    playerRef,
    show,
    srcIndex
  );

  React.useEffect(() => {
    console.log('$$$$$',srcIndex, isSwipeActive);
    if (playerRef.current === null) return;
    if (isSwipeActive) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    }
  }, [isSwipeActive, playerRef]);

  const reloadPlayer = React.useCallback(() => {
    // const src = asset.source.url;
    if (isHlsStream(src)) {
      loadHLS();
      return;
    }
    playerRef.current.src = src;
    playerRef.current.load();
  }, [loadHLS, src]);

  return (
    <Container>
      <VideoPlayer src={src} objectFit={objectFit} ref={playerRef} />
      <PlayerControl
        ref={playerRef}
        assetId={assetId}
        src={src}
        srcId={srcId}
        srcIndex={srcIndex}
      />
      <ReloadButton reload={reloadPlayer} />
    </Container>
  )
}

export default React.memo(Player);
