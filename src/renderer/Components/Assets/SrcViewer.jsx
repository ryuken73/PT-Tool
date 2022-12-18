/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import IconButton from '@mui/material/IconButton';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import useAssetState from 'renderer/hooks/useAssetState';

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  left: ${(props) => !props.isRightSide && '20px'};
  right: ${(props) => props.isRightSide && '20px'};
  z-index: 10000;
`;
const ViewMap = {
  web: WebView,
  video: Player,
  image: ImageBox,
};

function SrcViewer(props) {
  const { updateCurrentAssetSrc } = useAssetState();
  const { assetId, srcPath, show, source, srcIndex, ...remainOpts } = props;
  const { srcId, srcType, objectFit='cover' } = source;
  const Viewer = ViewMap[srcType];
  const isToggleBtnRightSide = srcIndex > 0;
  const toggleObjectFit = React.useCallback(() => {
    if (objectFit === undefined) {
      updateCurrentAssetSrc(srcId, 'objectFit', 'cover');
      return;
    }
    if (objectFit === 'cover') {
      updateCurrentAssetSrc(srcId, 'objectFit', 'contain');
      return;
    }
    if (objectFit === 'contain') {
      updateCurrentAssetSrc(srcId, 'objectFit', 'none');
      return;
    }
    updateCurrentAssetSrc(srcId, 'objectFit', 'cover');
  }, [objectFit, srcId, updateCurrentAssetSrc])
  return (
    <>
      {srcType !== 'web' && (
        <ButtonContainer isRightSide={isToggleBtnRightSide}>
          <IconButton onClick={toggleObjectFit}>
            <AspectRatioIcon
              sx={{
                fontSize: 30,
                // color: 'maroon',
                // background: 'white',
                opacity: 0.1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </ButtonContainer>
      )}
      <Viewer
        key={`${assetId}-${srcId}`}
        assetId={assetId}
        srcType={srcType}
        src={source[srcPath]}
        srcId={srcId}
        show={show}
        srcIndex={srcIndex}
        objectFit={objectFit}
        {...remainOpts}
      />
    </>
  );
}

export default React.memo(SrcViewer);
