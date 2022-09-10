import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPathDatum } from 'renderer/Components/Draw/drawSlice';

export default function useBodyState() {
  const dispatch = useDispatch();
  const pathDatum = useSelector((state) => state.draw.pathDatum);

  const setPathDatumState = React.useCallback((newPathData) => {
    dispatch(setPathDatum({ pathDatum: [...pathDatum, newPathData] }));
    },
    [dispatch, pathDatum]
  );

  return {
    pathDatum,
    setPathDatumState,
  };
}
