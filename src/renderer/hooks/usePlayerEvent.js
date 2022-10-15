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
  console.log('#### videoPlayer?', videoPlayer)
  const {
    isPlaying,
    currentTime,
    manifestLoaded,
    progress,
    duration,
    canplay,
  } = videoPlayer;

  const isLive = duration === '00:00';

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
      dispatch(setPlayerStatus({ playerId, key: 'currentSrc', value: src }));
    },
    [dispatch, playerId]
  );

  const handlePlaying = React.useCallback(() => {
    dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: true }));
  }, [dispatch, playerId]);

  const onClickForward10 = React.useCallback(() => {
    if (!player) return;
    const { currentTime } = player;
    const maxCurrentTime = player.duration;
    const forwardTime =
      currentTime + 10 < maxCurrentTime ? currentTime + 10 : maxCurrentTime;
    if (Number.isNaN(forwardTime)) return;
    player.currentTime = forwardTime;
  }, [player]);

  const onClickReplay10 = React.useCallback(() => {
    if (!player) return;
    const { currentTime } = player;
    const replayTime = currentTime - 10 > 0 ? currentTime - 10 : 0;
    if (Number.isNaN(replayTime)) return;
    player.currentTime = replayTime;
  }, [player]);

  const handlePause = React.useCallback(() => {
    dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: false }));
  }, [dispatch, playerId]);

  const handleTimeupdate = React.useCallback(() => {
    const currentTime = secondsToTime(parseInt(player.currentTime, 10));
    currentTimeRef.current = currentTime;
    dispatch(
      setPlayerCurrentTime({ playerId, key: 'currentTime', value: currentTime })
    );
    console.log('### from player:', player, player.currentTime, player.duration);
    const progress = ((player.currentTime / player.duration) * 100).toFixed(0);
    dispatch(setPlayerProgress({ playerId, key: 'progress', value: progress }));
  }, [dispatch, playerId, player]);

  const handleDurationChange = React.useCallback(() => {
    const { duration } = player;
    const durationSec = secondsToTime(parseInt(duration, 10));
    currentDurationRef.current = durationSec;
    dispatch(setPlayerStatus({ playerId, key: 'duration', value: duration }));
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
      dispatch(setPlayerStatus({ playerId, key: 'isPlaying', value: false }));
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
    player,
    isPlaying,
    progress,
    currentTime,
    manifestLoaded,
    duration,
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
