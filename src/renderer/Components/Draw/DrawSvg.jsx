import * as React from 'react';
import styled from 'styled-components';
import ArrowDef from 'renderer/Components/Draw/ArrowDef';
import { getStroke } from 'perfect-freehand';
import { getSmoothLine, getSvgPathFromStroke, easingStrings } from 'renderer/lib/appUtil';
import useDrawState from 'renderer/hooks/useDrawState';

const StyledSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100vh;
  opacity: 0.7;
  touch-action: none;
  z-index: 9999;
`;

const DrawSvg = (props) => {
  const {
    pathDatum,
    pointDatum,
    currentOptions,
    pathRenderOptions,
    addPathDatumState,
    addPointDatumState,
    saveRenderOptionState,
    getPositionForArrow
  } = useDrawState();
  const [points, setPoints] = React.useState([]);
  const [mouseUp, setMouseUP] = React.useState(false);

  const pathData = React.useRef([]);
  const rawPathData = React.useRef([]);

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
      cap: withArrow ? false : capEnd,
    },
    simulatePressur: false
  };

  const handlePointerDown = React.useCallback((e) => {
    e.target.setPointerCapture(e.pointerId);
    setMouseUP(false);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }, []);

  const handlePointerMove = React.useCallback((e) => {
    if (e.buttons !== 1) return;
    if (e.isPrimary === false) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
    },
    [points]
  );

  const handlePointerUp = React.useCallback(() => {
    setMouseUP(true);
    addPathDatumState(pathData.current);
    addPointDatumState(points);
    saveRenderOptionState();
  }, [addPathDatumState, addPointDatumState, points, saveRenderOptionState]);

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
    >
      {pathDatum.map((pathData, index) =>
        pathRenderOptions[index].strokeWidth ? (
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
              fill="transparent"
              stroke={pathRenderOptions[index].stroke}
              strokeWidth={pathRenderOptions[index].strokeWidth}
              strokeLinejoin="round"
              strokeLinecap="round"
              pointerEvents="all"
            />
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
