/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import AssetContainer from 'renderer/Components/Assets/AssetContainer';
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
import useAssetState from './hooks/useAssetState';
import useDrawState from './hooks/useDrawState';
import CONSTANTS from 'renderer/config/constants';

const { POSITION } = CONSTANTS;

const INITIAL_ASSETS = [
  {
    assetId: 0,
    assetTitle: '홈',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcRemote: 'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcType: 'image',
        size: null,
      },
    ],
  },
  {
    assetId: 9,
    assetTitle: 'Swipe',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcRemote: 'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcType: 'image',
        size: null,
      },
      {
        srcId: 0,
        srcLocal: 'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcRemote: 'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcType: 'image',
        size: null,
      },
    ],
    displayType: 1,
  },
  {
    assetId: 1,
    assetTitle: '날씨누리',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
        srcRemote: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
        srcType: 'web',
        size: null,
      },
    ],
  },
  {
    assetId: 2,
    assetTitle: '태풍정보',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
        srcRemote: 'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
        srcType: 'web',
        size: null,
      },
    ],
  },
  {
    assetId: 3,
    assetTitle: '공기흐름',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcRemote: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcType: 'web',
        size: null,
      },
    ],
  },
  {
    assetId: 4,
    assetTitle: '분할지도',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
        srcRemote: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
        srcType: 'web',
        size: null,
      },
      {
        srcId: 1,
        srcLocal: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcRemote: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcType: 'web',
        size: null,
      },
    ],
    displayType: 0,
  },
  {
    assetId: 6,
    assetTitle: '해운대',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcRemote: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcType: 'video',
        size: null,
      },
      {
        srcId: 1,
        srcLocal: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcRemote: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcType: 'video',
        size: null,
      },
    ],
    fill: true,
    fluid: false,
    aspectRatio: '',
    // setPlayer,
    enableOverlay: false,
    displayType: 1,
  },
  // {
  //   assetId: 7,
  //   assetType: 'video',
  //   source: {
  //     url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  //   },
  //   fill: true,
  //   fluid: false,
  //   aspectRatio: '',
  //   // setPlayer,
  //   enableOverlay: false,
  //   title: 'MP4',
  // },
  // {
  //   assetId: 8,
  //   assetType: 'image',
  //   src: [
  //     'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //   ],
  //   title: 'Single',
  // },
  // {
  //   assetId: 9,
  //   assetType: 'image',
  //   src: [
  //     'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
  //     'https://images.unsplash.com/photo-1664009369177-072a596d69c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1663875942232-07e9e32555e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1663875928932-3bf9dba77e26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //     'https://images.unsplash.com/photo-1664435916463-e6fe083d5922?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80'
  //   ],
  //   title: 'Swipe',
  // },
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
  top: ${POSITION.toolContainer.top};
  right: ${POSITION.toolContainer.right};
  z-index: 9999;
`;
const ToolDragLeader = styled.div`
  position: absolute;
  top: ${POSITION.drawHandler.top};
  right: ${POSITION.drawHandler.right};
  z-index: 9999;
`;
const getInitialAssets = () => {
  return new Promise((resolve, reject) => {
    resolve(INITIAL_ASSETS);
  });
};


export default function App() {
  const { drawShow, toggleDraw, setUseSrcLocalState } = useAppState();
  const { position, syncPosition } = useSyncPosition();
  const { setAssetsState } = useAssetState();

  React.useEffect(() => {
    setUseSrcLocalState(false);
    getInitialAssets()
    .then((assets) => {
      setAssetsState(assets);
    })
    .catch((err) => {
      alert('fail to get asset list! try again.')
    })
  }, [setAssetsState, setUseSrcLocalState]);

  return (
    <AppContainer>
      {drawShow && <DrawSvg />}
      <Loading />
      <MenuContainer drawShow={drawShow} />
      <Draggable onDrag={syncPosition}>
        <ToolDragLeader>
          <DragHandle size="small" />
        </ToolDragLeader>
      </Draggable>
      <Draggable position={position} onStart={() => false}>
        <ToolDivWithPosition>
          <ToolContainer drawShow={drawShow} toggleDraw={toggleDraw} />
        </ToolDivWithPosition>
      </Draggable>
      <AssetContainer />
      {/* <AddDialog /> */}
    </AppContainer>
  );
}
