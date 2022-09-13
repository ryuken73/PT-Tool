import React from 'react';
import AssetContainer from 'renderer/Components/Body/AssetContainer';
import DrawSvg from 'renderer/Components/Draw/DrawSvg';
import MenuContainer from 'renderer/Components/Menus/MenuContainer';
import styled from 'styled-components';
import colors from 'renderer/config/colors';
import Draggable from 'react-draggable';
import Loading from './Components/Common/Loading';
import ToolContainer from './Components/Draw/ToolContainer';
import DragHandle from './Components/Draw/DragHandle';
import useAppState from './hooks/useAppState';
import useSyncPosition from './hooks/useSyncPosition';
import AddDialog from './Components/Dialog/AddDialog';
import path from 'path';

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  font-size: calc(10px + 2vmin);
  overflow: hidden;
`;
const AppContainer = styled(BodyContainer)`
  position: relative;
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  overflow: hidden;
`;
const ToolDivWithPosition  = styled.div`
  position: absolute;
  top: 200px;
  right: 200px;
  z-index: 9999;
`
const ToolDragLeader  = styled.div`
  position: absolute;
  top: 170px;
  right: 248px;
  z-index: 9999;
  width: 40px;
  height: 40px;
  /* background: yellow; */
`


export default function App() {
  const {drawShow, toggleDraw, setDialogOpenState, setDroppedSrcState} = useAppState();
  const {position, syncPosition} = useSyncPosition();
  const handleDragOver = (event) => {
    event.preventDefault()
  }
  const handleDrop = (event) => {
    const url = event.dataTransfer.getData('url');
    const file = event.dataTransfer.files[0];
    const droppedSrc = file ? file.path : url;
    setDroppedSrcState(droppedSrc);
    setDialogOpenState(true);
  }
  return (
    <AppContainer onDrop={handleDrop} onDragOver={handleDragOver}>
      {drawShow && <DrawSvg />}
      <Loading />
      {!drawShow && <MenuContainer />}
      <Draggable onDrag={syncPosition}>
        <ToolDragLeader>
          <DragHandle />
        </ToolDragLeader>
      </Draggable>
      <Draggable position={position} onStart={() => false}>
        <ToolDivWithPosition>
          <ToolContainer drawShow={drawShow} toggleDraw={toggleDraw} />
        </ToolDivWithPosition>
      </Draggable>
      <AssetContainer />
      <AddDialog />
    </AppContainer>
  );
}
