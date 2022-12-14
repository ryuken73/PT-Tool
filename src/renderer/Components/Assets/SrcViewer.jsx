/* eslint-disable react/prop-types */
import React from 'react';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';

const ViewMap = {
  web: WebView,
  video: Player,
  image: ImageBox,
};

function SrcViewer(props) {
  const {
    assetId,
    srcPath,
    show,
    source,
    srcIndex,
    displayMode,
    ...remainOpts
  } = props;
  const { srcId, srcType, objectFit='cover' } = source;
  const Viewer = ViewMap[srcType];
  return (
    <Viewer
      key={`${assetId}-${srcId}`}
      assetId={assetId}
      srcType={srcType}
      src={source[srcPath]}
      srcId={srcId}
      show={show}
      srcIndex={srcIndex}
      objectFit={objectFit}
      displayMode={displayMode}
      {...remainOpts}
    />
  );
}

export default React.memo(SrcViewer);
