import React from 'react';
import styled from 'styled-components';
import useDisplayModeState from 'renderer/hooks/useDisplayControlState';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 15px;
  left: 15px;
  z-index: 9999;
`

const DisplayControl = () => {
  const { setDisplayModeState } = useDisplayModeState();

  const changeDisplayMode = React.useCallback((event) => {
    const displayMode = event.target.value;
    setDisplayModeState(displayMode);
    },
    [setDisplayModeState]
  );

  return (
    <Container>
      <button value="flexRow" onClick={changeDisplayMode}>Split R</button>
      <button value="flexColumn" onClick={changeDisplayMode}>Split W</button>
      <button value="swipe" onClick={changeDisplayMode}>Swipe</button>
      <button value="overlay" onClick={changeDisplayMode}>Overlay</button>
    </Container>
  )
}

export default React.memo(DisplayControl);
