import React from 'react';
import DrawSvg from 'renderer/Components/Common/DrawSvg';
import MenuContainer from 'renderer/Components/Common/MenuContainer';
import Asset from 'renderer/Components/Common/Asset';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import HLSPlayer from 'renderer/Components/HLSPlayer';
import styled from 'styled-components';
import colors from 'renderer/config/colors';
import Loading from './Components/Common/Loading';

const BasicBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  font-size: calc(10px + 2vmin);
`;

const AppContainer = styled(BasicBox)`
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
`;

const setPlayer = () => {};

const assets = [
  {
    type: 'image',
    src: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150290/ISS067-E-302073_lrg.jpg',
  },
  { type: 'web', src: 'https://www.weather.go.kr/wgis-nuri/html/map.html' },
  {
    type: 'web',
    src: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
  },
  {
    type: 'video',
    source: {url: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8'},
    fill: true,
    fluid: false,
    aspectRatio: "",
    setPlayer,
    enableOverlay: false,
    fullScreen: true
  },
];

export default function App() {
  const show=true;
  const [currentAsset, setCurrentAsset] = React.useState(0);
  const showMap = React.useMemo(() => {
    return assets.map((asset, index) => {
      return index === currentAsset;
    })
  }, [currentAsset])

  return (
    <AppContainer>
      {show && <DrawSvg />}
      <Loading />
      <MenuContainer setCurrentAsset={setCurrentAsset} />
      <BasicBox>
        {assets.map((asset, index) => (
          <Asset options={asset} show={showMap[index]}></Asset>
        ))}
        {/* <WebView src="https://www.weather.go.kr/wgis-nuri/html/map.html" /> */}
        {/* <WebView src="https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250" /> */}
        {/* <div
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '1px',
            borderColor: 'black',
            border: 'solid 1px black',
            background: 'maroon',
          }}
        >
          <HLSPlayer
            fill
            fluid={false}
            aspectRatio=""
            source={{
              url: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8',
            }}
            setPlayer={setPlayer}
            enableOverlay
            overlayModal
            overlayContent="해운대"
          />
        </div> */}
        {/* <ImageBox src="https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150290/ISS067-E-302073_lrg.jpg"></ImageBox> */}
      </BasicBox>
    </AppContainer>
  );
}
