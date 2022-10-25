/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import useAppState from 'renderer/hooks/useAppState';
import { Swiper, SwiperSlide } from 'swiper/react';
import Draggable from 'react-draggable';
import 'swiper/css';

const Container = styled.div`
  width: 100%;
  height: 100%;
`
const FlexContainer = styled(Container)`
  position: relative;
  display: ${(props) => props.displayMode.startsWith('flex') && 'flex'};
  flex-direction: ${(props) =>
    props.displayMode === 'flexRow'
      ? 'row'
      : props.displayMode === 'flexColumn'
      ? 'column'
      : 'row'};
`;

const OverlayContainer = styled(Container)`
`;
const AbsoluteBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  clip-path: ${(props) => props.index === 1 && 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'};
`;
const DragDivWithPosition = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  z-index: 9999;
`

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
  const { displayMode = 'flexRow', sources } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';
  console.log('#### assetContainer:', sources, srcPath, displayMode)
  const onDragSplitter = React.useCallback((e, data) => {
    console.log('Event:',e);
    console.log('Data:',data);
  },[])

  return (
    <Container>
      {displayMode === 'overlay' && (
        <OverlayContainer>
          <Draggable
            axis="x"
            onDrag={onDragSplitter}
          >
            <DragDivWithPosition>
              Drag me
            </DragDivWithPosition>
          </Draggable>
          {sources.map((source, index) => (
            <AbsoluteBox key={source.srcId} index={index}>
              <Viewer
                key={source.srcId}
                srcType={source.srcType}
                src={source[srcPath]}
                srcId={source.srcId}
              />
            </AbsoluteBox>
          ))}
        </OverlayContainer>
      )}
      {(displayMode === 'flexColumn' || displayMode === 'flexRow') && (
        <FlexContainer displayMode={displayMode}>
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
      {displayMode === 'swipe' && (
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
      {(displayMode === '' || displayMode === undefined) && (
        <Container>
          {sources.map((source) => (
            <Viewer
              key={source.srcId}
              srcType={source.srcType}
              src={source[srcPath]}
              srcId={source.srcId}
            />
          ))}
        </Container>
      )}
    </Container>
  );
};

export default React.memo(AssetContainer);
