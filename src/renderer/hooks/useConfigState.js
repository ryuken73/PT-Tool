import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTransitionName } from 'renderer/Components/Config/configSlice'

export default function useAppState() {
  const dispatch = useDispatch();
  const transitionName = useSelector((state) => state.config.transitionName);

  const setTransitionNameState = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (transitionName) => {
      dispatch(setTransitionName({ transitionName }));
    },
    [dispatch]
  );

  return {
    transitionName,
    setTransitionNameState,
  };
}
