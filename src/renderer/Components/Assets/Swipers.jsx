import React from 'react';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import constants from 'renderer/config/constants';
import {
  EffectCreative,
  EffectFade,
  EffectFlip,
  Navigation,
  Pagination,
} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Normal = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, swipeThreshold } = props;
  return (
    <StyledSwiper
      threshold={100}
      pagination
      modules={[Pagination]}
    >
      {children}
    </StyledSwiper>
  );
}
const Creative = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, swipeThreshold } = props;
  return (
    <StyledSwiper
      grabCursor
      threshold={swipeThreshold}
      effect="creative"
      pagination
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      modules={[EffectCreative, Pagination]}
    >
      {children}
    </StyledSwiper>
  );
};
const Fade = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, swipeThreshold } = props;
  return (
    <StyledSwiper
      spaceBetween={30}
      threshold={swipeThreshold}
      effect="fade"
      pagination
      modules={[EffectFade, Pagination]}
    >
      {children}
    </StyledSwiper>
  )
}
const Flip = (props) => {
  // eslint-disable-next-line react/prop-types
  const { children, swipeThreshold } = props;
  return (
    <StyledSwiper
      effect="flip"
      threshold={swipeThreshold}
      grabCursor
      pagination
      modules={[EffectFlip, Pagination]}
    >
      {children}
    </StyledSwiper>
  )
};

const { SWIPE_MODES } = constants;
const SwipeMap = {
  [SWIPE_MODES.NORMAL]: Normal,
  [SWIPE_MODES.FADE]: Fade,
  [SWIPE_MODES.CARD]: Creative,
  [SWIPE_MODES.ROTATE]: Flip
};

function Swipers(props) {
  // eslint-disable-next-line react/prop-types
  const { swipeMode, swipeThreshold, children } = props;
  const TargetSwiper = SwipeMap[swipeMode];
  return (
    <TargetSwiper swipeThreshold={swipeThreshold}>{children}</TargetSwiper>
  );
}

export default React.memo(Swipers);
