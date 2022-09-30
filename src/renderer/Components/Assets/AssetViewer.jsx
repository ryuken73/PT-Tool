/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import useAppState from 'renderer/hooks/useAppState';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const ViewMap = {
  web: WebView,
  video: Player,
  image: ImageBox,
};

const Viewer = (props) => {
  const { srcType, ...remainOpts } = props;
  console.log(srcType)
  const SrcViewer = ViewMap[srcType];
  return <SrcViewer {...remainOpts} />
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { useSrcLocal } = useAppState();
  const { displayType, sources } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';

  return (
    <Container>
      {sources.map((source) => (
        <Viewer
          key={source.srcId}
          srcType={source.srcType}
          src={source[srcPath]}
        />
      ))}
    </Container>
  );
};

export default React.memo(AssetContainer);
