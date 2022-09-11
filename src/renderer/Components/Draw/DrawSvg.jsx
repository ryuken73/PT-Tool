import * as React from 'react';
import styled from 'styled-components';
import { getStroke } from 'perfect-freehand';
import { getSvgPathFromStroke } from 'renderer/lib/appUtil';
import useDrawState from 'renderer/hooks/useDrawState';

const StyledSvg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  touch-action: none;
  z-index: 9999;
`

const options = {
  size: 14,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 1,
    easing: (t) => t,
    cap: true,
  },
};

const DrawSvg = (props) => {
  const {pathDatum, addPathDatumState} = useDrawState();
  const [points, setPoints] = React.useState([]);
  const [mouseUp, setMouseUP] = React.useState(false);

  const pathData = React.useRef([]);
  const rawPathData = React.useRef([]);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setMouseUP(false);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  }

  const handlePointerUp = React.useCallback(() => {
    setMouseUP(true);
    addPathDatumState(pathData.current);
  }, [addPathDatumState]);

  const stroke = getStroke(points, options);
  // const pathData = getSvgPathFromStroke(stroke);
  pathData.current = getSvgPathFromStroke(stroke);
  // rawPathData.current = getSvgPathFromStroke(points);

  // console.log(pathData.current);
  // console.log(rawPathData.current);
  // console.log(stroke);
  // console.log(points);

  return <StyledSvg
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {/* <marker id="triangle" viewBox="0 0 10 10"
            refX="1" refY="5"
            markerUnits="strokeWidth"
            markerWidth="10" markerHeight="10"
            orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00"/>
      </marker> */}
      {pathDatum.map(pathData => (
        <path
          d={pathData}
          fill={'white'}
          stroke="black"
          strokeWidth={'3'}
        />
      ))}
      {points && !mouseUp && (
        // <path d={pathData.current} marker-end="url(#triangle)"></path>
        // <path d={pathData.current} markerEnd={mouseUp && "url(#triangle)"}></path>
        <path
          d={pathData.current}
          fill={'white'}
          stroke="black"
          strokeWidth={'3'}
          // strokeLinejoin={'square'}
          // strokeLinecap={'square'}
        ></path>
      )}
    </StyledSvg>
};

export default React.memo(DrawSvg);
