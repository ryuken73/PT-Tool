import React from 'react';
import styled from 'styled-components';
import HLSPlayer from 'renderer/Components/HLSPlayer';
import WebView from './WebView';
import ImageBox from './ImageBox';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
`

const AssetMap = {
  web: WebView,
  video: HLSPlayer,
  image: ImageBox,
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { options, show } = props;
  const { type, ...remainOpts } = options;
  const Asset = AssetMap[type];

  return (
    <Container show={show}>
      <Asset {...remainOpts} />;
    </Container>
  )

};

export default React.memo(AssetContainer);
