/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import useAppState from 'renderer/hooks/useAppState';

const Container = styled.div`
  height: 100%;
  width: 100%;
  /* height: ${(props) => (props.show ? '100%' : '0%')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  display: ${(props) => (props.show ? 'block' : 'none')};
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  /* transition: all 1s; */
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  overflow: hidden;
  /* filter: grayscale(100%); */
  /* filter: ${(props) => props.drawOn && 'grayscale(100%)'}; */
  /* filter: ${(props) => props.drawOn && 'contrast(175%) brightness(103%)'}; */
  /* ${(props) => props.drawOn && 'transform: scale(1.01)'}; */
  transition: transform 0.5s;
`;

const ViewMap = {
  web: WebView,
  video: Player,
  image: ImageBox,
};

const Viewer = (props) => {
  const { srcType, ...remainOpts } = props;
  const SrcViewer = ViewMap[srcType];
  return <SrcViewer {...remainOpts} />
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { useSrcLocal } = useAppState();
  const { asset, show } = props;
  const { sources } = asset;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';

  return (
    <Container show={show}>
      {sources.map((source) => (
        <Viewer
          key={source.srcId}
          srcType={source.srcType}
          src={source[srcPath]}
        />
        // <ImageBox key={source.srcId} src={source[srcPath]} />
      ))}
    </Container>
  )

};

export default React.memo(AssetContainer);
