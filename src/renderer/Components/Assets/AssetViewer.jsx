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
  clip-path: ${(props) => props.index === 1 && `polygon(${props.percentX}% 0, 100% 0, 100% 100%, ${props.percentX}% 100%)`};
`;
const DragDivWithPosition = styled.div`
  position: absolute;
  bottom: 10%;
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

const MiddleLayer = styled(Container)`
  position: absolute;
  background: transparent;
  z-index: 8888;
`
const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const [percentX, setPercentX] = React.useState(50);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const { useSrcLocal } = useAppState();
  const { displayMode = 'flexRow', sources, show } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';
  // console.log('#### assetContainer:', sources, srcPath, displayMode);
  const onDragSplitter = React.useCallback((e, data) => {
    // const centerX = e.clientX - e.offsetX + e.target.offsetWidth / 2;
    const currentPercentX = (e.clientX / window.innerWidth) * 100;
    // console.log('###', centerX, e.clientX, e.offsetX, e.target.offsetWidth, e);
    setPercentX(currentPercentX);
    setPosition({ x: data.x, y: data.y });
  },[])

  return (
    <Container>
      {displayMode === 'overlay' && (
        <OverlayContainer>
          <Draggable
            axis="x"
            onDrag={onDragSplitter}
            position={position}
            positionOffset={{x: "-50%", y: 10}}
          >
            <DragDivWithPosition>
              Drag me
            </DragDivWithPosition>
          </Draggable>
          <MiddleLayer />
          {sources.map((source, index) => (
            <AbsoluteBox percentX={percentX} key={source.srcId} index={index}>
              <Viewer
                key={source.srcId}
                srcType={source.srcType}
                src={source[srcPath]}
                srcId={source.srcId}
                show={show}
                srcIndex={index}
              />
            </AbsoluteBox>
          ))}
        </OverlayContainer>
      )}
      {(displayMode === 'flexColumn' || displayMode === 'flexRow') && (
        <FlexContainer displayMode={displayMode}>
          {sources.map((source, index) => (
            <Viewer
              key={source.srcId}
              srcType={source.srcType}
              src={source[srcPath]}
              srcId={source.srcId}
              show={show}
              srcIndex={index}
            />
          ))}
        </FlexContainer>
      )}
      {displayMode === 'swipe' && (
        <StyledSwiper>
          {sources.map((source, index) => (
            <SwiperSlide>
              <Viewer
                key={source.srcId}
                srcType={source.srcType}
                src={source[srcPath]}
                srcId={source.srcId}
                show={show}
                srcIndex={index}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
      {(displayMode === '' || displayMode === undefined) && (
        <Container>
          {sources.map((source, index) => (
            <Viewer
              key={source.srcId}
              srcType={source.srcType}
              src={source[srcPath]}
              srcId={source.srcId}
              show={show}
              srcIndex={index}
            />
          ))}
        </Container>
      )}
    </Container>
  );
};

export default React.memo(AssetContainer);
