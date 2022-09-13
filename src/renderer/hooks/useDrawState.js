import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setPathDatum,
  setFillColor,
  setFillWidth,
  saveRenderOption,
  setPathRenderOptions,
  setShowBorder,
  setBorderColor,
} from 'renderer/Components/Draw/drawSlice';

export default function useBodyState() {
  const dispatch = useDispatch();
  const pathDatum = useSelector((state) => state.draw.pathDatum);
  const fillWidth = useSelector((state) => state.draw.fillWidth);
  const fillColor = useSelector((state) => state.draw.fillColor);
  const showBorder = useSelector((state) => state.draw.showBorder);
  const borderWidth = useSelector((state) => state.draw.borderWidth);
  const borderColor = useSelector((state) => state.draw.borderColor);
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

  const setFillColorState = React.useCallback((color) => {
    dispatch(setBorderColor({ fillColor: color }));
    dispatch(setFillColor({ fillColor: color }));
    },
    [dispatch]
  );

  const saveRenderOptionState = React.useCallback(() => {
    dispatch(saveRenderOption());
  }, [dispatch]);

  const setShowBorderState = React.useCallback((enableStroke) => {
      enableStroke && dispatch(setBorderColor({ fillColor }));
      dispatch(setShowBorder({ showBorder: enableStroke }));
    },
    [dispatch, fillColor]
  );

  const increaseFillWidthState = React.useCallback(() => {
    dispatch(setFillWidth({ fillWidth: fillWidth + 1 }));
  }, [dispatch, fillWidth]);

  const decreaseFillWidthState = React.useCallback(() => {
    dispatch(setFillWidth({ fillWidth: fillWidth - 1 }));
  }, [dispatch, fillWidth]);

  return {
    pathDatum,
    fillWidth,
    fillColor,
    showBorder,
    borderWidth,
    borderColor,
    pathRenderOptions,
    addPathDatumState,
    clearPathDatumState,
    undoPathDatumState,
    setFillColorState,
    saveRenderOptionState,
    setShowBorderState,
    increaseFillWidthState,
    decreaseFillWidthState
  };
}
