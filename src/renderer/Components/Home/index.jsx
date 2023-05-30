import React from 'react';
import styled from 'styled-components';
import ImageBox from 'renderer/Components/Common/ImageBox';
import homeImage from 'renderer/assets/home.png';
import useAppState from 'renderer/hooks/useAppState';

const ANIMATION_SEC = 0.5;
const ANIMATION_SEC_OPACITY = 0.4;
const EASE_IN_QUART = "cubic-bezier(0.5, 0, 0.75, 0)";
const EASE_IN_EXPO = "cubic-bezier(0.7, 0, 0.84, 0)";
const EASE_IN_OUT_BACK = "cubic-bezier(0.68, -0.6, 0.32, 1.6)";
const HomeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 21000;
  height: 100%;
  width: 0%;
  width: ${(props) => props.homeShow === true && '100%'};
  /* opacity: 0; */
  /* opacity: ${(props) => props.homeShow === true && 1}; */
  /* transition: width ${ANIMATION_SEC}s ease-in, opacity ${ANIMATION_SEC_OPACITY}s ease-in; */
  transition: width ${ANIMATION_SEC}s ${EASE_IN_EXPO};
  /* transition: width ${ANIMATION_SEC}s ${EASE_IN_QUART}; */
  /* transition: width ${ANIMATION_SEC}s ${EASE_IN_OUT_BACK} */
`;


function Home(props) {
  const { homeShow, setHomeShowState } = useAppState();
  const { homeSrc = homeImage } = props;
  const onClickImage = React.useCallback(() => {
    setHomeShowState(false);
  }, [setHomeShowState]);
  return (
    <HomeContainer homeShow={homeShow}>
      <ImageBox onClick={onClickImage} src={homeSrc} />;
    </HomeContainer>
  )
}

export default React.memo(Home);
