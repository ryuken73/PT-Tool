/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import AssetContainer from 'renderer/Components/Assets/AssetContainer';
import DrawSvg from 'renderer/Components/Draw/DrawSvg';
import MenuContainer from 'renderer/Components/Menus/MenuContainer';
import styled from 'styled-components';
import colors from 'renderer/config/colors';
import Draggable from 'react-draggable';
import path from 'path';
import Loading from './Components/Common/Loading';
import ToolContainer from './Components/Draw/ToolContainer';
import DragHandle from './Components/Draw/DragHandle';
import useAppState from './hooks/useAppState';
import useSyncPosition from './hooks/useSyncPosition';
import AddDialog from './Components/Dialog/AddDialog';
import useAssetState from './hooks/useAssetState';

const INITIAL_ASSETS = [
  {
    assetId: 0,
    assetType: 'image',
    src: 'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    title: '홈',
  },
  {
    assetId: 1,
    assetType: 'web',
    src: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
    title: '날씨누리',
  },
  {
    assetId: 2,
    assetType: 'web',
    src: 'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
    title: '태풍정보',
  },
  {
    assetId: 3,
    assetType: 'web',
    src: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
    title: '공기흐름',
  },
  {
    assetId: 4,
    assetType: 'web',
    src: [
      'https://www.weather.go.kr/wgis-nuri/html/map.html',
      'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
    ],
    title: '멀티웹',
  },
  {
    assetId: 5,
    assetType: 'video',
    source: {
      url: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
    },
    fill: true,
    fluid: false,
    aspectRatio: '',
    // setPlayer,
    enableOverlay: false,
    title: '해운대',
  },
];

const Container = styled.div`
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
const AppContainer = styled(Container)`
  position: relative;
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  overflow: hidden;
`;
const ToolDivWithPosition = styled.div`
  position: absolute;
  top: 200px;
  right: 200px;
  z-index: 9999;
`;
const ToolDragLeader = styled.div`
  position: absolute;
  top: 170px;
  right: 248px;
  z-index: 9999;
  width: 40px;
  height: 40px;
  /* background: yellow; */
`;
const getInitialAssets = () => {
  return new Promise((resolve, reject) => {
    resolve(INITIAL_ASSETS);
  });
};

export default function App() {
  const { drawShow, toggleDraw, setDialogOpenState, setDroppedSrcState } =
    useAppState();
  const { position, syncPosition } = useSyncPosition();
  const { setAssetsState } = useAssetState();
  React.useEffect(() => {
    getInitialAssets()
    .then((assets) => {
      setAssetsState(assets);
    })
    .catch((err) => {
      alert('fail to get asset list! try again.')
    })
  }, [setAssetsState]);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    const url = event.dataTransfer.getData('url');
    const file = event.dataTransfer.files[0];
    const droppedSrc = file ? file.path : url;
    setDroppedSrcState(droppedSrc);
    setDialogOpenState(true);
  };
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
function setDroppedSrcState(droppedSrc: any) {
  throw new Error('Function not implemented.');
}

function setDialogOpenState(arg0: boolean) {
  throw new Error('Function not implemented.');
}

