import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDialogOpen, setDroppedSrc } from 'renderer/Components/Dialog/dialogSlice'

export default function useAppState() {
  const dispatch = useDispatch();
  const dialogOpen = useSelector((state) => state.dialog.dialogOpen);
  const droppedSrc = useSelector((state) => state.dialog.droppedSrc);
  console.log('###', droppedSrc);

  const setDroppedSrcState = React.useCallback(
    (src) => {
      dispatch(setDroppedSrc({ droppedSrc: src }));
    },
    [dispatch]
  );

  const setDialogOpenState = React.useCallback(
    (open) => {
      dispatch(setDialogOpen({ dialogOpen: open }));
    },
    [dispatch]
  );

  return {
    dialogOpen,
    droppedSrc,
    setDialogOpenState,
    setDroppedSrcState,
  };
}
