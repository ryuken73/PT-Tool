import React from 'react';
import styled, {css, keyframes} from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';

const changeAnimation = keyframes`
  0% {
    height: 100%;
    opacity: 1;
  }
  100% {
    height: 100%;
    opacity: 0.7;
  }
`;
const animation = css`
  ${changeAnimation} 0.2s cubic-bezier(.73,.15,.96,.14);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  height: ${(props) => (props.assetChanged ? '100%' : '0%')};
  animation: ${(props) => props.assetChanged && animation};
  width: 100%;
  z-index: 10000;
  background: transparent;
`;

function NoTransition() {
  const { currentAssetIndex } = useAssetState();
  const [assetChanged, setAssetChanged] = React.useState(false);
  React.useEffect(() => {
    setAssetChanged(true);
  }, [currentAssetIndex]);

  const onAnimationEnd = React.useCallback(() => {
    setAssetChanged(false);
  }, []);

  return (
    <Container onAnimationEnd={onAnimationEnd} assetChanged={assetChanged} />
  );
}

export default React.memo(NoTransition)
