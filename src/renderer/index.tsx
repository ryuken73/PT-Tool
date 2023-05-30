import React from 'react';
import ReactDOM from 'react-dom';
import 'renderer/index.css';
import Root from 'renderer/Root';
import {store} from 'renderer/store';
import {Provider} from 'react-redux';
import {debounce} from 'renderer/lib/appUtil';
import {saveState} from 'renderer/lib/localStorage';
import constants from './config/constants';
const {CONFIG_LOCAL_STORAGE_KEY} = constants;

// const debouncedListener = debounce((store) => {
//     const appState = store.getState();
//     console.log('### from subscribe state =', appState)
//     saveState(CONFIG_LOCAL_STORAGE_KEY, appState);
// },1000);

// store.subscribe(() => {
//   console.log('### store chanaged ###')
//   debouncedListener(store);
// })

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  // console.log(arg);
// });
// window.electron.ipcRenderer.myPing();
