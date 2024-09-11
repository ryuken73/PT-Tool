import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { debounceEx } from 'renderer/lib/appUtil';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'renderer/hooks/useConfigState';

const ShowHide = styled.div`
  display: ${props => !props.show && 'none'};
`

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 100px;
  right: 50px;
  /* top: 5%;
  left: 10%; */
  /* min-width: 10%; */
  z-index: 10000;
  font-weight: bold;
  background: rgb(0, 0, 0, 0.5);
  padding: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  text-shadow: 0px 0 black, 0 0px black, 1px 0 black, 0 1px black;
  /* backdrop-filter: blur(2px); */
  font-size: 15px;
`
const Handle = styled.div`
  width: 30px;
  padding: 5px;
  font-size: 20px;
  line-height: 20px;
  background-color: black;
  border-radius: 5px;
  margin-right: 5px;
  opacity: 0.5;
`
const Position = styled.div`
  font-size: 12px;
`
const Buttons = styled.div`
  margin: 5px;
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
  width: 120px;
`
const Button = styled.button`
  min-width: 50px;
`
const Mode = styled.div`
  color: yellow;
  margin-left: 10px;
  font-size: 12px;
`

export default function EarthMousePosition() {
  const {
    googlePositionSetter = { show: false, mode: '' },
    setGooglePositionSetterState,
  } = useAppState();
  const {setConfigValueState} = useConfigState();

  const { show, mode } = googlePositionSetter;
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  let clientX; 
  let clientY;
  const handleDrag = React.useCallback((e, data) => {
    if (e instanceof MouseEvent) {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    if (e instanceof TouchEvent) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    setPosition({
      x: clientX,
      y: clientY
    })
    console.log(e)
    console.log(data)
  }, []);

  const setOK = React.useCallback(() => {
    if (mode === 'prev') {
      setConfigValueState('googleEarthPrevPosition', {
        x: position.x,
        y: position.y,
      });
    }
    if (mode === 'next') {
      setConfigValueState('googleEarthNextPosition', {
        x: position.x,
        y: position.y,
      });
    }
    setGooglePositionSetterState({
      show: false,
      mode: '',
    });
  }, [
    mode,
    position.x,
    position.y,
    setConfigValueState,
    setGooglePositionSetterState,
  ]);

  const cancel = React.useCallback(() => {
    setGooglePositionSetterState({
      show: false,
      mode: '',
    });
  }, [setGooglePositionSetterState]);

  const handleDragDebounced = debounceEx(handleDrag, 1000, {leading: false, trailing: false});

  return (
    <ShowHide show={show}>
    <Draggable bounds='#root' onDrag={handleDrag} handle="#handle">
    {/* <Draggable handle="#handle"> */}
      <Container>
        <Handle id="handle">X</Handle>
        <Position>
          x:{position.x}, y:{position.y}
        </Position>
        <Mode>change {mode}</Mode>
        <Buttons>
          <Button onClick={setOK}>OK</Button>
          <Button onClick={cancel}>Cancel</Button>
        </Buttons>
      </Container>
    </Draggable>
    </ShowHide>
  )
}
