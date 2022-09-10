import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false,
  pathDatum: [],
};

export const drawSlice = createSlice({
  name: 'drawSlice',
  initialState,
  reducers: {
    setDrawShow: (state, action) => {
      const { payload } = action;
      const { drawShow } = payload;
      state.drawShow = drawShow;
    },
    setPathDatum: (state, action) => {
      const { payload } = action;
      const { pathDatum } = payload;
      state.pathDatum = pathDatum
    },
  },
})

export const { setDrawShow, setPathDatum } = drawSlice.actions;

export default drawSlice.reducer;
