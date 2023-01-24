import React from 'react';
import styled from 'styled-components';
import useSwipeControlState from 'renderer/hooks/useSwipeControlState';
import constants from 'renderer/config/constants';

const { SWIPE_MODES } = constants;
const MODES = Object.values(SWIPE_MODES);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 80px;
  left: 20px;
  z-index: 9999;
  opacity: 0.5;
  background: transparent;
`;
const StyledLetter = styled.div`
  font-size: 26px;
  color: white;
`;
const getNextMode = (currentMode) => {
  const nextIndex = MODES.findIndex((mode) => mode === currentMode) + 1;
  const safeIndex = nextIndex === MODES.length ? 0 : nextIndex;
  return MODES[safeIndex];
};

function SwipeControl(props) {
  // eslint-disable-next-line react/prop-types
  const { swipeMode = 'NORMAL' } = props;
  const { setSwipeModeState } = useSwipeControlState();
  const toggleSwipeMode = React.useCallback(() => {
    setSwipeModeState(getNextMode(swipeMode));
  }, [setSwipeModeState, swipeMode]);
  return (
    <Container>
      <StyledLetter onTouchStart={toggleSwipeMode} onClick={toggleSwipeMode}>{swipeMode[0]}</StyledLetter>
    </Container>
  )
}

export default React.memo(SwipeControl);
