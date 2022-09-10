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
  size: 10,
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
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
};

const DrawSvg = (props) => {
  // const [pathDatum, setPathDatum] = React.useState([]);
  const { pathDatum, setPathDatumState } = useDrawState();
  const [points, setPoints] = React.useState([]);
  const pathData = React.useRef([]);

  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }

  function handlePointerMove(e) {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  }

  const handlePointerUp = React.useCallback(() => {
    setPathDatumState(pathData.current);
  }, [setPathDatumState]);

  const stroke = getStroke(points, options);
  // const pathData = getSvgPathFromStroke(stroke);
  pathData.current = getSvgPathFromStroke(stroke);

  return <StyledSvg
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: 'none' }}
    >
      {pathDatum.map((pathData) => (
        <path d={pathData} />
      ))}
      {points && <path d={pathData.current} />}
    </StyledSvg>
};

export default React.memo(DrawSvg);
