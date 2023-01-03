import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configDialogOpen: false,
  transitionName: 'videoTransition',
  config: {
    debugTransition: 'no',
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
    setConfigValue: (state, action) => {
      const { payload } = action;
      const { key, value } = payload;
      state.config[key] = value;
    },
  },
})

export const { setTransitionName, setConfigDialogOpen, setConfigValue } = configSlice.actions;

export default configSlice.reducer;
