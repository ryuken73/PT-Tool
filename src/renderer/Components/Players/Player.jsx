import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
import PlayerControl from 'renderer/Components/Players/PlayerControl';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import usePlayerSource from 'renderer/hooks/usePlayerSource';
import usePlayerEvent from 'renderer/hooks/usePlayerEvent';
import { isHlsStream } from 'renderer/lib/appUtil';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Player = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('re-render Player props =', props);
  const { asset } = props;
  const playerRef = React.useRef(null);
  const { loadHLS } = usePlayerSource(asset, playerRef);

  const reloadPlayer = React.useCallback(() => {
    const src = asset.source.url;
    if (isHlsStream(src)) {
      loadHLS();
      return;
    }
    playerRef.current.src = src;
    playerRef.current.load();
  }, [loadHLS, asset]);

  return (
    <Container>
      <VideoPlayer {...props} ref={playerRef} />
      <PlayerControl ref={playerRef} asset={asset} />
      <ReloadButton reload={reloadPlayer} />
    </Container>
  )
}

export default React.memo(Player);
