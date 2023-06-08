import React from 'react'
import styled from 'styled-components';
import VideoPlayer from 'renderer/Components/Players/VideoPlayer';
import PlayerControl from 'renderer/Components/Players/PlayerControl';
import ReloadButton from 'renderer/Components/Common/ReloadButton';
import usePlayerSource from 'renderer/hooks/usePlayerSource';
import { isHlsStream } from 'renderer/lib/appUtil';
import CSSToggleMenuWebView from '../Menus/CSSToggleMenuWebView';
import CSSToggleMenuImage from '../Menus/CSSToggleMenuImage';
import CSSToggleMenu from 'renderer/Components/Menus/CSSToggleMenu';

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
    translateX = 0,
    translateY = 0,
    autoplay,
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
    if (!autoplay){
      playerRef.current.currentTime = 0;
      playerRef.current.pause();
    }
  }, [isSwipeActive, playerRef, displayMode, show, autoplay]);

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
    if (displayMode === 'brush') return;
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
    <Container>
      {show && (
        <CSSToggleMenu
          srcId={srcId}
          objectFit={objectFit}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
          autoplay={autoplay}
        />
      )}
      <VideoPlayer
        src={src}
        objectFit={objectFit}
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        // style={{
        //   width: '100%',
        //   height: '100%',
        //   transform: `scale(${scale}) translateX(${translateX}%) translateY(${translateY}%)`,
        // }}
        ref={playerRef}
        onClick={onClick}
        onTouchEnd={onTouchEnd}
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
