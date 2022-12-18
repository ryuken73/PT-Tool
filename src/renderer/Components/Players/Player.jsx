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
  const { assetId, src, srcId, show, srcIndex, objectFit } = props;
  const playerRef = React.useRef(null);
  const { loadHLS } = usePlayerSource(assetId, src, srcId, playerRef, show, srcIndex);

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
      />
      <ReloadButton reload={reloadPlayer} />
    </Container>
  )
}

export default React.memo(Player);
