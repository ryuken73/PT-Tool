import * as React from 'react';
import styled from 'styled-components';
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
    currentOptions,
    pathRenderOptions,
    addPathDatumState,
    saveRenderOptionState,
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
  } = currentOptions;

  const options = {
    size,
    thinning,
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
      cap: capEnd,
    },
  };

  const handlePointerDown = React.useCallback((e) => {
    e.target.setPointerCapture(e.pointerId);
    setMouseUP(false);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }, []);

  const handlePointerMove = React.useCallback((e) => {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
    },
    [points]
  );

  const handlePointerUp = React.useCallback(() => {
    setMouseUP(true);
    addPathDatumState(pathData.current);
    saveRenderOptionState();
  }, [addPathDatumState, saveRenderOptionState]);

  const outlinePoints = getStroke(points, options);
  pathData.current = getSvgPathFromStroke(outlinePoints);

  const [[x0, y0], [x1, y1]] = getSmoothLine(points, 10);
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
        )
      )}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon
            fill={isFilled ? fill : 'red'}
            stroke={stroke}
            strokeWidth={strokeWidth > 0 ? arrowStrokeSize : 0}
            points="0 0, 10 3.5, 0 7"
          />
        </marker>
      </defs>
      <line
        x1={x0}
        y1={y0}
        x2={x1}
        y2={y1}
        stroke={0}
        strokeWidth={size * 0.4}
        markerEnd="url(#arrowhead)"
      />
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
