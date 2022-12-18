import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItemValue } from 'renderer/Components/Assets/assetSlice';

export default function useAssetState() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.asset.assets);
  const currentAssetIndex = useSelector(
    (state) => state.asset.currentAssetIndex
  );
  const currentAsset = assets[currentAssetIndex] || {};
  const currentAssetId = currentAsset.assetId;

  const setDisplayModeState = React.useCallback(
    (displayMode) => {
      dispatch(
        setItemValue({
          itemId: currentAssetId,
          key: 'displayMode',
          value: displayMode,
        })
      );
    },
    [currentAssetId, dispatch]
  );

  return {
    setDisplayModeState,
  };
}
