import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  homeShow: true,
  drawShow: false,
  hideTools: false,
  useSrcLocal: false,
  modalOpen: false,
  draggableDock: false,
  dockWidth: '0',
  showTransition: false,
  isMessageBoxHidden: true,
  messageBoxText: '',
  messageBoxLevel: 'success',
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setHomeShow: (state, action) => {
      const { payload } = action;
      const { homeShow } = payload;
      state.homeShow = homeShow;
    },
    setDrawShow: (state, action) => {
      const { payload } = action;
      const { drawShow } = payload;
      state.drawShow = drawShow;
    },
    setHideTools: (state, action) => {
      const { payload } = action;
      const { hideTools } = payload;
      state.hideTools = hideTools;
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
    setMessageBoxHide: (state, action) => {
      const { payload } = action;
      const { isMessageBoxHidden } = payload;
      state.isMessageBoxHidden = isMessageBoxHidden;
    },
    setMessageBoxText: (state, action) => {
      const { payload } = action;
      const { messageBoxText } = payload;
      state.messageBoxText = messageBoxText;
    },
    setMessageBoxLevel: (state, action) => {
      const { payload } = action;
      const { messageBoxLevel } = payload;
      state.messageBoxLevel = messageBoxLevel;
    }
  },
})

export const showMessageBoxForDuration =
  (text, duration = 1000, level = 'success') =>
  async (dispatch, getState) => {
    // eslint-disable-next-line no-undef
    dispatch(setMessageBoxText({messageBoxText: text}));
    dispatch(setMessageBoxHide({isMessageBoxHidden: false}));
    dispatch(setMessageBoxLevel({messageBoxLevel: level}));
    setTimeout(()=>{
      dispatch(setMessageBoxHide(true));
    }, [duration])
    setTimeout(()=>{
      const state = getState();
      if(state.app.isMessageBoxHidden) {
        dispatch(setMessageBoxText(''));
        dispatch(setMessageBoxText('success'));
      }
    }, [duration + 500]);
}

export const {
  setHomeShow,
  setDrawShow,
  setHideTools,
  setUseSrcLocal,
  setModalOpen,
  setDraggableDock,
  setShowTransition,
  setMessageBoxHide,
  setMessageBoxLevel,
  setMessageBoxText
} = appSlice.actions;

export default appSlice.reducer;
