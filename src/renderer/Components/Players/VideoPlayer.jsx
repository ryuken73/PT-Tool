import React from 'react'
import styled from 'styled-components';

const CustomVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  transform: ${(props) => `scale(${props.scale})`};
`

const VideoPlayer = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { objectFit = 'cover', scale } = props;
  return (
    <CustomVideo
      crossOrigin="anonymous"
      objectFit={objectFit}
      scale={scale}
      ref={ref}
    />
  )
}

export default React.memo(React.forwardRef(VideoPlayer));
