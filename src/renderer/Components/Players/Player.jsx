import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
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
  // const { assetId: sourceId, source } = props.asset;
  // const { url } = source;
  const playerRef = React.useRef(null);
  const { loadHLS } = usePlayerSource(asset, playerRef);
  const {
    isPlaying,
    getCurrentTime,
    getDuration,
    onClickPlay,
    onClickReload,
    onClickForward10,
  } = usePlayerEvent(asset, playerRef);

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
      <ReloadButton reload={reloadPlayer} />
    </Container>
  )
}

export default React.memo(Player);
