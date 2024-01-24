/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import AssetViewer from 'renderer/Components/Assets/AssetViewer'
import SwipeControl from 'renderer/Components/SwipeControl';
import constants from 'renderer/config/constants';
import Resizable from '../Common/Resizable';
import tackImage from 'renderer/assets/tack.png';

const {
  SCROLL_VIDEO_SERVER_LOCAL_URL,
  SCROLL_VIDEO_SERVER_REMOTE_URL,
  NEWS_PREVIEW_SERVER_LOCAL_URL,
  NEWS_PREVIEW_SERVER_REMOTE_URL
} = constants;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
  overflow: hidden;
  transition: transform 0.5s;
`;
const StyledTack = styled.img`
  position: absolute;
  top: 50px;
  right: 50px;
  z-index: 1001;
  width: 30px;
  padding: 10px;
  border: dashed 3px maroon;
  opacity: 0.3;
  border-radius: 10px;
`

const clone = (obj) => {
  return { ...obj };
};
const convertToNewsPreviewType = (assetId, useSrcLocal=true) => {
  const serverUrl = useSrcLocal
    ? NEWS_PREVIEW_SERVER_LOCAL_URL
    : NEWS_PREVIEW_SERVER_REMOTE_URL;
  const previewUrl = `${serverUrl}?assetId=${assetId}`;
  return [{
    progress: '100%',
    size: null,
    srcId: 0,
    srcType: 'web',
    src: previewUrl,
    srcLocal: previewUrl,
    srcRemote: previewUrl,
  }]
};
const convertToScrollVideoType = (
  source,
  smooth = false,
  scrollSpeed = 500,
  useSrcLocal = true
) => {
  const { srcRemote } = source;
  const serverUrl = useSrcLocal
    ? SCROLL_VIDEO_SERVER_LOCAL_URL
    : SCROLL_VIDEO_SERVER_REMOTE_URL;
  const scrollyUrl = `${serverUrl}/?url=${srcRemote}&smooth=${smooth}&length=${scrollSpeed}`
  return {
    ...source,
    src: scrollyUrl,
    srcRemote: scrollyUrl,
    srcLocal: scrollyUrl,
    srcType: 'web',
  };
};
const applyScrollOptions = (sources, scrollOptions, useSrcLocal) => {
  if (!scrollOptions.isScrollVideo) {
    return sources;
  };
  const { isScrollSmooth, scrollSpeed } = scrollOptions;

  // target source for scroll video is limited to first source;
  const targetVideoSource = clone(sources[0]);
  const sourceModified = convertToScrollVideoType(
    targetVideoSource,
    isScrollSmooth,
    scrollSpeed,
    useSrcLocal
  );
  console.log('&&&', sourceModified);
  return [sourceModified]
};

const Asset = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { asset, show, useSrcLocal } = props;
  const {
    assetId,
    sources: sourcesInState,
    displayMode = '',
    swipeMode = 'NORMAL',
    isScrollVideo,
    isScrollSmooth,
    scrollSpeed,
    assetTexts=[],
    isNewsPreview = false,
  } = asset;

  console.log('^^^', assetTexts, isNewsPreview)
  const scrollOptions = { isScrollSmooth, isScrollVideo, scrollSpeed };

  const sourcesScroll = applyScrollOptions(
    sourcesInState,
    scrollOptions,
    useSrcLocal
  );

  const sources = isNewsPreview
    ? convertToNewsPreviewType(assetId, useSrcLocal)
    : sourcesScroll;

  console.log('%%%', sources)
  const hasText = assetTexts.length > 0;
  return (
    <Container show={show}>
      {assetTexts.map((assetText, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Resizable key={assetText.textId} index={index} assetText={assetText} />
      ))}
      {/* {hasText && <StyledTack src={tackImage} />} */}
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
