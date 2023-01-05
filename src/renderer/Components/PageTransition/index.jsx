import React from 'react';
import useConfigState from 'renderer/hooks/useConfigState';
import VideoTransition from 'renderer/Components/PageTransition/VideoTransition';
import CSSTransition from 'renderer/Components/PageTransition/CSSTransition';
import NoTransition from 'renderer/Components/PageTransition/NoTransition';

const transitionMap = {
  videoTransition: VideoTransition,
  cssTransition: CSSTransition,
  noTransition: NoTransition,
}

function PageTransition(props) {
  // eslint-disable-next-line react/prop-types
  const { handleVideoEnded } = props;
  const { transitionName } = useConfigState();
  const Transition = transitionMap[transitionName];
  return <Transition handleVideoEnded={handleVideoEnded} />
}

export default React.memo(PageTransition);
