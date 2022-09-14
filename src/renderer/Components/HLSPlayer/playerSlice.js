
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canPlay: false,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    setCanPlay: (state, action) => {
      const { payload } = action;
      const { canPlay } = payload;
      state.canPlay = canPlay;
    },
    setIsPlaying: (state, action) => {
      const { payload } = action;
      const { isPlaying } = payload;
      state.isPlaying = isPlaying;
    },
  },
});

export const { setCanPlay, setIsPlaying } = playerSlice.actions;

export default playerSlice.reducer;
