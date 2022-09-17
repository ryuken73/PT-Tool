import React from 'react';
import Hls from 'hls.js';
import { secondsToTime, isHlsStream } from 'renderer/lib/appUtil';
import { setItemValue } from 'renderer/Components/Assets/assetSlice';
// import { setItemValue, setDownloadingStatus, pushError} from 'renderer/Components//monitorListSlice';
import { useSelector, useDispatch } from 'react-redux';
// import CONSTANTS from 'config/constants';
// const {STREAM_TYPE} = CONSTANTS;

export default function usePlayer(playerId, src, mediaElementRef) {
  const dispatch = useDispatch();
  const player = useSelector((state) =>
    state.asset.assets.find((asset) => asset.assetId === playerId)
  );
  const { title, duration = 0, manifestLoaded = false } = player;
  const hlsRef = React.useRef(null);
  React.useEffect(() => {
    console.log('### src changed!:', src, mediaElementRef.current);
    // initialize manifestLoaded to false for playing HLS
    dispatch(
      setItemValue({ itemId: playerId, key: 'manifestLoaded', value: false })
    );

    const handleLoadedMetadata = (event) => {
      console.log(
        'in usePlayerSource: loadedMetadata',
        mediaElementRef.current.duration
      );
      // set video player pip mode automatically in flat mode
      if (!isNaN(mediaElementRef.current.duration)) {
        const durationSec = parseInt(mediaElementRef.current.duration, 10);
        dispatch(
          setItemValue({
            itemId: playerId,
            key: 'duration',
            value: secondsToTime(durationSec),
          })
        );
        mediaElementRef.current.play();
      }
    };

    // fast return if src not ready or mediaElement is null
    if (src === '') {
      return;
    }
    if (mediaElementRef === undefined || mediaElementRef.current === null) {
      return;
    }
    if (hlsRef && hlsRef.current !== null) {
      hlsRef.current.destroy();
    }
    //
    if (isHlsStream(src) && Hls.isSupported()) {
      console.log('!! attach mediaElement(audio) to hlsRef.');
      mediaElementRef.current.src = null;
      const hlsOptions = {
        backBufferLength: 15,
        liveBackBufferLength: 15,
        liveMaxBackBufferLength: 15,
        maxBufferSize: 0,
        maxBufferLength: 10,
        liveSyncDurationCount: 1,
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
      });
      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('manifest loaded, found data:', data);
        dispatch(setItemValue({ itemId: playerId, key: 'manifestLoaded', value: true }));
      });
      // hlsRef.current.on(Hls.Events.FRAG_LOADING, (event, data) => {
      //   console.log(event, data);
      //   dispatch(setDownloadingStatus({ itemId, isDownloading: true }));
      // });
      // hlsRef.current.on(Hls.Events.FRAG_LOADED, (event, data) => {
      //   console.log(event, data);
      //   dispatch(setDownloadingStatus({ itemId, isDownloading: false }));
      // });
      hlsRef.current.on(Hls.Events.ERROR, (event, error) => {
        console.log(event, error);
        // dispatch(
        //   pushError({
        //     itemId,
        //     error: {
        //       itemId,
        //       title,
        //       eventTime: Date.now(),
        //       event: error.event,
        //       details: error.details,
        //       type: error.type,
        //     },
        //   })
        // );
      });
      hlsRef.current.on(Hls.Events.BUFFER_FLUSHING, (event, data) => {
        console.log(event, data);
      });
      hlsRef.current.on(Hls.Events.BUFFER_FLUSHED, (event, data) => {
        console.log(event, data);
      });
      // Manually remove MSE Buffer to overcome memory leak (https://github.com/video-dev/hls.js/issues/3256)
      hlsRef.current.on(Hls.Events.FRAG_CHANGED, (event, data) => {
        console.log(event, data);
        // hlsRef.current.trigger(Hls.Events.BUFFER_FLUSHED, {
        //     startOffset: 0,
        //     endOffset: data.frag.startDTS
        // })
      });
      // hlsRef.current.on(Hls.Events.FRAG_LOADED, (event, data) => console.log(`${event}:`, data))
      // hlsRef.current.on(Hls.Events.FRAG_BUFFERED, (event, data) => console.log(`${event}:`, data))
      // hlsRef.current.on(Hls.Events.BUFFER_APPENDED, (event, data) => console.log(`${event}:`, data))
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
      mediaElementRef.current.src = src;
      dispatch(
        setItemValue({ itemId: playerId, key: 'manifestLoaded', value: true })
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
      }
    };
  }, [src, title, mediaElementRef, dispatch, playerId]);

  // return [mediaElementRef, manifestLoaded, duration];
  return [manifestLoaded, duration];
}
