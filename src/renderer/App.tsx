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
  overflow: hidden;
`;

const AppContainer = styled(BasicBox)`
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  overflow: hidden;
`;

const setPlayer = () => {};

const assets = [
  {
    assetType: 'image',
    src: 'C:/Users/USER/Downloads/norman-hermle-MMqbhMWpqg8-unsplash.jpg',
  },
  {
    assetType: 'image',
    src: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/150000/150290/ISS067-E-302073_lrg.jpg',
  },
  {
    assetType: 'web',
    src: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
  },
  {
    assetType: 'web',
    src: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
  },
  {
    assetType: 'video',
    source: {url: 'http://61.43.246.225:1935/rtplive/cctv_86.stream/chunklist_w1471259849.m3u8'},
    fill: true,
    fluid: false,
    aspectRatio: "",
    setPlayer,
    enableOverlay: false,
  },
  {
    assetType: 'video',
    source: {
      url: 'C:/Users/USER/Downloads/y1.mp4',
    },
    type: 'video/mp4',
    fill: true,
    fluid: false,
    aspectRatio: "",
    setPlayer,
    enableOverlay: false,
  },
];

export default function App() {
  const show=false;
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
      </BasicBox>
    </AppContainer>
  );
}
