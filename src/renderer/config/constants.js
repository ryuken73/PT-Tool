const TOOL_TOP = 300;
const TOOL_RIGHT = 200;

const dev =  {
  LOGLESS_REDUX_ACTIONS: [
    'playerSlice/setPlayerCurrentTime',
    'playerSlice/setPlayerProgress',
  ],
  POSITION: {
    toolContainer: {
      top: `${TOOL_TOP}px`,
      right: `${TOOL_RIGHT}px`,
    },
    drawHandler: {
      top: `${TOOL_TOP-30}px`,
      right: `${TOOL_RIGHT+48}px`,
    },
    videoControl: {
      top: `${TOOL_TOP-150}px`,
      right: `${TOOL_RIGHT-150}px`,
    }
  }
}

const prd = {
  ...dev,
}

export default process.env.NODE_ENV === 'development' ? dev:prd;
