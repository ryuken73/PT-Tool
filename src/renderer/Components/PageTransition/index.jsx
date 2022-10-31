import React from 'react';
import styled, { css, keyframes } from 'styled-components';
// import { keyframes } from '@emotion/react'
import useAssetState from 'renderer/hooks/useAssetState';

const changeAnimation = keyframes`
  0% {
    background: maroon;
    height: 100%;
    opacity: 1;
  }
  50% {
    background: maroon;
  }
  100% {
    background: maroon;
    height: 0%;
    opacity: 0;
  }
`;

const animation = css`
  ${changeAnimation} 1s cubic-bezier(.78,.01,1,-0.08);
  /* ${changeAnimation} 2s cubic-bezier(.25,.41,.74,-0.65); */
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  height: ${(props) => (props.assetChanged ? '100%' : '0%')};
  width: 100%;
  z-index: 10000;
  animation: ${(props) => props.assetChanged && animation};
  transform-origin: 0% 100%;
`;

const PageTransition = () => {
  const { currentAsset } = useAssetState();
  const [assetChanged, setAssetChanged] = React.useState(false);

  React.useEffect(() => {
    setAssetChanged(true);
  }, [currentAsset]);

  const onAnimationEnd = React.useCallback(() => {
    setAssetChanged(false);
  }, []);
  return (
    <Container onAnimationEnd={onAnimationEnd} assetChanged={assetChanged}>
      <h1 data-text="SBS News">SBS News</h1>
    </Container>
  );
}

// export default React.memo(PageTransition);
export default PageTransition;
