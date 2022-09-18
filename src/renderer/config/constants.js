const dev =  {
  LOGLESS_REDUX_ACTIONS: [
    'playerSlice/setPlayerCurrentTime',
    'playerSlice/setPlayerProgress',
  ],
}

const prd = {
  ...dev,
}

export default process.env.NODE_ENV === 'development' ? dev:prd;
