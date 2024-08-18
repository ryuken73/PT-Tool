import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import ForwardIcon from '@mui/icons-material/Forward';
import Draggable from 'react-draggable';
import { animate } from 'renderer/lib/appUtil';
import TextBox from './TextBox';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  box-sizing: border-box;
`;
const ToolDivWithPosition = styled.div`
  position: absolute;
  bottom: 5%;
  right: 30%;
  z-index: 9999;
  margin: 3px;
  padding: 5px;
  border-radius: 5px;
  border: ${(props) => props.isDragging && '2px dashed'};
  opacity: ${(props) => props.isDragging && '0.5'};
  box-sizing: border-box;
`;

const animateClick = (targetElement) => {
  const from = { transform: `translate(0px, 0px)`};
  const to = { transform: `translate(3px, 1px)`};
  const options = {
    duration: 70
  }
  return animate(targetElement, from, to, options);
}

export default function NextButton(props) {
  // eslint-disable-next-line react/prop-types
  const { onClick: clickHandler, nextTitle='text' } = props;
  const [isDragging, setIsDragging] = React.useState(false);
  const buttonRef = React.useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onStartDrag = React.useCallback((event) => {
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onStopDrag = React.useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

  const onClick = React.useCallback((e) => {
      animateClick(buttonRef.current)
      setTimeout(() => {
        clickHandler(e);
      }, 100)
    },
    [clickHandler]
  );

  return (
    <Draggable
      bounds="#root"
      handle="#handle"
      onStart={onStartDrag}
      onStop={onStopDrag}
    >
      <ToolDivWithPosition isDragging={isDragging}>
        <Container>
          <TextBox
            id="handle"
            containerProps={{
              textalign: 'right'
            }}
            fontSize="20px"
            text={nextTitle}
            color="white"
            opacity={0.6}
            minWidth="100px"
            lineHeight="73px"
          />
          <IconButton ref={buttonRef} size="large" onClick={onClick}>
            <ForwardIcon
              sx={{
                fontSize: 50,
                color: 'maroon',
                background: 'white',
                opacity: 0.5,
                borderRadius: '10%',
              }}
            />
          </IconButton>
        </Container>
      </ToolDivWithPosition>
    </Draggable>
  )
}
