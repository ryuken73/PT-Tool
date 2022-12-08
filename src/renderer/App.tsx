/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import AssetContainer from 'renderer/Components/Assets/AssetContainer';
import AssetTitle from 'renderer/Components/Assets/AssetTitle';
import DrawSvg from 'renderer/Components/Draw/DrawSvg';
import MenuContainer from 'renderer/Components/Menus/MenuContainer';
import ConfirmDialog from './Components/Dialog/ConfirmDialog';
import styled from 'styled-components';
import colors from 'renderer/config/colors';
import Loading from './Components/Common/Loading';
import ToolContainer from './Components/Draw/ToolContainer';
import PageTransition from 'renderer/Components/PageTransition';
import DisplayControl from 'renderer/Components/DisplayControl';
import useAppState from './hooks/useAppState';
import useSyncPosition from './hooks/useSyncPosition';
import useAssetState from './hooks/useAssetState';
import { useDoubleTap } from 'use-double-tap';
import useDrawState from './hooks/useDrawState';
import CONSTANTS from 'renderer/config/constants';
import { getIpAddresses, toggleWindowMaximize, quitApp } from './lib/appUtil';

const { POSITION, TOUCH_WORKSTATION_IP, TOUCH_WEB_SERVER_URL, ENABLE_V_MENU } = CONSTANTS;

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
        srcId: 1,
        srcLocal:
          'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcRemote:
          'https://images.unsplash.com/photo-1663947719095-17af03c793d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        srcType: 'image',
        size: null,
      },
    ],
    displayMode: 'overlaySplit',
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
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.59,36.90,6750',
        srcRemote:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.59,36.90,6750',
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
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.59,36.90,6750',
        srcRemote:
          'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.59,36.90,6750',
          // 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
        srcType: 'web',
        size: null,
      },
    ],
    displayMode: 'overlaySplit',
  },
  {
    assetId: 6,
    assetTitle: '해운대',
    created: null,
    updated: null,
    sources: [
      // {
      //   srcId: 0,
      //   srcLocal:
      //     'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
      //   srcRemote:
      //     'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
      //   srcType: 'video',
      //   size: null,
      // },
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
    displayMode: 'overlaySplit',
  },
  {
    assetId: 7,
    assetTitle: '로컬영상',
    created: null,
    updated: null,
    sources: [
      {
        srcId: 3,
        srcLocal: 'D:/동영상강의/MAH00008.MP4',
        srcRemote: 'D:/동영상강의/MAH00008.MP4',
        srcType: 'video',
        size: null,
      },
      {
        srcId: 4,
        srcLocal: 'D:/동영상강의/MAH00007.MP4',
        srcRemote: 'D:/동영상강의/MAH00007.MP4',
        srcType: 'video',
        size: null,
      },
    ],
    fill: true,
    fluid: false,
    aspectRatio: '',
    // setPlayer,
    enableOverlay: false,
    displayMode: 'overlaySplit',
  },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* border: grey 1px solid; */
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: grey;
  box-sizing: border-box;
  /* border-collapse: collapse; */
  font-size: calc(10px + 2vmin);
  overflow: hidden;
`;
const AppContainer = styled(Container)`
  position: relative;
  text-align: center;
  background-color: ${colors.base};
  flex-direction: row;
  justify-content: flex-ends;
  color: white;
  overflow: hidden;
`;
const AbsoluteBox = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: transparent;
  z-index: 9999;
`;
const MaximizeContainer = styled(AbsoluteBox)`
  top: 0;
  left: 0;
`;
const AssetReloaderContainer = styled(AbsoluteBox)`
  bottom: 0;
  left: 0;
`;
const AppQuitContainer = styled(AbsoluteBox)`
  bottom: 0;
  right: 0;
`;
const ToolDockContainer = styled.div`
  height: 100%;
  /* border: ${props => props.show && '1px solid grey' }; */
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: grey;
  box-sizing: border-box;
  width: ${props => props.show ? `${props.docWidth}px` : '0px'};
  transition: 0.5s all;
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
};

const bounds='#root';

export default function App() {
  const {
    drawShow,
    draggableDock,
    dockWidth,
    toggleDraw,
    setUseSrcLocalState,
    setModalOpenState } = useAppState();
  const { position, syncPosition } = useSyncPosition();
  const { setAssetsState } = useAssetState();
  const [ quitConfirmOpen, setQuitConfirmOpen ] = React.useState(false);

  console.log('^^^^^^', draggableDock, dockWidth)

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

  const AppQuiter = () => {
    const bind = useDoubleTap((event) => {
      setQuitConfirmOpen(true);
      // quitApp();
    });
    return <AppQuitContainer {...bind} />;
  };

  const handleYes = React.useCallback(() => {
    quitApp();
  }, [])

  const handleNo = React.useCallback(() => {
    setQuitConfirmOpen(false);
  }, [])

  return (
    <AppContainer>
      <MaximizeToggler />
      <AssetReloader />
      <AppQuiter />
      {drawShow && <DrawSvg />}
      <Loading />
      {ENABLE_V_MENU && <AssetTitle />}
      <MenuContainer showVertical={ENABLE_V_MENU} drawShow={drawShow} />
      <ToolContainer drawShow={drawShow} toggleDraw={toggleDraw} />
      <ConfirmDialog
        open={quitConfirmOpen}
        handleYes={handleYes}
        handleNo={handleNo}
        title="Quit?"
      />
      <PageTransition />
      <DisplayControl />
      <AssetContainer />
      <ToolDockContainer show={draggableDock} docWidth={dockWidth} />
    </AppContainer>
  );
}
