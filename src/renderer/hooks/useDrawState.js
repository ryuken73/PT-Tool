import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPathDatum } from 'renderer/Components/Draw/drawSlice';

export default function useBodyState() {
  const dispatch = useDispatch();
  const pathDatum = useSelector((state) => state.draw.pathDatum);

  const addPathDatumState = React.useCallback((newPathData) => {
    dispatch(setPathDatum({ pathDatum: [...pathDatum, newPathData] }));
    },
    [dispatch, pathDatum]
  );

  const clearPathDatumState = React.useCallback(() => {
    dispatch(setPathDatum({ pathDatum: [] }));
  }, [dispatch]);

  const undoPathDatumState = React.useCallback(() => {
    dispatch(
      setPathDatum({ pathDatum: pathDatum.slice(0, pathDatum.length - 1) })
    );
  }, [dispatch, pathDatum]);

  return {
    pathDatum,
    addPathDatumState,
    clearPathDatumState,
    undoPathDatumState
  };
}
