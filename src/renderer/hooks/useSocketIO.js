import React from 'react';
import socketClient from 'socket.io-client';
import constants from 'renderer/config/constants';

export default function useSocketClient(props) {
  const { hostAddress, setSocketConnected, handleSocketEvent } = props;
  const [socket, setSocket] = React.useState(null);
  React.useEffect(() => {
    const sockClient = socketClient.connect(hostAddress);
    // const {hostname, ipAddresses} = window.electron.util.getHostInfo();
    // console.log(hostname, ipAddresses)
    sockClient.on('connect', () => {
      console.log('connected');
      setSocketConnected(true)
      setSocket(sockClient);
      // sockClient.emit('join', { hostname, ipAddresses });
      sockClient.emit('put:connect', 'client');
    });
    sockClient.on('disconnect', (reason) => {
      console.log('disconnected: ', reason);
      setSocketConnected(false)
    })
    sockClient.onAny((eventName, ...args) => {
      console.log(`event: [${eventName}],`, args);
      handleSocketEvent(eventName, args);
    })
    return () => {
      sockClient.disconnect();
    };
  }, [hostAddress, setSocketConnected]);
  return { socket };
}
