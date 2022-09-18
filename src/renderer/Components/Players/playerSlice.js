import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
};

export const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      const { payload } = action;
      const { player } = payload;
      state.players.push(player);
    },
    setPlayerStatus: (state, action) => {
      const { payload } = action;
      const { playerId, key, value } = payload;
      const player = state.players.find((player) => player.playerId === playerId);
      if (player) {
        player[key] = value;
      } else {
        state.players.push({
          playerId,
          [key]: value
        });
      }
    },
    setPlayerCurrentTime: (state, action) => {
      const { payload } = action;
      const { playerId, key, value } = payload;
      const player = state.players.find((player) => player.playerId === playerId);
      if (player) {
        player[key] = value;
      } else {
        state.players.push({
          playerId,
          [key]: value
        });
      }
    },
    setPlayerProgress: (state, action) => {
      const { payload } = action;
      const { playerId, key, value } = payload;
      const player = state.players.find((player) => player.playerId === playerId);
      if (player) {
        player[key] = value;
      } else {
        state.players.push({
          playerId,
          [key]: value
        });
      }
    },
  },
})

export const {
  addPlayer,
  setPlayerStatus,
  setPlayerCurrentTime,
  setPlayerProgress,
} = playerSlice.actions;

export default playerSlice.reducer;
