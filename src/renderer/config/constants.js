const dev =  {
  LOGLESS_REDUX_ACTIONS: [
    'assetSlice/setVideoCurrentTime',
    'assetSlice/setVideoProgress',
  ],
}

const prd = {
  ...dev,
}

export default process.env.NODE_ENV === 'development' ? dev:prd;
