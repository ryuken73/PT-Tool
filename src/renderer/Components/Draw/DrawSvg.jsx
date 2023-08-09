import * as React from 'react';
import styled from 'styled-components';
import ArrowDef from 'renderer/Components/Draw/ArrowDef';
import { getStroke } from 'perfect-freehand';
import { getSmoothLine, getSvgPathFromStroke, easingStrings } from 'renderer/lib/appUtil';
import useDrawState from 'renderer/hooks/useDrawState';
import useConfigState from 'renderer/hooks/useConfigState';

const StyledSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100vh;
  opacity: ${(props) => (props.opacity === undefined ? 0.8 : props.opacity)};
  touch-action: none;
  z-index: 9999;
`;

const INITIAL_POSITIONS = [
  [-1000, -1000, 0.5],
  [-1001, -1001, 0.5],
]
const DrawSvg = (props) => {
  const {
    pathDatum,
    pointDatum,
    currentOptions,
    pathRenderOptions,
    strokeWidthFromConfig,
    addPathDatumState,
    addPointDatumState,
    saveRenderOptionState,
    getPositionForArrow,
    changePathOptionState
  } = useDrawState();
  const { config } = useConfigState();
  const { lineOpacity } = config;
  const [points, setPoints] = React.useState([...INITIAL_POSITIONS]);
  const [mouseUp, setMouseUP] = React.useState(false);

  const pathData = React.useRef([]);
  const rawPathData = React.useRef([]);
  const doubleTouched = React.useRef(false);

  const {
    size,
    strokeWidth,
    thinning,
    streamline,
    smoothing,
    easing,
    taperStart,
    taperEnd,
    capStart,
    capEnd,
    easingStart,
    easingEnd,
    isFilled,
    stroke,
    fill,
    withArrow
  } = currentOptions;

  const options = {
    size,
    thinning: withArrow ? 0 : thinning,
    smoothing,
    streamline,
    easing: easingStrings[easing],
    start: {
      taper: taperStart,
      easing: easingStrings[easingStart],
      cap: capStart,
    },
    end: {
      taper: taperEnd,
      easing: easingStrings[easingEnd],
      cap: withArrow ? capEnd : capEnd,
    },
    simulatePressur: false
  };

  const toggleWithArrow = React.useCallback(() => {
    const nextValue = !withArrow;
    changePathOptionState('withArrow', nextValue);
    if (nextValue === true) {
      changePathOptionState('strokeWidth', 0);
    } else {
      changePathOptionState('strokeWidth', strokeWidthFromConfig);
    }
  }, [changePathOptionState, strokeWidthFromConfig, withArrow]);


  const handlePointerDown = React.useCallback((e) => {
    // if (e.isPrimary === false) return;
    if (e.isPrimary) {
      doubleTouched.current = false;
    }
    if (e.isPrimary === false) {
      doubleTouched.current = true;
      toggleWithArrow();
      setMouseUP(true);
      return;
    }
    e.target.setPointerCapture(e.pointerId);
    setMouseUP(false);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
    },
    [toggleWithArrow]
  );

  const handlePointerMove = React.useCallback((e) => {
    if (e.buttons !== 1) return;
    if (e.isPrimary === false) return;
    if (doubleTouched.current) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
    },
    [points]
  );

  const handlePointerUp = React.useCallback((e) => {
    if (doubleTouched.current) return;
    setMouseUP(true);
    addPathDatumState(pathData.current);
    addPointDatumState(points);
    saveRenderOptionState();
  // }, [toggleWithArrow, addPathDatumState, addPointDatumState, points, saveRenderOptionState]);
    },
    [addPathDatumState, addPointDatumState, points, saveRenderOptionState]
  );

  const outlinePoints = getStroke(points, options);
  pathData.current = getSvgPathFromStroke(outlinePoints);

  const [[x0, y0], [x1, y1]] = getSmoothLine(points, 4);
  const arrowStrokeSize = size === 18 ? 0.2 : size === 12 ? 0.25 : 0.5;

  return (
    <StyledSvg
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
      opacity={lineOpacity}
    >
      {/* draw saved datum */}
      {pathDatum.map((pathData, index) =>
        pathRenderOptions[index].strokeWidth ? (
          <>
            <path
              d={pathData}
              fill="transparent"
              stroke={pathRenderOptions[index].stroke}
              strokeWidth={pathRenderOptions[index].strokeWidth}
              strokeLinejoin="bevel"
              strokeLinecap="bevel"
              pointerEvents="all"
            />
            {pathRenderOptions[index].withArrow && (
              <>
                <ArrowDef
                  id={`arrowhead-${index}`}
                  size={pathRenderOptions[index].size}
                  isFilled={pathRenderOptions[index].isFilled}
                  fill={pathRenderOptions[index].fill}
                  stroke={pathRenderOptions[index].stroke}
                  strokeWidth={pathRenderOptions[index].strokeWidth}
                 />
                <line
                  x1={getPositionForArrow(index)[0]}
                  y1={getPositionForArrow(index)[1]}
                  x2={getPositionForArrow(index)[2]}
                  y2={getPositionForArrow(index)[3]}
                  stroke={0}
                  strokeWidth={pathRenderOptions[index].size * 0.4}
                  markerEnd={`url(#arrowhead-${index})`}
                />
              </>
            )}
            <path
              d={pathData}
              fill={
                pathRenderOptions[index].isFilled
                  ? pathRenderOptions[index].fill
                  : 'transparent'
              }
              stroke={
                pathRenderOptions[index].isFilled ||
                pathRenderOptions[index].strokeWidth > 0
                  ? 'transparent'
                  : 'black'
              }
              strokeWidth={
                pathRenderOptions[index].isFilled ||
                pathRenderOptions[index].strokeWidth > 0
                  ? 0
                  : 1
              }
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="all"
            />
          </>
        ) : (
          <>
            {pathRenderOptions[index].withArrow && (
              <>
                <ArrowDef
                  id={`arrowhead-${index}`}
                  size={pathRenderOptions[index].size}
                  isFilled={pathRenderOptions[index].isFilled}
                  fill={pathRenderOptions[index].fill}
                  stroke={pathRenderOptions[index].stroke}
                  strokeWidth={pathRenderOptions[index].strokeWidth}
                 />
                <line
                  x1={getPositionForArrow(index)[0]}
                  y1={getPositionForArrow(index)[1]}
                  x2={getPositionForArrow(index)[2]}
                  y2={getPositionForArrow(index)[3]}
                  stroke={0}
                  strokeWidth={pathRenderOptions[index].size * 0.4}
                  markerEnd={`url(#arrowhead-${index})`}
                />
              </>
            )}
            <path
              d={pathData}
              fill={
                pathRenderOptions[index].isFilled
                  ? pathRenderOptions[index].fill
                  : 'transparent'
              }
              stroke={
                pathRenderOptions[index].isFilled ||
                pathRenderOptions[index].strokeWidth > 0
                  ? 'transparent'
                  : 'black'
              }
              strokeWidth={
                pathRenderOptions[index].isFilled ||
                pathRenderOptions[index].strokeWidth > 0
                  ? 0
                  : 1
              }
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="all"
            />
          </>
        )
      )}
      {points && !mouseUp && strokeWidth ? (
        <path
          d={pathData.current}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          pointerEvents="all"
        />
      ) : null}
      {!mouseUp && withArrow && (
        <>
          <ArrowDef
            id="arrowHeadCurrent"
            size={size}
            isFilled={isFilled}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
          <line
            x1={x0}
            y1={y0}
            x2={x1}
            y2={y1}
            stroke={0}
            strokeWidth={size * 0.4}
            markerEnd="url(#arrowHeadCurrent)"
          />
          <use href="#arrowHeadCurrent" />
        </>
      )}
      {points && !mouseUp && (
        <path
          d={pathData.current}
          fill={isFilled ? fill : 'transparent'}
          stroke={isFilled || strokeWidth > 0 ? 'transparent' : 'black'}
          strokeWidth={isFilled || strokeWidth > 0 ? 0 : 1}
          strokeLinejoin="round"
          strokeLinecap="round"
          pointerEvents="all"
        />
      )}
    </StyledSvg>
  );
};

export default React.memo(DrawSvg);
