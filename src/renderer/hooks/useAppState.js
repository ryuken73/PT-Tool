import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow, setUseSrcLocal, setModalOpen } from 'renderer/appSlice';
import {
  setPathDatum,
  setPathRenderOptions,
} from 'renderer/Components/Draw/drawSlice';

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);
  const useSrcLocal = useSelector((state) => state.app.useSrcLocal);
  const modalOpen = useSelector((state) => state.app.modalOpen);

  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
    dispatch(setPathDatum({ pathDatum: [] }));
    dispatch(setPathRenderOptions({ pathRenderOptions: [] }));
  }, [dispatch, drawShow]);

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
