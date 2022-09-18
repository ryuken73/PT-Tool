import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';
import RepeatIcon from '@mui/icons-material/Repeat';
import TextBox from 'renderer/Components/Common/TextBox';
import SliderBar from 'renderer/Components/Common/SliderBar';
import HoverButton from 'renderer/Components/Common/ButtonHover';
import colors from 'renderer/config/colors';
import usePlayerEvent from 'renderer/hooks/usePlayerEvent';
import usePlayer from 'renderer/hooks/usePlayerSource';
import CONSTANTS from 'renderer/config/constants';

const { POSITION } = CONSTANTS;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${POSITION.videoControl.top};
  right: ${POSITION.videoControl.right};
  width: 300px;
`;
const ProgressContainer = styled(Box)`
  /* display: flex; */
  display: ${(props) => (props.isLive ? 'none' : 'flex')};
  flex-direction: column;
  height: 50px;
  background: ${colors.player};
`;
const Progress = styled(Box)`
  margin-left: 20px;
  margin-right: 20px;
  font-size: 15px !important;
`;
const Duration = styled(Box)`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
`;
const ControlContainer = styled(Box)`
  display: flex;
  justify-content: center;
  background: black;
  position: relative;
`;

const Player = (props, playerRef) => {
  const {
    // isPlaying = false,
    // progress = '0',
    // currentTime = '00:00',
    asset,
    endedTime,
    repeatMode,
    onClickReplay10 = () => {},
    onClickForward10 = () => {},
    onClickRepeat = () => {},
  } = props;

  const {
    manifestLoaded,
    isPlaying,
    currentTime,
    progress,
    duration,
    isLive
  } = usePlayerEvent(asset, playerRef)

  // console.log('###', currentTime, progress, duration)

  const onClickPlay = React.useCallback(() => {
    if(isPlaying) {
      playerRef.current.pause();
      return
    }
    playerRef.current.play();
  }, [playerRef, isPlaying]);

  const handleMoveProgressSlider = React.useCallback(
    (progressPercent) => {
      const player = playerRef.current;
      const duration = player?.duration;
      if (duration === undefined || duration === null) return;
      const timeToGo = (duration * progressPercent) / 100;
      if (Number.isNaN(timeToGo)) return;
      player.currentTime = timeToGo;
    },
    [playerRef]
  );


  React.useEffect(() => {
    const player = playerRef.current;
    if (player === undefined || player === null) return;
    if (player.duration !== player.currentTime) return;
    if (endedTime) {
      // if (repeatMode === 'all') {
        // playNextSong();
        // return;
      // }
      if (repeatMode === 'one') {
        player.currentTime = 0;
        player.play();
      }
    }
  }, [playerRef, endedTime, repeatMode]);

  const repeatHoverButtonColor = React.useMemo(() => {
    return repeatMode === 'none'
      ? 'white'
      : repeatMode === 'one'
      ? 'red'
      : 'yellow';
  }, [repeatMode]);

  const repeatHoverOpacity = React.useMemo(() => {
    return repeatMode === 'none' ? '0.5' : repeatMode === 'one' ? '0.9' : '0.9';
  }, [repeatMode]);

  // const repeatCount = React.useMemo(() => {
  //   return repeatMode === 'one'
  //     ? 1
  //     : `${currentPlaylistIndex + 1}/${currentPlaylist.length}`;
  // }, [repeatMode, currentPlaylistIndex, currentPlaylist]);

  return (
    <Container>
        <ProgressContainer isLive={false}>
          <Progress>
            <SliderBar value={progress} onChange={handleMoveProgressSlider} />
          </Progress>
          <Duration>
            <TextBox
              fontSize="11px"
              text={currentTime}
              color={colors.textMain}
            />
            <TextBox
              fontSize="11px"
              text={duration}
              marginLeft="5px"
              color={colors.textSub}
            />
          </Duration>
        </ProgressContainer>
        <ControlContainer>
          <HoverButton
            onClick={onClickRepeat}
            fontcolor={repeatHoverButtonColor}
            opacitynormal={repeatHoverOpacity}
          >
            <RepeatIcon fontSize="small" />
          </HoverButton>
          <HoverButton onClick={onClickReplay10}>
            <Replay10Icon fontSize="small" />
          </HoverButton>
          <HoverButton
            onClick={onClickPlay}
            opacitynormal="0.7"
            opacityhover="1"
            disabled={!manifestLoaded}
          >
            {isPlaying ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </HoverButton>
          <HoverButton onClick={onClickForward10}>
            <Forward10Icon fontSize="small" />
          </HoverButton>
        </ControlContainer>
    </Container>
  );
};

export default React.memo(React.forwardRef(Player));
