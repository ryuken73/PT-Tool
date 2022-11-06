import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import DragHandle from 'renderer/Components/Draw/DragHandle';
import useSyncPosition from 'renderer/hooks/useSyncPosition';
import useAppState from 'renderer/hooks/useAppState';
import useAssetState from 'renderer/hooks/useAssetState';
import useSocketClient from 'renderer/hooks/useSocketIO';
import CONSTANTS from 'renderer/config/constants';
import MenuVertical from 'renderer/Components/Menus/MenuVertical';
import MenuHorizontal from 'renderer/Components/Menus/MenuHorizontal';

const { TOUCH_WEB_SERVER_URL, ENABLE_V_MENU } = CONSTANTS;

const VerticalDiv = styled.div`
  position: absolute;
  bottom: 120px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
  padding: 5px;
  border-radius: 5px;
  border: ${props => props.isDragging && "2px dashed"};
  opacity: ${props => props.isDragging && "0.5"};
`;

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow  } = props;
  const { useSrcLocal } = useAppState();
  const [isDragging, setIsDragging] = React.useState(false);
  const { assets, currentAsset, setAssetsState, setCurrentAssetState } = useAssetState();
  const [ socketConnected, setSocketConnected ] = React.useState(false);
  const handleSocketEvent = React.useCallback((eventName, args) => {
    console.log('event received', eventName, args);
    if(eventName === 'ASSET_CHANGE' && !useSrcLocal){
      setAssetsState(args[0])
    }
  }, [setAssetsState, useSrcLocal])

  const socket = useSocketClient({
    hostAddress: TOUCH_WEB_SERVER_URL,
    setSocketConnected,
    handleSocketEvent
  });

  const onStartDrag = React.useCallback(() => {
    setIsDragging(true);
  }, [setIsDragging])

  const onStopDrag = React.useCallback(() => {
    setIsDragging(false);
  }, [setIsDragging])

  return (
    <>
      {ENABLE_V_MENU ? (
        <Draggable bounds="#root" handle="#handle" onStart={onStartDrag} onStop={onStopDrag}>
          <VerticalDiv isDragging={isDragging}>
            <div id="handle">
              <DragHandle />
            </div>
            <MenuVertical
              drawShow={drawShow}
              assets={assets}
              currentAsset={currentAsset}
              setCurrentAssetState={setCurrentAssetState}
            />
          </VerticalDiv>
        </Draggable>
      ) : (
      <MenuHorizontal
        drawShow={drawShow}
        assets={assets}
        currentAsset={currentAsset}
        setCurrentAssetState={setCurrentAssetState}
      />
      )}
    </>
  );
};

export default React.memo(MenuContainer);
