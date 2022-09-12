import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false,
  dialogOpen: false,
  droppedSrc: 'https://',
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
    setDialogOpen: (state, action) => {
      const { payload } = action;
      const { dialogOpen } = payload;
      state.dialogOpen = dialogOpen;
    },
    setDroppedSrc: (state, action) => {
      const { payload } = action;
      const { droppedSrc } = payload;
      state.droppedSrc = droppedSrc;
    },
  },
})

export const { setDrawShow, setDialogOpen, setDroppedSrc } = appSlice.actions;

export default appSlice.reducer;
