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

const Container = styled(Box)`
  display: 'flex';
  flex-direction: column;
  position: absolute;
  top: 100px;
  right: 50px;
`;
const ProgressContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  height: 50px;
  /* background: #14181e; */
  background: ${colors.player};
`;
const Progress = styled(Box)`
  margin-left: 20px;
  margin-right: 20px;
`;
const Duration = styled(Box)`
  margin-left: 20px;
  display: flex;
`;
const ControlContainer = styled(Box)`
  display: flex;
  justify-content: center;
  background: black;
  position: relative;
`;

const Player = (props) => {
  const {
    player,
    isPlaying = false,
    progress = '0',
    currentTime = '00:00',
    endedTime,
    repeatMode,
    canPlay,
    manifestLoaded,
    duration,
    onClickReplay10 = () => {},
    onClickForward10 = () => {},
    onClickRepeat = () => {},
  } = props;

  const onClickPlay = React.useCallback(() => {
    if(isPlaying) {
      player.pause();
      return
    }
    player.play();
  }, [player, isPlaying]);

  // const canPlay = manifestLoaded;
  // const [volumeIconActive, setVolumeIconActive] = React.useState(false);
  // const onClickVolumeControl = React.useCallback(() => {
    // setVolumeIconActive(true);
  // }, [setVolumeIconActive]);

  // const handleCloseVolumeSlider = React.useCallback(() => {
    // setVolumeIconActive(false);
  // }, []);

  const handleMoveProgressSlider = React.useCallback(
    (progressPercent) => {
      const duration = player?.duration;
      if (duration === undefined || duration === null) return;
      const timeToGo = (duration * progressPercent) / 100;
      console.log(duration, timeToGo);
      if (Number.isNaN(timeToGo)) return;
      player.currentTime = timeToGo;
    },
    [player]
  );

  // const onClickSkipNext = React.useCallback(() => {
    // playNextSong();
  // }, [playNextSong]);

  // const onClickSkipPrevious = React.useCallback(() => {
    // playPrevSong();
  // }, [playPrevSong]);

  // const anchorElRef = React.useRef(null);

  React.useEffect(() => {
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
  }, [player, endedTime, repeatMode]);

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
        <ProgressContainer>
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
            disabled={!canPlay}
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
