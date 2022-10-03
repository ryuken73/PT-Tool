import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import DragHandle from 'renderer/Components/Draw/DragHandle';
import useSyncPosition from 'renderer/hooks/useSyncPosition';
import useAssetState from 'renderer/hooks/useAssetState';
import useSocketClient from 'renderer/hooks/useSocketIO';
import CONSTANTS from 'renderer/config/constants';
import MenuItem from './MenuItem';

const { POSITION, TOUCH_WEB_SERVER_URL } = CONSTANTS;
const MenuDiv = styled.div`
  position: absolute;
  top: ${POSITION.menuContainer.top};
  right: ${POSITION.menuContainer.right};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
`

const Container = styled.div`
  /* position: absolute; */
  /* top: ${POSITION.menuContainer.top}; */
  /* right: ${POSITION.menuContainer.right}; */
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: row;
  z-index: 9999;
  font-weight: bold;
  /* font-size: 35px; */
  font-size: 2vw;
  color: white;
  background: rgb(0, 0, 0, 0.05);
  padding: 5px;
  /* width: 80%; */
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  /* border-bottom: 6px solid white; */
`;

const DivDragHandler = styled.div`
  display: ${(props) => props.hide && 'none'};
  opacity: 0.8;
`

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow } = props;
  const { position, syncPosition } = useSyncPosition();
  const { assets, currentAsset, setAssetsState, setCurrentAssetState } = useAssetState();
  const [ socketConnected, setSocketConnected ] = React.useState(false);
  const handleSocketEvent = React.useCallback((eventName, args) => {
    console.log('event received', eventName, args);
    setAssetsState(args[0])
  }, [setAssetsState])

  const socket = useSocketClient({
    hostAddress: TOUCH_WEB_SERVER_URL,
    setSocketConnected,
    handleSocketEvent
  });

  return (
    <MenuDiv>
      {/* <Draggable onDrag={syncPosition}>
        <DivDragHandler hide={drawShow}>
          <DragHandle size="small" />
        </DivDragHandler>
      </Draggable> */}
      {/* <Draggable position={position} onStart={() => false}> */}
        <Container hide={drawShow}>
          {assets.map((asset, index) => (
            // eslint-disable-next-line react/button-has-type
            <MenuItem
              key={asset.assetTitle}
              isCurrent={currentAsset === index}
              menuText={asset.assetTitle}
              onClick={() => {
                setCurrentAssetState(index);
              }}
              onTouchStart={() => {
                setCurrentAssetState(index);
              }}
            />
          ))}
        </Container>
      {/* </Draggable> */}
    </MenuDiv>
  );
};

export default React.memo(MenuContainer);
