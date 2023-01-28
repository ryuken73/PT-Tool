import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAssets,
  setCurrentAssetIndex,
  setItemValue,
} from 'renderer/Components/Assets/assetSlice';
import useDrawState from 'renderer/hooks/useDrawState';

const addExtAttr = (videoAsset) => {
  const type = videoAsset.src.toUpperCase().endsWith('MP4')
    ? 'video/mp4'
    : 'application/x-mpegURL';
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
      url: videoAsset.src,
    },
  };
};

export default function useAssetState() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.asset.assets);
  const currentAssetIndex = useSelector(
    (state) => state.asset.currentAssetIndex
  );
  const currentAsset = assets[currentAssetIndex] || {};
  const currentAssetId = currentAsset.assetId;
  const { clearPathDatumState } = useDrawState();

  const assetShowMask = React.useMemo(() => {
    return assets.map((asset, index) => {
      return index === currentAssetIndex;
    });
  }, [assets, currentAssetIndex]);

  const currentAssetTitle = React.useMemo(() => {
    const asset =
      assets.find((asset, index) => index === currentAssetIndex) || null;
    return asset ? asset.assetTitle : '...';
  }, [assets, currentAssetIndex]);

  const currentAssetSrcCount = assets[currentAssetIndex]?.sources?.length || 1;

  const addAssetState = React.useCallback(
    (asset) => {
      console.log('addAssetsState:', asset);
      const extraAttrAdded =
        asset.assetType === 'video' ? addExtAttr(asset) : asset;
      dispatch(setAssets({ assets: [...assets, extraAttrAdded] }));
    },
    [assets, dispatch]
  );

  const setAssetsState = React.useCallback(
    (newAssets) => {
      console.log('setAssetsState:', newAssets);
      dispatch(setAssets({ assets: newAssets }));
    },
    [dispatch]
  );

  const setCurrentAssetIndexState = React.useCallback(
    (assetIndex) => {
      clearPathDatumState();
      dispatch(setCurrentAssetIndex({ currentAssetIndex: assetIndex }));
    },
    [clearPathDatumState, dispatch]
  );

  const updateCurrentAssetState = React.useCallback((key, value) => {
    dispatch(setItemValue({
      itemId: currentAssetId,
      key,
      value,
    }))
  }, [currentAssetId, dispatch]);

  const updateCurrentAssetSrc = React.useCallback(
    (srcId, key, value) => {
      if (currentAsset.assetId === undefined) return;
      const newSources = currentAsset.sources.map((source) => {
        if (source.srcId !== srcId) {
          return { ...source };
        }
        return {
          ...source,
          [key]: value,
        };
      });
      dispatch(
        setItemValue({
          itemId: currentAssetId,
          key: 'sources',
          value: newSources,
        })
      );
    },
    [currentAsset.assetId, currentAsset.sources, currentAssetId, dispatch]
  );

  return {
    assets,
    currentAssetIndex,
    currentAssetTitle,
    currentAssetSrcCount,
    assetShowMask,
    addAssetState,
    setAssetsState,
    setCurrentAssetIndexState,
    updateCurrentAssetSrc,
    updateCurrentAssetState,
  };
}
