/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import useAppState from 'renderer/hooks/useAppState';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const FlexContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: ${(props) => props.diplayMode === 0 && 'flex'};
  flex-direction: ${(props) => props.diplayMode === 0 && 'row'};
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ViewMap = {
  web: WebView,
  video: Player,
  image: ImageBox,
};

const Viewer = (props) => {
  const { srcType, ...remainOpts } = props;
  const SrcViewer = ViewMap[srcType];
  return <SrcViewer {...remainOpts} />;
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { useSrcLocal } = useAppState();
  const { diplayMode, sources } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';

  return (
    <Container>
    {diplayMode === 0 && (
      <FlexContainer diplayMode={diplayMode}>
        {sources.map((source) => (
          <Viewer
            key={source.srcId}
            srcType={source.srcType}
            src={source[srcPath]}
            srcId={source.srcId}
          />
        ))}
      </FlexContainer>
    )}
    {diplayMode === 1 && (
      <StyledSwiper>
        {sources.map((source) => (
          <SwiperSlide>
            <Viewer
              key={source.srcId}
              srcType={source.srcType}
              src={source[srcPath]}
              srcId={source.srcId}
            />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    )}
    </Container>
  );
};

export default React.memo(AssetContainer);