import React from 'react';
import useSyncPosition from 'renderer/hooks/useSyncPosition';
import useAppState from 'renderer/hooks/useAppState';
import useAssetState from 'renderer/hooks/useAssetState';
import useSocketClient from 'renderer/hooks/useSocketIO';
import CONSTANTS from 'renderer/config/constants';
import MenuVertical from 'renderer/Components/Menus/MenuVertical';
import MenuHorizontal from 'renderer/Components/Menus/MenuHorizontal';

const { TOUCH_WEB_SERVER_URL, ENABLE_V_MENU } = CONSTANTS;

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow  } = props;
  const { useSrcLocal } = useAppState();
  const { assets, currentAsset, setAssetsState, setCurrentAssetState } = useAssetState();
  const [ socketConnected, setSocketConnected ] = React.useState(false);
  const handleSocketEvent = React.useCallback((eventName, args) => {
    console.log('event received', eventName, args);
    if(eventName === 'ASSET_CHANGE' && !useSrcLocal){
      setAssetsState(args[0])
    }
  }, [setAssetsState, useSrcLocal])

  const socket = useSocketClient({
    hostAddress: TOUCH_WEB_SERVER_URL,
    setSocketConnected,
    handleSocketEvent
  });

  return (
    <>
      {ENABLE_V_MENU ? (
        <MenuVertical
          drawShow={drawShow}
          assets={assets}
          currentAsset={currentAsset}
          setCurrentAssetState={setCurrentAssetState}
         />
      ) : (
        <MenuHorizontal
          drawShow={drawShow}
          assets={assets}
          currentAsset={currentAsset}
          setCurrentAssetState={setCurrentAssetState}
         />
      )}
    </>
  );
};

export default React.memo(MenuContainer);
