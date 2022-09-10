import { createSlice } from '@reduxjs/toolkit';

const FIRST_ASSET_INDEX = 0;
const initialState = {
  assets: [],
  currentAsset: FIRST_ASSET_INDEX
};

export const bodySlice = createSlice({
  name: 'bodySlice',
  initialState,
  reducers: {
    setAssets: (state, action) => {
      const { payload } = action;
      const { assets } = payload;
      state.assets = assets;
    },
    setCurrentAsset: (state, action) => {
      const { payload } = action;
      const { currentAsset } = payload;
      state.currentAsset = currentAsset
    },
  },
})

export const { setAssets, setCurrentAsset } = bodySlice.actions;

export default bodySlice.reducer;
