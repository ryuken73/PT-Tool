import React from 'react'

const ArrowDef = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, size, isFilled, fill, stroke, strokeWidth } = props;

  // eslint-disable-next-line no-nested-ternary
  const arrowStrokeSize = size === 18 ? 0.2 : size === 12 ? 0.25 : 0.5;

  return (
    <defs>
      <marker
        id={id}
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
  )
}

export default React.memo(ArrowDef);
