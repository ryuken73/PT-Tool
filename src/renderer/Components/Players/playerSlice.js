import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
};

const setPlayerKeyValue = (state, action) => {
  const { payload } = action;
  const { assetId, playerId, key, value } = payload;
  const player = state.players.find(
    (player) => player.assetId === assetId && player.playerId === playerId
  );
  if (player) {
    player[key] = value;
  } else {
    state.players.push({
      assetId,
      playerId,
      [key]: value,
    });
  }
};

export const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    setPlayerStatus: setPlayerKeyValue,
    setPlayerCurrentTime: setPlayerKeyValue,
    setPlayerProgress: setPlayerKeyValue
  },
});

export const { setPlayerStatus, setPlayerCurrentTime, setPlayerProgress } = playerSlice.actions;

export default playerSlice.reducer;
