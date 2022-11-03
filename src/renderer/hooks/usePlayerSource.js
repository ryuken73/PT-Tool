import React from 'react';
import Hls from 'hls.js';
import { secondsToTime, isHlsStream } from 'renderer/lib/appUtil';
import { setItemValue } from 'renderer/Components/Assets/assetSlice';
import { setPlayerStatus } from 'renderer/Components/Players/playerSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function usePlayer(
  assetId,
  src,
  srcId,
  mediaElementRef,
  show,
  srcIndex
) {
  const dispatch = useDispatch();
  const playerId = srcId;
  const hlsRef = React.useRef(null);
  const asset = useSelector((state) =>
    state.asset.assets.find((asset) => asset.assetId === assetId)
  );
  const { displayMode } = asset;

  const handleLoadedMetadata = React.useCallback(
    (event) => {
      console.log(
        'in usePlayerSource: loadedMetadata',
        mediaElementRef.current.duration
      );
      if (!isNaN(mediaElementRef.current.duration)) {
        const durationSec = parseInt(mediaElementRef.current.duration, 10);
        const durationTime = secondsToTime(durationSec);
        console.log(
          `in usePlayerSource : durationSec: ${durationSec}, duration: ${durationTime}`
        );
        dispatch(
          setPlayerStatus({
            assetId,
            playerId,
            key: 'durationTime',
            value: durationTime,
          })
        );
        dispatch(
          setPlayerStatus({
            assetId,
            playerId,
            key: 'durationSec',
            value: durationSec,
          })
        );
        dispatch(
          setPlayerStatus({ assetId, playerId, key: 'isPlaying', value: false })
        );
        const isLive = durationTime === '00:00';
        if (isLive) {
          mediaElementRef.current.play();
        }
        if (!isLive && show && srcIndex === 0 && displayMode === 'swipe') {
          mediaElementRef.current.play();
        }
        if (!isLive && show && displayMode !== 'swipe') {
          mediaElementRef.current.play();
        }
      }
    },
    [dispatch, mediaElementRef, assetId, playerId, show, srcIndex]
  );

  const handleCanPlay = React.useCallback(() => {
    dispatch(
      setPlayerStatus({
        assetId,
        playerId,
        key: 'canplay',
        value: true,
      })
    );
  }, [dispatch, assetId, playerId]);

  const loadHLS = React.useCallback(() => {
    console.log('!! loadHLS');

    dispatch(
      setPlayerStatus({
        assetId,
        playerId,
        key: 'manifestLoaded',
        value: false,
      })
    );
    dispatch(
      setPlayerStatus({ assetId, playerId, key: 'canplay', value: false })
    );

    if (hlsRef && hlsRef.current !== null) {
      hlsRef.current.destroy();
    }

    mediaElementRef.current.src = null;
    const hlsOptions = {
      // backBufferLength: 15,
      // liveBackBufferLength: 15,
      // liveMaxBackBufferLength: 15,
      // maxBufferSize: 0,
      // maxBufferLength: 10,
      // liveSyncDurationCount: 1,
      liveDurationInfinity: true,
    };

    hlsRef.current = new Hls(hlsOptions);
    hlsRef.current.attachMedia(mediaElementRef.current);
    hlsRef.current.on(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('audio is attached to hls');
      hlsRef.current.loadSource(src);
      mediaElementRef.current.addEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      );
      mediaElementRef.current.addEventListener('canplaythrough', handleCanPlay);
    });
    hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log('manifest loaded, found data:', data);
      dispatch(
        setPlayerStatus({ assetId, playerId, key: 'manifestLoaded', value: true })
      );
    });
    hlsRef.current.on(Hls.Events.ERROR, (event, error) => {
      console.log(event, error);
    });
  }, [mediaElementRef, src, handleLoadedMetadata, dispatch, assetId, playerId]);

  React.useEffect(() => {
    console.log('### src changed!:', src, mediaElementRef.current);
    // initialize manifestLoaded to false for playing HLS

    // fast return if src not ready or mediaElement is null
    if (src === '') {
      return;
    }
    if (mediaElementRef === undefined || mediaElementRef.current === null) {
      return;
    }
    //
    if (isHlsStream(src) && Hls.isSupported()) {
      console.log('!! attach mediaElement(audio) to hlsRef.');
      loadHLS();
    }

    if (!isHlsStream(src)) {
      console.log(
        '!! attach loadedmetadata event handler to media element(not hls) and set media source'
      );
      mediaElementRef.current.src = null;
      mediaElementRef.current.addEventListener(
        'loadedmetadata',
        handleLoadedMetadata
      );
      mediaElementRef.current.addEventListener('canplaythrough', handleCanPlay);
      mediaElementRef.current.src = src;
      dispatch(
        setPlayerStatus({ assetId, playerId, key: 'manifestLoaded', value: true })
      );
    }

    return () => {
      console.log(
        'src change. usePlayerSource umount:',
        mediaElementRef.current
      );
      hlsRef?.current?.destroy();
      console.log('src change. usePlayerSource umount:', hlsRef.current);
      if (mediaElementRef.current) {
        mediaElementRef.current.removeEventListener(
          'loadedmetadata',
          handleLoadedMetadata
        );
        mediaElementRef.current.removeEventListener(
          'canplaythrough',
          handleCanPlay
        );
      }
    };
  }, [src, mediaElementRef, dispatch, assetId, playerId, handleLoadedMetadata]);

  // return [mediaElementRef, manifestLoaded, duration];
  return { loadHLS };
}
