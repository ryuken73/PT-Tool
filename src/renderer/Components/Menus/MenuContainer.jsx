import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import DragHandle from 'renderer/Components/Draw/DragHandle';
import useSyncPosition from 'renderer/hooks/useSyncPosition';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'renderer/hooks/useConfigState';
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
  box-sizing: border-box;
`;

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow  } = props;
  const {
    useSrcLocal,
    draggableDock,
    setDraggableDockState,
    setShowTransitionState,
  } = useAppState();
  const { transitionType, config } = useConfigState();
  const { debugTransition } = config;
  const [isDragging, setIsDragging] = React.useState(false);
  const {
    assets,
    currentAssetIndex,
    setAssetsState,
    setCurrentAssetIndexState,
  } = useAssetState();
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [valueX, setValueX] = React.useState(0);
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

  const onStartDrag = React.useCallback((e) => {
    setIsDragging(true);
  }, [setIsDragging])

  const onStopDrag = React.useCallback((e, data) => {
    console.log(e, data)
    setIsDragging(false);
  }, [setIsDragging])

  const onDrag = React.useCallback((e, data) => {
    const {x} = data;
    const {clientWidth} = data.node;
    console.log(x, clientWidth);
    const RIGHT_SIDE_STICKED = x >= 10;
    if(RIGHT_SIDE_STICKED) {
      setDraggableDockState(true, `${clientWidth - 2 }`)
    } else {
      setDraggableDockState(false, `0`)
    }
    debugTransition === 'yes' && setValueX(x);
  }, [debugTransition, setDraggableDockState])

  return (
    <>
      {ENABLE_V_MENU ? (
        <Draggable bounds="#root" handle="#handle" onStart={onStartDrag} onDrag={onDrag} onStop={onStopDrag}>
          <VerticalDiv isDragging={isDragging}>
            {debugTransition === 'yes' && <div>{valueX}</div>}
            <div id="handle">
              <DragHandle />
            </div>
            <MenuVertical
              drawShow={drawShow}
              draggableDock={draggableDock}
              assets={assets}
              currentAssetIndex={currentAssetIndex}
              transitionType={transitionType}
              setCurrentAssetIndexState={setCurrentAssetIndexState}
              setShowTransitionState={setShowTransitionState}
            />
          </VerticalDiv>
        </Draggable>
      ) : (
        <MenuHorizontal
          drawShow={drawShow}
          assets={assets}
          currentAssetIndex={currentAssetIndex}
          setCurrentAssetIndexState={setCurrentAssetIndexState}
        />
      )}
    </>
  );
};

export default React.memo(MenuContainer);
