const TOOL_TOP = 300;
const TOOL_RIGHT = 200;
const MENU_TOP = 10;
const MENU_RIGHT = 50;

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
    },
    menuContainer: {
      top: `${MENU_TOP}px`,
      right: `${MENU_RIGHT}px`,
    },
    menuDraw: {
      top: `${MENU_TOP+10}px`,
      right: `${MENU_RIGHT-30}px`,
    },
  }
}

const prd = {
  ...dev,
}

export default process.env.NODE_ENV === 'development' ? dev:prd;
