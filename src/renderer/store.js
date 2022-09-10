import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import appReducer from 'renderer/appSlice';
import bodyReducer from 'renderer/Components/Body/bodySlice';
import drawReducer from 'renderer/Components/Draw/drawSlice';
import CONSTANTS from 'renderer/config/constants';

const { LOGLESS_REDUX_ACTIONS = [] } = CONSTANTS;

const logger = createLogger({
  predicate: (getState, action) => !LOGLESS_REDUX_ACTIONS.includes(action.type),
});

export const store = configureStore({
  reducer: {
    app: appReducer,
    body: bodyReducer,
    draw: drawReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
