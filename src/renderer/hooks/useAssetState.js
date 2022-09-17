import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAssets,
  setCurrentAsset,
} from 'renderer/Components/Assets/assetSlice';


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

  const assetShowMask = React.useMemo(() => {
    return assets.map((asset, index) => {
      return index === currentAsset;
    })
  }, [assets, currentAsset])

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
    dispatch(setCurrentAsset({ currentAsset: assetIndex }));
    },
    [dispatch]
  );
  return {
    assets,
    currentAsset,
    assetShowMask,
    addAssetState,
    setAssetsState,
    setCurrentAssetState,
  };
}
