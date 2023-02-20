import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
import PlayerControl from 'renderer/Components/Players/PlayerControl';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import usePlayerSource from 'renderer/hooks/usePlayerSource';
import { isHlsStream } from 'renderer/lib/appUtil';
import CSSToggleMenuWebView from '../Menus/CSSToggleMenuWebView';

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
  const {
    assetId,
    src,
    srcId,
    show,
    srcIndex,
    objectFit,
    scale = 1,
    displayMode,
    isSwipeActive,
  } = props;
  const isFirstImage = srcIndex === 0;
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
    if (playerRef.current === null) return;
    if (isSwipeActive && displayMode === 'swipe' && show) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    };
    if (!isSwipeActive && displayMode === 'swipe' && show) {
      playerRef.current.currentTime = 0;
      playerRef.current.pause();
    };
  }, [isSwipeActive, playerRef, displayMode, show]);

  const reloadPlayer = React.useCallback(() => {
    // const src = asset.source.url;
    if (isHlsStream(src)) {
      loadHLS();
      return;
    }
    playerRef.current.src = src;
    playerRef.current.load();
  }, [loadHLS, src]);

  const onClick = React.useCallback(() => {
    if (playerRef.current.paused) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [playerRef]);

  const onTouchEnd = React.useCallback((event) => {
    event.preventDefault();
    onClick();
    },
    [onClick]
  );

  return (
    <Container onClick={onClick} onTouchEnd={onTouchEnd}>
      {show && (
        <CSSToggleMenuWebView
          srcId={srcId}
          scale={scale}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
        />
      )}
      <VideoPlayer
        src={src}
        objectFit={objectFit}
        scale={scale}
        ref={playerRef}
      />
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
