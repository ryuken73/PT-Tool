import React from 'react'
import styled from 'styled-components';

const CustomVideo = styled.video`
  width: 290px;
  object-fit: cover;
`

const VideoPlayer = (props, ref) => {
  return <CustomVideo crossOrigin="anonymous" ref={ref} />
}

export default React.memo(React.forwardRef(VideoPlayer));
