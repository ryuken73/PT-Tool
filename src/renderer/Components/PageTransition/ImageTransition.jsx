import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import RainDrop from 'renderer/assets/rain_drop1.jpg';
import useAssetState from 'renderer/hooks/useAssetState';

const changeAnimation = keyframes`
  0% {
    width: 100%;
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%, 0 0, 50% 0, 100% 0, 100% 100%, 50% 100%, 50% 0);
    opacity: 1;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  100% {
    width: 100%;
    clip-path: polygon(0 0, 1% 0, 1% 100%, 0 100%, 0 0, 99% 0, 100% 0, 100% 100%, 99% 100%, 99% 0);
    opacity: 0.7;
    background: black;
  }
`;

const animation = css`
  ${changeAnimation} 0.2s cubic-bezier(.73,.15,.96,.14);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  height: ${(props) => (props.assetChanged ? '100%' : '0%')};
  width: 100%;
  z-index: 10000;
  animation: ${(props) => props.assetChanged && animation};
  animation-delay: 0.1s;
  transform-origin: 0% 100%;
`

const CustomImg = styled.img`
  display: ${(props) => !props.assetChanged && 'none'};
  object-fit: contain;
  width: 100%;
`

function ImageTransition() {
  const { currentAssetIndex } = useAssetState();
  const [assetChanged, setAssetChanged] = React.useState(false);

  React.useEffect(() => {
    setAssetChanged(true);
  }, [currentAssetIndex]);

  const onAnimationEnd = React.useCallback(() => {
    setAssetChanged(false);
  }, []);

  return (
    <Container onAnimationEnd={onAnimationEnd} assetChanged={assetChanged}>
      <CustomImg src={RainDrop} assetChanged={assetChanged} />
    </Container>
  );
}

export default React.memo(ImageTransition);
