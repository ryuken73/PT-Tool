import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setItemValue } from 'renderer/Components/Assets/assetSlice';

export default function useSwipeControlState() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.asset.assets);
  const currentAssetIndex = useSelector(
    (state) => state.asset.currentAssetIndex
  );
  const currentAsset = assets[currentAssetIndex] || {};
  const currentAssetId = currentAsset.assetId;

  const setSwipeModeState = React.useCallback(
    (swipeMode) => {
      dispatch(
        setItemValue({
          itemId: currentAssetId,
          key: 'swipeMode',
          value: swipeMode,
        })
      );
    },
    [currentAssetId, dispatch]
  );

  return {
    setSwipeModeState,
  };
}
