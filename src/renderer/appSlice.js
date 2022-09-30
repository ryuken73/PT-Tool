import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false,
  useSrcLocal: false
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setDrawShow: (state, action) => {
      const { payload } = action;
      const { drawShow } = payload;
      state.drawShow = drawShow;
    },
    setUseSrcLocal: (state, action) => {
      const { payload } = action;
      const { useSrcLocal } = payload;
      state.useSrcLocal = useSrcLocal;
    },
  },
})

export const { setDrawShow, setUseSrcLocal } = appSlice.actions;

export default appSlice.reducer;
