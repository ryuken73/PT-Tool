const TOOL_TOP = 300;
const TOOL_RIGHT = 20;
const MENU_TOP = 10;
const MENU_RIGHT = 50;

const dev =  {
  TOUCH_WORKSTATION_IP: '10.10.123.167',
  // TOUCH_WEB_SERVER_URL: 'http://10.10.104.246',
  TOUCH_WEB_SERVER_URL: 'http://127.0.0.1',
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
      right: `${TOOL_RIGHT+46}px`,
    },
    videoControl: {
      top: `${TOOL_TOP-150}px`,
      right: `${TOOL_RIGHT}px`,
      left: `${TOOL_RIGHT}px`,
    },
    menuContainer: {
      top: `${MENU_TOP}px`,
      right: `${MENU_RIGHT}px`,
    },
    menuDraw: {
      top: `${MENU_TOP+10}px`,
      right: `${MENU_RIGHT-30}px`,
    },
  },
  ENABLE_V_MENU: true,
  TRANSITIONS: {
    noTransition: {
      delay: 100,
    },
    cssTransition: {
      delay: 500,
    },
    videoTransition: {
      delay: 500,
    },
  },
  IS_TRANSITION_FULL: false,
  SWIPE_MODES: {
    NORMAL: 'NORMAL',
    FADE: 'FADE',
    ROTATE: 'ROTATE',
    CARD: 'CARD',
  }
}

const prd = {
  ...dev,
  TOUCH_WORKSTATION_IP: '10.10.104.246',
  TOUCH_WEB_SERVER_URL: 'http://10.10.104.246',
}

export default process.env.NODE_ENV === 'development' ? dev : prd;
