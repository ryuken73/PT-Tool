import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow } from 'renderer/appSlice';
import { setAssets } from 'renderer/Components/Body/bodySlice';

const assets = [
  {
    assetType: 'image',
    src: 'C:/Users/USER/Downloads/norman-hermle-MMqbhMWpqg8-unsplash.jpg',
    title: '홈',
  },
  {
    assetType: 'image',
    src: 'C:/Users/USER/Downloads/imrs.jpg',
    title: '부산',
  },
  {
    assetType: 'web',
    src: 'https://www.weather.go.kr/wgis-nuri/html/map.html',
    title: '날씨누리',
  },
  {
    assetType: 'web',
    src: 'https://www.weather.go.kr/w/typhoon/ko/weather/typhoon_02.jsp',
    title: '태풍현재상황',
  },
  {
    assetType: 'web',
    src: 'https://earth.nullschool.net/#current/wind/surface/level/orthographic=-232.50,37.91,4250',
    title: 'earthnull',
  },
  {
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
  {
    assetType: 'video',
    source: {
      url: 'C:/Users/USER/Downloads/y1.mp4',
    },
    type: 'video/mp4',
    fill: true,
    fluid: false,
    aspectRatio: '',
    // setPlayer,
    enableOverlay: false,
    title: '로컬영상',
  },
];

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  React.useEffect(() => {
    dispatch(
      setAssets({
        assets,
      })
    );
  }, [dispatch]);
  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
  }, [dispatch, drawShow]);

  return { drawShow, toggleDraw };
}
