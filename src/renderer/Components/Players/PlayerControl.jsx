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
import ProgressBar from 'renderer/Components/Players/ProgressBar';
import colors from 'renderer/config/colors';
import usePlayerEvent from 'renderer/hooks/usePlayerEvent';
import CONSTANTS from 'renderer/config/constants';
import { IconButton } from '@mui/material';

const { POSITION } = CONSTANTS;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${POSITION.videoControl.top};
  right: ${(props) => props.isRightSide && POSITION.videoControl.right};
  left: ${(props) => !props.isRightSide && POSITION.videoControl.left};
  width: 150px;
  opacity: 0.4;
`;
const ProgressContainer = styled(Box)`
  /* display: flex; */
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
  height: 35px;
  background: ${colors.player};
`;
// const Progress = styled(Box)`
//   margin-left: 20px;
//   margin-right: 20px;
//   font-size: 15px !important;
// `;

// const InputProgress = styled.input`
  /* -webkit-appearance: none; */
  /* &::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    border-radius: 3px;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    border: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: black;
    margin-top: -4px;
  }
  &:focus {
    outline: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: #ccc;
  } */
// `

const Duration = styled(Box)`
  margin-top: 10px;
  // margin-left: 20px;
  // margin-right: 20px;
  display: flex;
  justify-content: space-between;
`;
const ControlContainer = styled(Box)`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  justify-content: space-around;
  background: transparent;
  position: relative;
  margin-top: 10px;
`;
const HideIcon = styled.div`
`

const iconContainerStyle = {
  padding: '0px',
  margin: '5px',
};
const iconStyle = {
  background: '#140e30',
  color: 'white',
  borderRadius: '20%',
  fontSize: '25px',
  padding: '0px !important',
};

const Player = (props, playerRef) => {
  const {
    // isPlaying = false,
    // progress = '0',
    // currentTime = '00:00',
    // asset,
    assetId,
    src,
    srcId,
    endedTime,
    repeatMode,
    srcIndex,
    onClickRepeat = () => {},
  } = props;

  const {
    manifestLoaded,
    isPlaying,
    currentTime,
    // progress,
    durationTime,
    durationSec,
    isLive,
    canplay,
    onClickPlay,
    onClickForward10,
    onClickReplay10
  } = usePlayerEvent(assetId, srcId, playerRef);

  const isRightSide = srcIndex > 0;
  const playerCurrentTime = playerRef.current ? playerRef.current.currentTime : 0;
  const currentTimeSec = parseInt(playerCurrentTime, 10);
  const progress = ((currentTimeSec / durationSec) * 100).toFixed(0);
  // console.log('###', currentTime, progress, durationTime, durationSec)

  const handleMoveProgressSlider = React.useCallback(
    (progressPercent) => {
      // console.log('move progress:', event.currentTarget.value)
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

  const hide = isLive || !canplay;

  return (
    <Container isRightSide={isRightSide}>
      <ProgressContainer hide={hide}>
        <ProgressBar progress={progress} onChangeProgress={handleMoveProgressSlider}>
          {/* <SliderBar value={progress} onChange={handleMoveProgressSlider} /> */}
          {/* <InputProgress
            type="range"
            value={progress}
            onChange={handleMoveProgressSlider}
            min="0"
            max="100"
          /> */}
        </ProgressBar>
        <Duration>
          <TextBox fontSize="9px" text={currentTime} color={colors.textMain} />
          <TextBox
            fontSize="9px"
            text={durationTime}
            marginLeft="5px"
            color={colors.textSub}
          />
        </Duration>
      </ProgressContainer>
      <ControlContainer hide={hide}>
        <IconButton
          sx={iconContainerStyle}
          size="medium"
          onClick={onClickPlay}
          // onTouchStart={onClickPlay}
          // onTouchTap={onClickPlay}
        >
          {isPlaying ? (
            <PauseIcon sx={iconStyle} />
          ) : (
            <PlayArrowIcon sx={iconStyle} />
          )}
        </IconButton>
        {/* <IconButton
          sx={iconContainerStyle}
          size="medium"
          onClick={onClickRepeat}
          onTouchStart={onClickRepeat}
        >
          <RepeatIcon sx={iconStyle} />
        </IconButton> */}
        <IconButton
          sx={iconContainerStyle}
          size="medium"
          onClick={onClickReplay10}
          // onTouchStart={onClickReplay10}
          // onTouchTap={onClickReplay10}
        >
          <Replay10Icon sx={iconStyle} />
        </IconButton>
        <IconButton
          sx={iconContainerStyle}
          size="medium"
          onClick={onClickForward10}
          // onTouchStart={onClickForward10}
          // onTouchTap={onClickForward10}
        >
          <Forward10Icon sx={iconStyle} />
        </IconButton>
      </ControlContainer>
    </Container>
  );
};

export default React.memo(React.forwardRef(Player));
