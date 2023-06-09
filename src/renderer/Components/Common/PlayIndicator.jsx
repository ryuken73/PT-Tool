import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const Container = styled.div`
  position: absolute;
  bottom: 8px;
  right: 5px;
`


export default function ReloadButton(props) {
  const {isPlaying} = props;
  const color = isPlaying ? 'red' : 'black';
  return (
    <Container>
      <IconButton size="large">
          <RadioButtonCheckedIcon
            sx={{
              fontSize: 25,
              color,
              background: 'transparent',
              opacity: 0.5,
              borderRadius: '50%',
            }}
          />
        {/* {isPlaying ? (
          <PlayArrowIcon
            sx={{
              fontSize: 35,
              color: 'red',
              background: 'transparent',
              opacity: 0.3,
              borderRadius: '50%',
            }}
          />
        ) : (
          <PauseIcon
            sx={{
              fontSize: 35,
              color: 'black',
              background: 'transparent',
              opacity: 0.3,
              borderRadius: '50%',
            }}
          />
        )} */}
      </IconButton>
    </Container>
  )
}