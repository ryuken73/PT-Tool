import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow, setUseSrcLocal, setModalOpen } from 'renderer/appSlice';
import {
  setPathDatum,
  setPointDatum,
  setPathRenderOptions,
} from 'renderer/Components/Draw/drawSlice';
import useDrawState from 'renderer/hooks/useDrawState';

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  const useSrcLocal = useSelector((state) => state.app.useSrcLocal);
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

  return {
    drawShow,
    useSrcLocal,
    toggleDraw,
    setUseSrcLocalState,
    setModalOpenState
  };
}
