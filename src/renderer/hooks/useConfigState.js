import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTransitionType,
  setTransitionResource,
  setConfigDialogOpen,
  setIsTransitionFull,
  setConfigValue,
} from 'renderer/Components/Config/configSlice';

export default function useAppState() {
  const dispatch = useDispatch();
  const transitionType = useSelector((state) => state.config.transitionType);
  const transitionResource = useSelector(
    (state) => state.config.transitionResource
  );
  const isTransitionFull = useSelector(
    (state) => state.config.isTransitionFull
  );
  const configDialogOpen = useSelector(
    (state) => state.config.configDialogOpen
  );
  const config = useSelector((state) => state.config.config);

  const setTransitionTypeState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (transitionType) => {
      dispatch(setTransitionType({ transitionType }));
    },
    [dispatch]
  );
  const setTransitionResourceState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (transitionResource) => {
      dispatch(setTransitionResource({ transitionResource }));
    },
    [dispatch]
  );

  const setIsTransitionFullState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (isTransitionFull) => {
      dispatch(setIsTransitionFull({ isTransitionFull }));
    },
    [dispatch]
  );
  const toggleConfigModalState = React.useCallback(() => {
    dispatch(setConfigDialogOpen({ configDialogOpen: !configDialogOpen }));
  }, [configDialogOpen, dispatch]);

  const setConfigValueState = React.useCallback(
    (key, value) => {
      dispatch(setConfigValue({ key, value }));
    },
    [dispatch]
  );

  return {
    transitionType,
    transitionResource,
    isTransitionFull,
    configDialogOpen,
    config,
    setTransitionTypeState,
    setTransitionResourceState,
    setIsTransitionFullState,
    setConfigValueState,
    toggleConfigModalState,
  };
}
