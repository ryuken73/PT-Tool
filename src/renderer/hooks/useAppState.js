import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setDrawShow,
  setUseSrcLocal,
  setModalOpen,
  setDraggableDock,
  setShowTransition,
} from 'renderer/appSlice';
import {
  setPathDatum,
  setPointDatum,
  setPathRenderOptions,
} from 'renderer/Components/Draw/drawSlice';
import useDrawState from 'renderer/hooks/useDrawState';

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  const draggableDock = useSelector((state) => state.app.draggableDock);
  const dockWidth = useSelector((state) => state.app.dockWidth);
  const useSrcLocal = useSelector((state) => state.app.useSrcLocal);
  const showTransition = useSelector((state) => state.app.showTransition);
  const modalOpen = useSelector((state) => state.app.modalOpen);
  const { clearPathDatumState } = useDrawState();

  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
    clearPathDatumState();
    // dispatch(setPathDatum({ pathDatum: [] }));
    // dispatch(setPointDatum({ pathDatum: [] }));
    // dispatch(setPathRenderOptions({ pathRenderOptions: [] }));
  }, [clearPathDatumState, dispatch, drawShow]);

  const setUseSrcLocalState = React.useCallback((useSrcLocal) => {
      dispatch(setUseSrcLocal({ useSrcLocal }));
    },
    [dispatch]
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const setModalOpenState = React.useCallback((modalOpen) => {
    dispatch(setModalOpen(modalOpen));
    },
    [dispatch]
  );

  const setDraggableDockState = React.useCallback((draggableDock, dockWidth="0px") => {
    dispatch(setDraggableDock({draggableDock, dockWidth}));
    },
    [dispatch]
  );

  const setShowTransitionState = React.useCallback((showTransition) => {
      dispatch(setShowTransition({ showTransition }));
    },
    [dispatch]
  );

  return {
    drawShow,
    useSrcLocal,
    draggableDock,
    dockWidth,
    showTransition,
    toggleDraw,
    setUseSrcLocalState,
    setModalOpenState,
    setDraggableDockState,
    setShowTransitionState,
  };
}
