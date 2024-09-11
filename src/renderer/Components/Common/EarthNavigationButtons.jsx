import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useConfigState from 'renderer/hooks/useConfigState';
import DragHandle from '../Draw/DragHandle';
import Draggable from 'react-draggable';

const Container = styled.div`
  position: absolute;
  top: 250px;
  right: 50px;
  z-index: 10000;
  background: rgb(0, 0, 0, 0.5);
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-shadow: 0px 0 black, 0 0px black, 1px 0 black, 0 1px black;
`

function EarthNavigationButtons(props) {
  // eslint-disable-next-line react/prop-types
  const { webviewRef } = props;
  const { config } = useConfigState();
  const {
    googleEarthPrevPosition = { x: 0, y: 0 },
    googleEarthNextPosition = { x: 0, y: 0 },
  } = config;

  const sendMouseClick = React.useCallback((position) => {
      const click = () => {
        const webview = webviewRef.current;
        const downEvent = {
          type: 'mouseDown',
          x: position.x,
          y: position.y,
        };
        const upEvent = {
          type: 'mouseUp',
          x: position.x,
          y: position.y,
        }
        webview.sendInputEvent(downEvent);
        setTimeout(() => {
          webview.sendInputEvent(upEvent);
        }, 10);
      };
      click();
    },
    [webviewRef]
  );

  const onPrev = React.useCallback(() => {
    const { x, y } = googleEarthPrevPosition;
    sendMouseClick({ x, y });
  }, [googleEarthPrevPosition, sendMouseClick]);

  const onNext = React.useCallback(() => {
    const { x, y } = googleEarthNextPosition;
    sendMouseClick({ x, y });
  }, [googleEarthNextPosition, sendMouseClick]);

  return (
    <Draggable bounds='#root' handle="#handle">
      <Container>
        <IconButton size="large" onClick={onPrev}>
          <ArrowBackIosNewIcon
            sx={{
              fontSize: 35,
              color: 'black',
              background: 'white',
              opacity: 0.9,
              borderRadius: '10%',
            }}
          />
        </IconButton>
        <div id="handle">
          <DragHandle size="small" opacity="0.5" />
        </div>
        <IconButton size="large" onClick={onNext}>
          <ArrowForwardIosIcon
            sx={{
              fontSize: 35,
              color: 'black',
              background: 'white',
              opacity: 0.9,
              borderRadius: '10%',
            }}
          />
        </IconButton>
      </Container>
    </Draggable>
  )
}

export default React.memo(EarthNavigationButtons);