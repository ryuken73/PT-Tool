import { createSlice } from '@reduxjs/toolkit';

const FIRST_ASSET_INDEX = 0;
const initialState = {
  assets: [],
  currentAssetIndex: FIRST_ASSET_INDEX
};

export const assetSlice = createSlice({
  name: 'assetSlice',
  initialState,
  reducers: {
    setAssets: (state, action) => {
      const { payload } = action;
      const { assets } = payload;
      state.assets = assets;
    },
    setCurrentAssetIndex: (state, action) => {
      const { payload } = action;
      const { currentAssetIndex } = payload;
      state.currentAssetIndex = currentAssetIndex
    },
    setItemValue: (state, action) => {
      const { payload } = action;
      const { itemId, key, value } = payload;
      const item = state.assets.find((asset) => asset.assetId === itemId);
      if(item) item[key] = value;
    },
    setVideoCurrentTime: (state, action) => {
      const { payload } = action;
      const { itemId, key, value } = payload;
      const item = state.assets.find((asset) => asset.assetId === itemId);
      if(item) item[key] = value;
    },
    setVideoProgress: (state, action) => {
      const { payload } = action;
      const { itemId, key, value } = payload;
      const item = state.assets.find((asset) => asset.assetId === itemId);
      if(item) item[key] = value;
    },
  },
})

export const {
  setAssets,
  setCurrentAssetIndex,
  setItemValue,
  setVideoCurrentTime,
  setVideoProgress,
} = assetSlice.actions;

export default assetSlice.reducer;
