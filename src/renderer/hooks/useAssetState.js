import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAssets,
  setCurrentAsset,
} from 'renderer/Components/Assets/assetSlice';
import useDrawState from 'renderer/hooks/useDrawState';

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

export default function useAssetState() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.asset.assets);
  const currentAsset = useSelector((state) => state.asset.currentAsset);
  const { clearPathDatumState } = useDrawState();

  const assetShowMask = React.useMemo(() => {
    return assets.map((asset, index) => {
      return index === currentAsset;
    })
  }, [assets, currentAsset])

  const currentAssetTitle = React.useMemo(() => {
    const asset = assets.find((asset, index) => index === currentAsset) || null;
    return asset ? asset.assetTitle : '...';
  }, [assets, currentAsset]);

  const currentAssetSrcCount = assets[currentAsset]?.sources?.length || 1;

  const addAssetState = React.useCallback(
    (asset) => {
      console.log('addAssetsState:', asset)
      const extraAttrAdded =  asset.assetType === 'video' ? addExtAttr(asset) : asset;
      dispatch(setAssets({ assets: [...assets, extraAttrAdded] }));
    },
    [assets, dispatch]
  );

  const setAssetsState = React.useCallback((newAssets) => {
    console.log('setAssetsState:', newAssets);
    dispatch(setAssets({ assets: newAssets }));
    },
    [dispatch]
  );

  const setCurrentAssetState = React.useCallback((assetIndex) => {
    clearPathDatumState();
    dispatch(setCurrentAsset({ currentAsset: assetIndex }));
    },
    [dispatch]
  );
  return {
    assets,
    currentAsset,
    currentAssetTitle,
    currentAssetSrcCount,
    assetShowMask,
    addAssetState,
    setAssetsState,
    setCurrentAssetState,
  };
}
