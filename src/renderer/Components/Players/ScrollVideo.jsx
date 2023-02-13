import React from 'react'
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.cjs';

// const CustomVideo = styled.video`
//   width: 100%;
//   height: 100%;
//   object-fit: ${props => props.objectFit};
//   transform: ${(props) => `scale(${props.scale})`};
// `

const VideoPlayer = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { src } = props;
  return (
    <ScrollyVideo debug={true} crossOrigin="anonymous" src={src} ref={ref} />
  );
};

export default React.memo(React.forwardRef(VideoPlayer));
