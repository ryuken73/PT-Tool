import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import appReducer from 'renderer/appSlice';
import assetReducer from 'renderer/Components/Assets/assetSlice';
import drawReducer from 'renderer/Components/Draw/drawSlice';
import playerReducer from 'renderer/Components/HLSPlayer/playerSlice';
import dialogReducer from 'renderer/Components/Dialog/dialogSlice';
import CONSTANTS from 'renderer/config/constants';

const { LOGLESS_REDUX_ACTIONS = [] } = CONSTANTS;

const logger = createLogger({
  predicate: (getState, action) => !LOGLESS_REDUX_ACTIONS.includes(action.type),
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    asset: assetReducer,
    draw: drawReducer,
    player: playerReducer,
    dialog: dialogReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
