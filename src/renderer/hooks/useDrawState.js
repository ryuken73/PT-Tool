import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPathDatum,
  setPathRenderOptions,
  saveRenderOption,
  setCurrentOptionValue
} from 'renderer/Components/Draw/drawSlice';

const STROKE_COLOR = {
  red: 'black',
  darkblue: 'white',
  black: 'white',
  yellow: 'black',
};

export default function useDrawState() {
  const dispatch = useDispatch();
  const pathDatum = useSelector((state) => state.draw.pathDatum);
  const currentOptions = useSelector((state) => state.draw.currentOptions);
  const pathRenderOptions = useSelector(
    (state) => state.draw.pathRenderOptions
  );

  const addPathDatumState = React.useCallback((newPathData) => {
    dispatch(setPathDatum({ pathDatum: [...pathDatum, newPathData] }));
    },
    [dispatch, pathDatum]
  );

  const clearPathDatumState = React.useCallback(() => {
    dispatch(setPathDatum({ pathDatum: [] }));
    dispatch(setPathRenderOptions({ pathRenderOptions: [] }));
  }, [dispatch]);

  const undoPathDatumState = React.useCallback(() => {
    dispatch(
      setPathDatum({ pathDatum: pathDatum.slice(0, pathDatum.length - 1) })
    );
    dispatch(
      setPathRenderOptions({
        pathRenderOptions: pathRenderOptions.slice(
          0,
          pathRenderOptions.length - 1
        ),
      })
    );
  }, [dispatch, pathDatum, pathRenderOptions]);

  const saveRenderOptionState = React.useCallback(() => {
    dispatch(saveRenderOption());
  }, [dispatch]);

  const changePathOptionState = React.useCallback((key, value) => {
    dispatch(setCurrentOptionValue({ key, value }));
    },
    [dispatch]
  );

  return {
    pathDatum,
    currentOptions,
    pathRenderOptions,
    addPathDatumState,
    clearPathDatumState,
    undoPathDatumState,
    saveRenderOptionState,
    changePathOptionState,
  };
}
