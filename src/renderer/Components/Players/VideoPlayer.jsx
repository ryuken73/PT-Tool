import React from 'react'
import styled from 'styled-components';

const CustomVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  transform: ${(props)=> `scale(${props.scale}) translateX(${props.translateX}%) translateY(${props.translateY}%)`};

`

const VideoPlayer = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const {
    objectFit = 'cover',
    scale = 1,
    translateX = 0,
    translateY = 0,
    onClick,
    onTouchEnd
  } = props;
  return (
    <CustomVideo
      crossOrigin="anonymous"
      objectFit={objectFit}
      scale={scale}
      translateX={translateX}
      translateY={translateY}
      ref={ref}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
    />
  )
}

export default React.memo(React.forwardRef(VideoPlayer));
