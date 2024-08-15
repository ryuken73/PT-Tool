import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import ForwardIcon from '@mui/icons-material/Forward';
import TextBox from './TextBox';
import Draggable from 'react-draggable';
import DragHandle from '../Draw/DragHandle';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

export default function NextButton(props) {
  // eslint-disable-next-line react/prop-types
  const { onClick, nextTitle='text' } = props;
  const [isDragging, setIsDragging] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onStartDrag = React.useCallback((event) => {
      setIsDragging(true);
    },
    [setIsDragging]
  );

  const onStopDrag = React.useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging]);

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
              textalign: 'center'
            }}
            fontSize="20px"
            text={nextTitle}
            color="white"
            opacity={0.6}
          />
          <IconButton size="large" onClick={onClick}>
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
