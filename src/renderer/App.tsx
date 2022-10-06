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
import { useDoubleTap } from 'use-double-tap';
import useDrawState from './hooks/useDrawState';
import CONSTANTS from 'renderer/config/constants';
import { getIpAddresses, toggleWindowMaximize } from './lib/appUtil';

const { POSITION, TOUCH_WORKSTATION_IP, TOUCH_WEB_SERVER_URL } = CONSTANTS;

const INITIAL_ASSETS = [
  {
    assetId: 0,
    assetTitle: '홈',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal:
          'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcRemote:
          'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
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
        srcLocal:
          'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcRemote:
          'https://images.unsplash.com/photo-1663908778255-bd560e30d55e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        srcType: 'image',
        size: null,
      },
      {
        srcId: 0,
        srcLocal:
          'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcRemote:
          'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcType: 'image',
        size: null,
      },
    ],
    displayMode: 'swipe',
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
        srcLocal:
          'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
        srcRemote:
          'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
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
        srcLocal:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcRemote:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
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
        srcLocal:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcRemote:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcType: 'web',
        size: null,
      },
    ],
    displayMode: 'flexRow',
  },
  {
    assetId: 6,
    assetTitle: '해운대',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 0,
        srcLocal:
          'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcRemote:
          'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
        srcType: 'video',
        size: null,
      },
      {
        srcId: 1,
        srcLocal: 'http://210.179.218.53:1935/live/554.stream/playlist.m3u8',
        srcRemote: 'http://210.179.218.53:1935/live/554.stream/playlist.m3u8',
        srcType: 'video',
        size: null,
      },
      {
        srcId: 2,
        srcLocal:
          'https://topiscctv1.eseoul.go.kr/sd1/ch27.stream/playlist.m3u8',
        srcRemote:
          'https://topiscctv1.eseoul.go.kr/sd1/ch27.stream/playlist.m3u8',
        srcType: 'video',
        size: null,
      },
    ],
    fill: true,
    fluid: false,
    aspectRatio: '',
    // setPlayer,
    enableOverlay: false,
    displayMode: 'swipe',
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
  margin: 3px;
`;
const ToolDragLeader = styled.div`
  position: absolute;
  top: ${POSITION.drawHandler.top};
  right: ${POSITION.drawHandler.right};
  z-index: 9999;
`;
const AbsoluteBox = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: transparent;
  z-index: 9999;
`
const MaximizeContainer = styled(AbsoluteBox)`
  top: 0;
  left: 0;
`
const AssetReloaderContainer = styled(AbsoluteBox)`
  bottom: 0;
  left: 0;
`

const Timeout = (time) => {
  let controller = new AbortController();
  setTimeout(() => controller.abort(), time * 1000);
  return controller;
};
const getInitialAssets = () => {
  return new Promise((resolve, reject) => {
    fetch(`${TOUCH_WEB_SERVER_URL}/assetsActive`, {
      signal: Timeout(5).signal,
    })
      .then((results) => {
        return results.json();
      })
      .then((jsonResults) => {
        console.log('init888', jsonResults);
        if (jsonResults.success) {
          resolve(jsonResults.assetsActive);
        } else {
          throw new Error('failed to get assetsActive.');
        }
      })
      .catch((err) => {
        alert(`fetch from ${TOUCH_WEB_SERVER_URL} failed. use saved aseets.`);
        resolve(INITIAL_ASSETS);
      });
  });
};
const MaximizeToggler = () => {
  const bind = useDoubleTap((event) => {
    toggleWindowMaximize();
  });
  return <MaximizeContainer {...bind} />;
}


export default function App() {
  const { drawShow, toggleDraw, setUseSrcLocalState, setModalOpenState } = useAppState();
  const { position, syncPosition } = useSyncPosition();
  const { setAssetsState } = useAssetState();

  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    setModalOpenState(true);
    getIpAddresses()
      .then((ipAddresses) => {
        ipAddresses.some((ip) => ip === TOUCH_WORKSTATION_IP)
          ? setUseSrcLocalState(true)
          : setUseSrcLocalState(false);
        return;
      })
      .then(() => {
        return getInitialAssets();
      })
      .then((assets) => {
        if(assets.length === 0){
          throw new Error('no assets');
        }
        setAssetsState(assets);
        setModalOpenState(false);
      })
      .catch((err) => {
        console.log('init error');
        setModalOpenState(false);
        alert('fail to get asset list! try again.');
      });
  }, [setAssetsState, setUseSrcLocalState]);

  const AssetReloader = () => {
    const bind = useDoubleTap((event) => {
      setModalOpenState(true);
      getInitialAssets()
      .then((assets) => {
        if(assets.length === 0){
          throw new Error('no assets');
        }
        setAssetsState(assets);
        setModalOpenState(false);
      })
      .catch((err) => {
        console.log('init error');
        setModalOpenState(false);
        alert('fail to get asset list! try again.');
      });
    });
    return <AssetReloaderContainer {...bind} />;
  };

  return (
    <AppContainer>
      <MaximizeToggler />
      <AssetReloader />
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
