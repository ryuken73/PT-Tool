/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { secondsToTime } from 'renderer/lib/appUtil';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  addPlayer,
  setPlayerStatus,
  setPlayerCurrentTime,
  setPlayerProgress,
} from 'renderer/Components/Players/playerSlice';

const MAX_LATENCY_SEC = 15;

export default function usePlayerEvent(srcId, playerRef) {
  // console.log('usePlayerEvent called ')
  const dispatch = useDispatch();
  const playerId = srcId;
  const videoPlayer =
    useSelector(
      (state) =>
        state.player.players.find((player) => player.playerId === playerId),
      shallowEqual
    ) || {};
  console.log('#### videoPlayer?', playerId, videoPlayer, playerRef.current)
  const {
    isPlaying,
    currentTime,
    manifestLoaded,
    progress,
    durationTime,
    durationSec,
    canplay,
  } = videoPlayer;

  const isLive = durationTime === '00:00';

  const player = playerRef.current;
  const currentTimeRef = React.useRef(null);
  const currentDurationRef = React.useRef(null);

  React.useEffect(() => {
    if (playerRef.current === null) return;
    // autoplay
    // player.play();
  }, [playerRef]);

  const setPlayerSource = React.useCallback(
    (src) => {
      dispatch(setPlayerStatus({ playerId, key: 'currentSrc', value: src }));
    },
    [dispatch, playerId]
  );

  const handlePlaying = React.useCallback(() => {
    dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: true }));
  }, [dispatch, playerId]);

  const onClickForward10 = React.useCallback(() => {
    if (!playerRef.current) return;
    const { currentTime } = playerRef.current;
    const maxCurrentTime = playerRef.current.duration;
    const forwardTime =
      currentTime + 10 < maxCurrentTime ? currentTime + 10 : maxCurrentTime;
    if (Number.isNaN(forwardTime)) return;
    playerRef.current.currentTime = forwardTime;
  }, [playerRef]);

  const onClickReplay10 = React.useCallback(() => {
    if (!playerRef.current) return;
    const { currentTime } = playerRef.current;
    const replayTime = currentTime - 10 > 0 ? currentTime - 10 : 0;
    if (Number.isNaN(replayTime)) return;
    playerRef.current.currentTime = replayTime;
  }, [playerRef]);

  const handlePause = React.useCallback(() => {
    dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: false }));
  }, [dispatch, playerId]);

  const handleTimeupdate = React.useCallback(() => {
    if (!playerRef.current) return;
    const currentTime = secondsToTime(parseInt(playerRef.current.currentTime, 10));
    currentTimeRef.current = currentTime;
    dispatch(
      setPlayerCurrentTime({ playerId, key: 'currentTime', value: currentTime })
    );
    // console.log('### from player:', player, player.currentTime, player.duration);
    // const progress = ((player.currentTime / player.duration) * 100).toFixed(0);
    // dispatch(setPlayerProgress({ playerId, key: 'progress', value: progress }));
  }, [dispatch, playerId, playerRef]);

  const handleDurationChange = React.useCallback(() => {
    // const { duration } = player;
    if (!playerRef.current) return;
    const durationSec = parseInt(playerRef.current.duration, 10);
    const durationTime = secondsToTime(parseInt(durationSec, 10));
    // console.log(`in usePlayerEvent : durationSec: ${durationSec}, duration: ${durationTime}`)
    currentDurationRef.current = durationSec;
    dispatch(setPlayerStatus({ playerId, key: 'durationTime', value: durationTime }));
    dispatch(
      setPlayerStatus({ playerId, key: 'durationSec', value: durationSec })
    );
  }, [playerRef, dispatch, playerId]);

  const onClickPlay = React.useCallback(() => {
    console.log(playerId, isPlaying);
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      return;
    }
    playerRef.current.play();
  }, [playerId, isPlaying, playerRef]);

  const onClickReload = React.useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.load();
  }, [playerRef]);

  React.useEffect(() => {
    if (manifestLoaded === false) return [];
    if (playerRef.current === null || playerRef.current === undefined) {
      dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: false }));
      return [];
    }
    console.log('attach player event handlers', playerRef.current);
    playerRef.current.addEventListener('playing', handlePlaying);
    playerRef.current.addEventListener('pause', handlePause);
    playerRef.current.addEventListener('timeupdate', handleTimeupdate);
    playerRef.current.addEventListener('durationchange', handleDurationChange);

    return () => {
      console.log('detach player event handlers', playerRef.current);
      if (playerRef.current === null || playerRef.current === undefined) {
        return;
      }
      playerRef.current.removeEventListener('playing', handlePlaying);
      playerRef.current.removeEventListener('pause', handlePause);
      playerRef.current.removeEventListener('timeupdate', handleTimeupdate);
      playerRef.current.removeEventListener(
        'durationchange',
        handleDurationChange
      );
      playerRef.current.pause();
    };
  }, [
    manifestLoaded,
    handlePlaying,
    handlePause,
    handleTimeupdate,
    handleDurationChange,
    dispatch,
    playerId,
    playerRef,
  ]);

  return {
    player,
    isPlaying,
    progress,
    currentTime,
    manifestLoaded,
    durationTime,
    durationSec,
    isLive,
    canplay,
    onClickPlay,
    onClickReload,
    setPlayerSource,
    onClickForward10,
    onClickReplay10
    // onClickForward10
  };
}
