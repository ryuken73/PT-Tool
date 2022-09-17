/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { secondsToTime } from 'renderer/lib/appUtil';
import { useSelector, useDispatch } from 'react-redux';
import {
  setItemValue,
  setVideoProgress,
  setVideoCurrentTime,
} from 'renderer/Components/Assets/assetSlice';
// import {setCurrentSrc, setDuration, setIsPlaying, setCurrentTime} from 'Components/Monitor/monitorListSlice'
// import {setItemValue} from 'Components/Monitor/monitorListSlice'
// import CONSTANTS from 'config/constants';
const MAX_LATENCY_SEC = 15;

export default function usePlayerEvent(playerRef, playerId) {
  console.log('usePlayerEvent called ')
  const dispatch = useDispatch();
  const asset = useSelector((state) =>
    state.asset.assets.find((asset) => asset.assetId === playerId)
  );
  const { isPlaying, currentTime, manifestLoaded, progress, duration } = asset;
  const player = playerRef.current;
  const currentTimeRef = React.useRef(null);
  const currentDurationRef = React.useRef(null);

  React.useEffect(() => {
    if (player === null) return;
    // autoplay
    // player.play();
  }, [player]);

  const setPlayerSource = React.useCallback(
    (src) => {
      dispatch(
        setItemValue({ itemId: playerId, key: 'currentSrc', value: src })
      );
    },
    [dispatch, playerId]
  );

  const handlePlaying = React.useCallback(() => {
    console.log('in usePlayerEvent: handlePlaying');
    dispatch(setItemValue({ itemId: playerId, key: 'isPlaying', value: true }));
  }, [dispatch, playerId]);

  // const onClickForward10 = React.useCallback(()=>{
  //       if(!player) return;
  //       const {currentTime} = player;
  //       const maxCurrentTime = player.duration - MAX_LATENCY_SEC;
  //       const forwardTime = currentTime + 10 < maxCurrentTime ? currentTime + 10 : maxCurrentTime;
  //       if(Number.isNaN(forwardTime)) return;
  //       player.currentTime = forwardTime;
  //   },[player])

  const handlePause = React.useCallback(() => {
    console.log('in usePlayerEvent: handlePause');
    dispatch(
      setItemValue({ itemId: playerId, key: 'isPlaying', value: false })
    );
  }, [dispatch, playerId]);

  const handleTimeupdate = React.useCallback(() => {
    const currentTime = secondsToTime(parseInt(player.currentTime, 10));
    currentTimeRef.current = currentTime;
    dispatch(
      setVideoCurrentTime({ itemId: playerId, key: 'currentTime', value: currentTime })
    );
    const progress = ((player.currentTime/player.duration) * 100).toFixed(0);
    dispatch(
      setVideoProgress({ itemId: playerId, key: 'progress', value: progress })
    );
  }, [dispatch, playerId, player]);

  const getCurrentTime = React.useCallback(() => {
    return currentTimeRef.current;
  }, [currentTimeRef]);

  const getDuration = React.useCallback(() => {
    return currentDurationRef.current;
  }, [currentDurationRef]);

  const handleDurationChange = React.useCallback(() => {
    const { duration } = player;
    const durationSec = secondsToTime(parseInt(duration, 10));
    currentDurationRef.current = durationSec;
    dispatch(
      setItemValue({ itemId: playerId, key: 'duration', value: duration })
    );
  }, [dispatch, player, playerId]);

  const onClickPlay = React.useCallback(() => {
    console.log(playerId, isPlaying);
    if (isPlaying) {
      player.pause();
      return;
    }
    player.play();
  }, [playerId, isPlaying, player]);

  const onClickReload = React.useCallback(() => {
    player.load();
  }, [player]);

  React.useEffect(() => {
    if (manifestLoaded === false) return [];
    if (player === null || player === undefined) {
      dispatch(
        setItemValue({ itemId: playerId, key: 'isPlaying', value: false })
      );
      return [];
    }
    console.log('attach player event handlers', player);
    player.addEventListener('playing', handlePlaying);
    player.addEventListener('pause', handlePause);
    player.addEventListener('timeupdate', handleTimeupdate);
    player.addEventListener('durationchange', handleDurationChange);

    return () => {
      console.log('detach player event handlers', player);
      player.removeEventListener('playing', handlePlaying);
      player.removeEventListener('pause', handlePause);
      player.removeEventListener('timeupdate', handleTimeupdate);
      player.removeEventListener('durationchange', handleDurationChange);
      player.pause();
    };
  }, [
    manifestLoaded,
    player,
    handlePlaying,
    handlePause,
    handleTimeupdate,
    handleDurationChange,
    dispatch,
    playerId,
  ]);

  return {
    isPlaying,
    setPlayerSource,
    currentTime,
    manifestLoaded,
    duration,
    getCurrentTime,
    getDuration,
    onClickPlay,
    onClickReload,
    // onClickForward10
  };
}
