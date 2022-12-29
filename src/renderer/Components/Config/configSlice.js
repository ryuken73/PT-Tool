import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transitionName: 'toLeftNews',
};

export const configSlice = createSlice({
  name: 'configSlice',
  initialState,
  reducers: {
    setTransitionName: (state, action) => {
      const { payload } = action;
      const { transitionName } = payload;
      state.transitionName = transitionName;
    },
  },
})

export const { setTransitionName } = configSlice.actions;

export default configSlice.reducer;
