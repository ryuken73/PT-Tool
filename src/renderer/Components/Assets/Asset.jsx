/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import AssetViewer from 'renderer/Components/Assets/AssetViewer'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
  overflow: hidden;
  transition: transform 0.5s;
`;

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { asset, show } = props;
  const { assetId, sources, displayMode='' } = asset;

  return (
    <Container show={show}>
      <AssetViewer
        displayMode={displayMode}
        assetId={assetId}
        sources={sources}
        show={show}
      />
    </Container>
  )

};

export default React.memo(AssetContainer);
