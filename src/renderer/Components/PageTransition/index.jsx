import React from 'react';
import useConfigState from 'renderer/hooks/useConfigState';
import VideoTransition from 'renderer/Components/PageTransition/VideoTransition';
import CSSTransition from 'renderer/Components/PageTransition/CSSTransition';
import NoTransition from 'renderer/Components/PageTransition/NoTransition';

const transitionMap = {
  videoTransition: VideoTransition,
  cssTransition: CSSTransition,
  noTransition: NoTransition,
};

function PageTransition(props) {
  // eslint-disable-next-line react/prop-types
  const { handleVideoEnded } = props;
  const { transitionType, transitionResource } = useConfigState();
  const Transition = transitionMap[transitionType];
  return (
    <Transition
      handleVideoEnded={handleVideoEnded}
      transitionResource={transitionResource}
    />
  );
}

export default React.memo(PageTransition);
