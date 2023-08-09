import React from 'react'

const ArrowDef = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, size, isFilled, fill, stroke, strokeWidth } = props;

  // eslint-disable-next-line no-nested-ternary
  const arrowStrokeSize = size === 30 ? 0.3 : size === 18 ? 0.4 : size === 12 ? 0.7 : 1.4;
  // const arrowStrokeSize = 0.5
  // eslint-disable-next-line no-nested-ternary
  const markerWidth = size === 6 ? "15" : size === 12 ? "14" : size === 18 ? "12" : "10";
  const refX = size === 30 ? "1.0" : size === 18 ? "0.6 ": size === 12 ? "0.6" : "0.1";
  return (
    <defs>
      <marker
        id={id}
        markerWidth={markerWidth}
        markerHeight="8"
        refX={refX}
        refY="4"
        orient="auto"
      >
        <polygon
          fill={isFilled ? fill : 'red'}
          stroke={stroke}
          strokeWidth={strokeWidth > 0 ? arrowStrokeSize : 0}
          points={`0 0, ${markerWidth} 4, 0 8, 2 4`}
        />
      </marker>
    </defs>
  )
}

export default React.memo(ArrowDef);
