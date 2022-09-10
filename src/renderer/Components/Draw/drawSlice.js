import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false
};

export const drawSlice = createSlice({
  name: 'drawSlice',
  initialState,
  reducers: {
    setDrawShow: (state, action) => {
      const { payload } = action;
      const { drawShow } = payload;
      state.drawShow = drawShow;
    }
  },
})

export const { setDrawShow } = drawSlice.actions;

export default drawSlice.reducer;
