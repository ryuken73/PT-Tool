import React from 'react';

export default function useSyncPosition() {
  const [position, setPosition] = React.useState({x:0, y:0});
  const syncPosition = React.useCallback((event, position) => {
    const { x, y } = position
    setPosition({x,y});
  }, []);
  return {
    position,
    syncPosition,
  };
}
