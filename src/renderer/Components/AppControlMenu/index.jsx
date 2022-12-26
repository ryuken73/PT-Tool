import React from 'react';
import styled from 'styled-components';
import { CircleMenu, CircleMenuItem } from 'react-circular-menu';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';

import { getIpAddresses, toggleWindowMaximize, quitApp } from 'renderer/lib/appUtil';

import useAssetState from 'renderer/hooks/useAssetState';
import useDisplayModeState from 'renderer/hooks/useDisplayControlState';

const Container = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: absolute;
  top: 10px;
  right: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0.08;
`
const AppControlMenu = (props) => {
  const { show, quitApp, setAssetsFromServer } = props;
  const { setDisplayModeState } = useDisplayModeState();

  const changeDisplayMode = React.useCallback((event) => {
    const displayMode = event.currentTarget.value;
    setDisplayModeState(displayMode);
    },
    [setDisplayModeState]
  );

  const openQuitConfirm = React.useCallback(() => {
    quitApp();
  }, [quitApp]);

  const onToggleMenu = React.useCallback((event) => {
    // eslint-disable-next-line no-console
    console.log(event);
  }, []);

  return (
    <Container show={show}>
      <CircleMenu
        startAngle={90}
        rotationAngle={90}
        itemSize={1}
        radius={3.2}
        rotationAngleInclusive={true}
        onMenuToggle={onToggleMenu}
      >
        <CircleMenuItem value="swipe" onClick={openQuitConfirm}>
          <CloseIcon />
        </CircleMenuItem>
        <CircleMenuItem value="flexColumn" onClick={setAssetsFromServer}>
          <RefreshIcon />
        </CircleMenuItem>
        <CircleMenuItem value="flexRow" onClick={toggleWindowMaximize}>
          <FullscreenIcon />
        </CircleMenuItem>
      </CircleMenu>
    </Container>
  )
}

export default React.memo(AppControlMenu);
