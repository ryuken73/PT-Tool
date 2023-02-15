import React from 'react'
import ScrollyVideo from 'scrolly-video/dist/ScrollyVideo.esm';

// const CustomVideo = styled.video`
//   width: 100%;
//   height: 100%;
//   object-fit: ${props => props.objectFit};
//   transform: ${(props) => `scale(${props.scale})`};
// `

const VideoPlayer = (props) => {
  // eslint-disable-next-line react/prop-types
  console.log('xxx', props);
  const { src } = props;

  React.useEffect(() => {
    console.log('mount Scrolly');
    return () => {
      console.log('dismount Scrolly')
    }
  })
  return (
      <ScrollyVideo
        debug={true}
        useWebCodecs={false}
        transitionSpeed={5}
        src={src}
      />
  );
};

export default React.memo(VideoPlayer);
