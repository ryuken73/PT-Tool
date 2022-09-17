import React from 'react';
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
import useDialogState from 'renderer/hooks/useDialogState';
import Asset from './Asset';
import AddDialog from '../Dialog/AddDialog';

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

const handleDragOver = (event) => {
  event.preventDefault();
};

const AssetContainer = () => {
  // const { drawShow } = useAppState()
  const { setDialogOpenState, setDroppedSrcState } = useDialogState();
  const { assets, assetShowMask } = useAssetState();

  const handleDrop = React.useCallback((event) => {
    const url = event.dataTransfer.getData('url');
    const file = event.dataTransfer.files[0];
    const droppedSrc = file ? file.path : url;
    setDroppedSrcState(droppedSrc);
    setDialogOpenState(true);
    },
    [setDialogOpenState, setDroppedSrcState]
  );

  return (
    <Container onDrop={handleDrop} onDragOver={handleDragOver}>
      {assets.map((asset, index) => (
        // <Asset options={asset} drawOn={drawShow} show={assetShowMask[index]} />
        <Asset options={asset} show={assetShowMask[index]} />
      ))}
      <AddDialog />
    </Container>
  )
}

export default React.memo(AssetContainer);
