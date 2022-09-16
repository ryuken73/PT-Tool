import React from 'react';
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
import useAppState from 'renderer/hooks/useAppState';
import Asset from './Asset';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  font-size: calc(10px + 2vmin);
  overflow: hidden;
`;

const AssetContainer = () => {
  const { drawShow } = useAppState()
  const { assets, assetShowMask } = useAssetState();
  return (
    <Container>
      {assets.map((asset, index) => (
        <Asset options={asset} drawOn={drawShow} show={assetShowMask[index]} />
      ))}
    </Container>
  )
}

export default React.memo(AssetContainer);
