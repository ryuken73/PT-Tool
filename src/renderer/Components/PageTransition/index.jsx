import React from 'react';
import useConfigState from 'renderer/hooks/useConfigState';
import VideoTransition from './VideoTransition';
import CSSTransition from './CSSTransition';

const transitionMap = {
  videoTransition: VideoTransition,
  cssTransition: CSSTransition,
}

function PageTransition(props) {
  // eslint-disable-next-line react/prop-types
  const { handleVideoEnded } = props;
  const { transitionName } = useConfigState();
  const Transition = transitionMap[transitionName];
  return <Transition handleVideoEnded={handleVideoEnded} />
}

export default React.memo(PageTransition);
