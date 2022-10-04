import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false,
  useSrcLocal: false,
  modalOpen: false,
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
    setModalOpen: (state, action) => {
      const { payload } = action;
      const { modalOpen } = payload;
      state.modalOpen = modalOpen;
    },
  },
})

export const { setDrawShow, setUseSrcLocal, setModalOpen } = appSlice.actions;

export default appSlice.reducer;
