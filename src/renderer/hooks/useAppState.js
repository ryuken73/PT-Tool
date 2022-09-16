import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow, setDialogOpen, setDroppedSrc } from 'renderer/appSlice';

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  // const assets = useSelector((state) => state.asset.assets);
  const dialogOpen = useSelector((state) => state.app.dialogOpen);
  const droppedSrc = useSelector((state) => state.app.droppedSrc);
  console.log('###', droppedSrc);

  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
  }, [dispatch, drawShow]);

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
    drawShow,
    dialogOpen,
    droppedSrc,
    toggleDraw,
    setDialogOpenState,
    setDroppedSrcState,
  };
}
