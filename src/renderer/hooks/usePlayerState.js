import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCanPlay, setIsPlaying } from 'renderer/Components/HLSPlayer/playerSlice';

export default function usePlayerState() {
  const dispatch = useDispatch();
  const canPlay = useSelector((state) => state.player.canPlay);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setCanPlayState = React.useCallback((canPlay) => {
    dispatch(setCanPlay({ canPlay }));
    },
    [dispatch]
  );

  const setIsPlayingState = React.useCallback((isPlaying) => {
    dispatch(setIsPlaying({ isPlaying }));
    },
    [dispatch]
  );
  return {
    canPlay,
    isPlaying,
    setCanPlayState,
    setIsPlayingState
  };
}
