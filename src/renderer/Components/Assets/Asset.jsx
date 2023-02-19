/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import AssetViewer from 'renderer/Components/Assets/AssetViewer'
import SwipeControl from 'renderer/Components/SwipeControl';
import constants from 'renderer/config/constants';

const { SCROLL_VIDEO_SERVER_URL } = constants;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
  overflow: hidden;
  transition: transform 0.5s;
`;

const clone = (obj) => {
  return { ...obj };
};
const convertToScrollVideoType = (
  source,
  smooth = false,
  scrollSpeed = 500
) => {
  const { srcRemote } = source;
  const scrollyUrl = `${SCROLL_VIDEO_SERVER_URL}/?url=${srcRemote}&smooth=${smooth}&length=${scrollSpeed}`
  return {
    ...source,
    src: scrollyUrl,
    srcRemote: scrollyUrl,
    srcLocal: scrollyUrl,
    srcType: 'web',
  };
};
const applyScrollOptions = (sources, scrollOptions) => {
  if (!scrollOptions.isScrollVideo) {
    return sources;
  };
  const { isScrollSmooth, scrollSpeed } = scrollOptions;

  // target source for scroll video is limited to first source;
  const targetVideoSource = clone(sources[0]);
  const sourceModified = convertToScrollVideoType(targetVideoSource, isScrollSmooth, scrollSpeed);
  console.log('&&&', sourceModified);
  return [sourceModified]
};

const Asset = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { asset, show } = props;
  const {
    assetId,
    sources: sourcesInState,
    displayMode = '',
    swipeMode = 'NORMAL',
    isScrollVideo,
    isScrollSmooth,
    scrollSpeed,
  } = asset;

  const scrollOptions = { isScrollSmooth, isScrollVideo, scrollSpeed };
  const sources = applyScrollOptions(sourcesInState, scrollOptions);

  return (
    <Container show={show}>
      <AssetViewer
        displayMode={displayMode}
        swipeMode={swipeMode}
        assetId={assetId}
        sources={sources}
        show={show}
      />
      {displayMode === 'swipe' && <SwipeControl swipeMode={swipeMode} />}
    </Container>
  )

};

export default React.memo(Asset);
