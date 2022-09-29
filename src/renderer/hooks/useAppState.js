import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDrawShow } from 'renderer/appSlice';
import {
  setPathDatum,
  setPathRenderOptions,
} from 'renderer/Components/Draw/drawSlice';

export default function useAppState() {
  const dispatch = useDispatch();
  const drawShow = useSelector((state) => state.app.drawShow);

  const toggleDraw = React.useCallback(() => {
    dispatch(setDrawShow({ drawShow: !drawShow }));
    dispatch(setPathDatum({ pathDatum: [] }));
    dispatch(setPathRenderOptions({ pathRenderOptions: [] }));
  }, [dispatch, drawShow]);

  return {
    drawShow,
    toggleDraw,
  };
}
