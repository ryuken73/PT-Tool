/* eslint-disable @typescript-eslint/no-shadow */
import { useSelector, shallowEqual } from 'react-redux';


const isPlayerPlaying = (player) => {
  return (
    player.currentTime > 0 &&
    !player.paused &&
    !player.ended &&
    player.readyState > 2
  );
};

export default function usePlayerEvent(assetId, srcId) {
  // console.log('usePlayerEvent called ')
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

  return {
    isPlaying,
    progress,
    currentTime,
    manifestLoaded,
    durationTime,
    durationSec,
    isLive,
    canplay,
  };
}
