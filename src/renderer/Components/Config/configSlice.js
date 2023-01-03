import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configDialogOpen: false,
  transitionName: 'videoTransition',
  isTransitionFull: false,
  config: {
    debugTransition: 'no',
    backgroundCapture: true,
  },
};

export const configSlice = createSlice({
  name: 'configSlice',
  initialState,
  reducers: {
    setConfigDialogOpen: (state, action) => {
      const { payload } = action;
      const { configDialogOpen } = payload;
      state.configDialogOpen = configDialogOpen;
    },
    setTransitionName: (state, action) => {
      const { payload } = action;
      const { transitionName } = payload;
      state.transitionName = transitionName;
    },
    setIsTransitionFull: (state, action) => {
      const { payload } = action;
      const { isTransitionFull } = payload;
      state.isTransitionFull = isTransitionFull;
    },
    setConfigValue: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state.config[key] = value;
    },
  },
})

export const {
  setTransitionName,
  setIsTransitionFull,
  setConfigDialogOpen,
  setConfigValue,
} = configSlice.actions;

export default configSlice.reducer;
