import React from 'react'
import styled from 'styled-components';

const CustomVideo = styled.video`
  /* width: 290px; */
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
`

const VideoPlayer = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { objectFit = 'cover' } = props;
  return <CustomVideo crossOrigin="anonymous" objectFit={objectFit} ref={ref} />
}

export default React.memo(React.forwardRef(VideoPlayer));
