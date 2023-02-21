import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { CircleMenu, CircleMenuItem } from 'react-circular-menu';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import SwipeIcon from '@mui/icons-material/Swipe';
import HeightIcon from '@mui/icons-material/Height';
import CompareIcon from '@mui/icons-material/Compare';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import useAssetState from 'renderer/hooks/useAssetState';
// import useDisplayModeState from 'renderer/hooks/useDisplayControlState';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 80px;
  left: 50px;
  z-index: 9999;
  opacity: 0.2;
`
const SplitColumnIcon = styled(SplitscreenIcon)`
  transform: rotate(90deg);
  height: 1em;
  font-size: 4em;
  /* box-shadow: 0.03em -0.03em 0.1em 0.01em black; */
`
const OverlayIcon = styled(CompareIcon)`
  /* transform: rotate(90deg); */
  height: 1em;
  font-size: 4em;
  /* box-shadow: 0.03em -0.03em 0.1em 0.01em black; */
`

const DisplayControl = () => {
  const { updateCurrentAssetState } = useAssetState();
  const menuRef = React.useRef(null);

  const changeDisplayMode = React.useCallback((event) => {
    const displayMode = event.currentTarget.value;
    // setDisplayModeState(displayMode);
    updateCurrentAssetState('displayMode', displayMode);
    },
    [updateCurrentAssetState]
  );

  const withClose = React.useCallback(
    (callback) => {
      return (event) => {
        if (menuRef.current !== null) {
          menuRef.current.children[1].children[0].click();
        }
        callback(event);
      };
    },
    [menuRef.current]
  );

  const changeDisplayModeNClose = withClose(changeDisplayMode);

  const onToggleMenu = React.useCallback((event) => {
    // eslint-disable-next-line no-console
    console.log(event);
  }, []);

  return (
    // <Draggable bounds="#root">
      <Container ref={menuRef}>
        <CircleMenu
          startAngle={-90}
          rotationAngle={210}
          itemSize={1.2}
          radius={3}
          rotationAngleInclusive={true}
          onMenuToggle={onToggleMenu}
        >
          <CircleMenuItem value="flexRow" onClick={changeDisplayModeNClose}>
            <SplitColumnIcon />
          </CircleMenuItem>
          <CircleMenuItem value="flexColumn" onClick={changeDisplayModeNClose}>
            <SplitscreenIcon />
          </CircleMenuItem>
          <CircleMenuItem value="swipe" onClick={changeDisplayModeNClose}>
            <SwipeIcon />
          </CircleMenuItem>
          <CircleMenuItem value="overlaySplit" onClick={changeDisplayModeNClose}>
            <OverlayIcon />
          </CircleMenuItem>
          <CircleMenuItem value="brush" onClick={changeDisplayModeNClose}>
            <FormatPaintIcon />
          </CircleMenuItem>
        </CircleMenu>
      </Container>
    // </Draggable>
  )
}

export default React.memo(DisplayControl);
