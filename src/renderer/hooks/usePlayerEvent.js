/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { secondsToTime } from 'renderer/lib/appUtil';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  setPlayerStatus,
  setPlayerCurrentTime,
  setPlayerProgress,
} from 'renderer/Components/Players/playerSlice';

const MAX_LATENCY_SEC = 15;

const isPlayerPlaying = (player) => {
  return (
    player.currentTime > 0 &&
    !player.paused &&
    !player.ended &&
    player.readyState > 2
  );
};

export default function usePlayerEvent(assetId, srcId, playerRef) {
  // console.log('usePlayerEvent called ')
  const dispatch = useDispatch();
  const playerId = srcId;
  const videoPlayer =
    useSelector(
      (state) =>
        state.player.players.find(
          (player) => player.assetId === assetId && player.playerId === playerId
        ),
      shallowEqual
    ) || {};
  // console.log('#### videoPlayer?', assetId, playerId, videoPlayer, playerRef.current)
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
      dispatch(setPlayerStatus({ assetId, playerId, key: 'currentSrc', value: src }));
    },
    [dispatch, assetId, playerId]
  );

  const handlePlaying = React.useCallback(() => {
    dispatch(setPlayerStatus({ assetId, playerId, key: 'isPlaying', value: true }));
  }, [dispatch, assetId, playerId]);

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
    dispatch(
      setPlayerStatus({ assetId, playerId, key: 'isPlaying', value: false })
    );
  }, [dispatch, assetId, playerId]);

  const handleTimeupdate = React.useCallback(() => {
    if (!playerRef.current) return;
    const currentTime = secondsToTime(
      parseInt(playerRef.current.currentTime, 10),
      'hh:mm:ss'
    );
    currentTimeRef.current = currentTime;
    dispatch(
      setPlayerCurrentTime({ assetId, playerId, key: 'currentTime', value: currentTime })
    );
    // console.log('### from player:', player, player.currentTime, player.duration);
    // const progress = ((player.currentTime / player.duration) * 100).toFixed(0);
    // dispatch(setPlayerProgress({ playerId, key: 'progress', value: progress }));
  }, [dispatch, assetId, playerId, playerRef]);

  const handleDurationChange = React.useCallback(() => {
    // const { duration } = player;
    if (!playerRef.current) return;
    const durationSec = parseInt(playerRef.current.duration, 10);
    const durationTime = secondsToTime(parseInt(durationSec, 10), 'hh:mm:ss');
    // console.log(`in usePlayerEvent : durationSec: ${durationSec}, duration: ${durationTime}`)
    currentDurationRef.current = durationSec;
    dispatch(setPlayerStatus({ assetId, playerId, key: 'durationTime', value: durationTime }));
    dispatch(
      setPlayerStatus({ assetId, playerId, key: 'durationSec', value: durationSec })
    );
  }, [playerRef, dispatch, assetId, playerId]);

  const handleEnded = React.useCallback(() => {
    if (!isLive) {
      playerRef.current.currentTime = 0;
      // playerRef.current.play();
    };
  }, [isLive, playerRef]);

  const onClickPlay = React.useCallback(() => {
    if (!playerRef.current) return;
    const player = playerRef.current;
    if(isPlayerPlaying(player)) {
      player.pause();
      return;
    }
    player.play();
  }, [playerRef]);

  const onClickReload = React.useCallback(() => {
    if (!playerRef.current) return;
    playerRef.current.load();
  }, [playerRef]);

  React.useEffect(() => {
    if (manifestLoaded === false) return [];
    if (playerRef.current === null || playerRef.current === undefined) {
      dispatch(setPlayerStatus({ assetId, playerId, key: 'isPlaying', value: false }));
      return [];
    }
    console.log('attach player event handlers', playerRef.current);
    playerRef.current.addEventListener('playing', handlePlaying);
    playerRef.current.addEventListener('pause', handlePause);
    playerRef.current.addEventListener('timeupdate', handleTimeupdate);
    playerRef.current.addEventListener('ended', handleEnded);
    playerRef.current.addEventListener('durationchange', handleDurationChange);

    return () => {
      console.log('detach player event handlers', playerRef.current);
      if (playerRef.current === null || playerRef.current === undefined) {
        return;
      }
      playerRef.current.removeEventListener('playing', handlePlaying);
      playerRef.current.removeEventListener('pause', handlePause);
      playerRef.current.removeEventListener('timeupdate', handleTimeupdate);
      playerRef.current.removeEventListener('ended', handleEnded);
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
    assetId,
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
