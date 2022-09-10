import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAssets, setCurrentAsset } from 'renderer/Components/Body/bodySlice';

export default function useBodyState() {
  const dispatch = useDispatch();
  const assets = useSelector((state) => state.body.assets);
  const currentAsset = useSelector((state) => state.body.currentAsset);

  const assetShowMask = React.useMemo(() => {
    return assets.map((asset, index) => {
      return index === currentAsset;
    })
  }, [assets, currentAsset])

  const setAssetsState = React.useCallback((newAssets) => {
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
    setAssetsState,
    setCurrentAssetState,
  };
}
