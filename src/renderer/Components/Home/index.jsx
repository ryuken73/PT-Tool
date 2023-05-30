import React from 'react';
import styled from 'styled-components';
import ImageBox from 'renderer/Components/Common/ImageBox';
import homeImage from 'renderer/assets/home.png';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'renderer/hooks/useConfigState';

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
const Circle = styled.div`
  width: 0px;
  width: ${(props) => props.show === true && '100px'};
  height: 0px;
  height: ${(props) => props.show === true && '100px'};
  opacity: 0.1;
  opacity: ${(props) => props.show === true && '0.3'};
  border-radius: 50px;
  background: black;
  position: absolute;
  transform: ${(props) => `translate(${props.xyPosition.x}px, ${props.xyPosition.y}px)`};
  z-index: 21000;
  /* display: ${props => !props.show && 'none'}; */
  transition: ${props => props.show ? "width 0s, height 0s":"width 1s, height 1s"};
`


function Home(props) {
  const { homeShow, setHomeShowState } = useAppState();
  const { homeImagePath } = useConfigState();
  const [circlePosition, setCirclePosition] = React.useState({ x: 0, y: 0 });
  const [showCircle, setShowCircle] = React.useState(false);
  // eslint-disable-next-line react/prop-types
  const { homeSrc = homeImage } = props;

  const onClickImage = React.useCallback((event) => {
    setShowCircle(showCircle => {
      setTimeout(() => {
        setShowCircle(false)
      },100)
      return true;
    });
    setCirclePosition(() => {
      return {
        x: event.clientX - 50,
        y: event.clientY - 50,
      }
    })
    setHomeShowState(false);
    },
    [setCirclePosition, setHomeShowState]
  );
  return (
    <HomeContainer homeShow={homeShow}>
      <Circle xyPosition={circlePosition} show={showCircle} />
      <ImageBox onClick={onClickImage} src={homeSrc} />;
    </HomeContainer>
  )
}

export default React.memo(Home);
