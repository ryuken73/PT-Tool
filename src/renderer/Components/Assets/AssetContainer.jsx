import React from 'react';
import styled from 'styled-components';
import useAppState from 'renderer/hooks/useAppState';
import useAssetState from 'renderer/hooks/useAssetState';
import useDialogState from 'renderer/hooks/useDialogState';
import useConfigState from 'renderer/hooks/useConfigState';
import PageTransition from 'renderer/Components/PageTransition';
import CONSTANTS from 'renderer/config/constants';
import Asset from './Asset';
import AddDialog from '../Dialog/AddDialog';

const { TRANSITIONS } = CONSTANTS;

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* border: grey 1px solid; */
  // border-width: 0 1px 1px 0;
  // border-style: solid;
  // border-color: grey;
  box-sizing: border-box;
  /* border-collapse: collapse; */
  font-size: calc(10px + 2vmin);
  overflow: hidden;
`;

const handleDragOver = (event) => {
  event.preventDefault();
};

const AssetContainer = () => {
  const { setDialogOpenState, setDroppedSrcState } = useDialogState();
  const { assets, assetShowMask } = useAssetState();
  const { isTransitionFull } = useConfigState();
  const { showTransition, setShowTransitionState } = useAppState();

  const handleDrop = React.useCallback((event) => {
    const url = event.dataTransfer.getData('url');
    const file = event.dataTransfer.files[0];
    const droppedSrc = file ? file.path : url;
    setDroppedSrcState(droppedSrc);
    setDialogOpenState(true);
    },
    [setDialogOpenState, setDroppedSrcState]
  );

  const handleVideoEnded = React.useCallback(() => {
    setShowTransitionState(false);
  }, [setShowTransitionState])

  return (
    <Container onDrop={handleDrop} onDragOver={handleDragOver}>
      {showTransition && !isTransitionFull && (
        <PageTransition handleVideoEnded={handleVideoEnded} />
      )}
      {assets.map((asset, index) => (
        // <Asset options={asset} drawOn={drawShow} show={assetShowMask[index]} />
        <Asset key={asset.assetId} asset={asset} show={assetShowMask[index]} />
      ))}
      <AddDialog />
    </Container>
  )
}

export default React.memo(AssetContainer);
