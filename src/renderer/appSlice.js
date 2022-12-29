import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawShow: false,
  useSrcLocal: false,
  modalOpen: false,
  draggableDock: false,
  dockWidth: '0',
  showTransition: false
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
    setDraggableDock: (state, action) => {
      const { payload } = action;
      const { draggableDock, dockWidth } = payload;
      state.draggableDock = draggableDock;
      state.dockWidth = dockWidth;
    },
    setShowTransition: (state, action) => {
      const { payload } = action;
      const { showTransition } = payload;
      state.showTransition = showTransition;
    },
  },
})

export const {
  setDrawShow,
  setUseSrcLocal,
  setModalOpen,
  setDraggableDock,
  setShowTransition,
} = appSlice.actions;

export default appSlice.reducer;
