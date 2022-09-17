import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogOpen: false,
  droppedSrc: 'https://',
};

export const dialogSlice = createSlice({
  name: 'dialogSlice',
  initialState,
  reducers: {
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

export const { setDialogOpen, setDroppedSrc } = dialogSlice.actions;

export default dialogSlice.reducer;
