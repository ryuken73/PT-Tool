import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow, setDialogOpen, setDroppedSrc } from 'renderer/appSlice';
import { setAssets } from 'renderer/Components/Body/bodySlice';

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
  }
];

const addExtAttr = (videoAsset) => {
  const type = videoAsset.src.toUpperCase().endsWith('MP4') ? 'video/mp4' : 'application/x-mpegURL';
  const extraVideoAttr = {
    fill: true,
    fluid: false,
    aspectRatio: '',
    enableOverlay: false,
  };
  return {
    ...videoAsset,
    ...extraVideoAttr,
    type,
    source: {
      url: videoAsset.src
    }
  };
}

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  const assets = useSelector((state) => state.body.assets);
  const dialogOpen = useSelector((state) => state.app.dialogOpen);
  const droppedSrc = useSelector((state) => state.app.droppedSrc);
  console.log('###', droppedSrc);
  React.useEffect(() => {
    dispatch(
      setAssets({
        assets: INITIAL_ASSETS,
      })
    );
  }, [dispatch]);

  const addAssetState = React.useCallback(
    (asset) => {
      const extraAttrAdded =  asset.assetType === 'video' ? addExtAttr(asset) : asset;
      dispatch(setAssets({ assets: [...assets, extraAttrAdded] }));
    },
    [assets, dispatch]
  );
  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
  }, [dispatch, drawShow]);

  const setDroppedSrcState = React.useCallback(
    (src) => {
      dispatch(setDroppedSrc({ droppedSrc: src }));
    },
    [dispatch, drawShow]
  );

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  return {
    drawShow,
    dialogOpen,
    droppedSrc,
    toggleDraw,
    setDialogOpenState,
    setDroppedSrcState,
    addAssetState,
  };
}
