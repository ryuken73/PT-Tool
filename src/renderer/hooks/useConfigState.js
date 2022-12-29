import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTransitionName,
  setConfigDialogOpen,
  setConfigValue,
} from 'renderer/Components/Config/configSlice';

export default function useAppState() {
  const dispatch = useDispatch();
  const transitionName = useSelector((state) => state.config.transitionName);
  const configDialogOpen = useSelector(
    (state) => state.config.configDialogOpen
  );
  const config = useSelector((state) => state.config.config);

  const setTransitionNameState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (transitionName) => {
      dispatch(setTransitionName({ transitionName }));
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
    transitionName,
    configDialogOpen,
    config,
    setTransitionNameState,
    setConfigValueState,
    toggleConfigModalState,
  };
}
