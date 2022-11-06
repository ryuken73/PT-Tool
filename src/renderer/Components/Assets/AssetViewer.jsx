/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import Player from 'renderer/Components/Players/Player';
import WebView from 'renderer/Components/Common/WebView';
import ImageBox from 'renderer/Components/Common/ImageBox';
import useAppState from 'renderer/hooks/useAppState';
import { Swiper, SwiperSlide } from 'swiper/react';
// import Draggable from 'react-draggable';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import HeightIcon from '@mui/icons-material/Height';
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
  left: calc(50% - 17.5px);
  z-index: 9999;
  touch-action: none;
  user-select: none;
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

const ProtectLayer = styled(Container)`
  display: ${(props) => (props.isDragging ? 'block' : 'none')};
  position: absolute;
  background: transparent;
  z-index: 8888;
`
const Splitter = styled(HeightIcon)`
  background: white;
  color: #140e30;
  border-radius: 10px;
  border: 1px solid black;
  transform: rotate(90deg);
  height: 1em;
  width:  0.7em;
  font-size: 3em;
  box-shadow: 0.03em -0.03em 0.1em 0.01em black;
`
const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const [percentX, setPercentX] = React.useState(50);
  // const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const dragRef = React.useRef(null);
  const { useSrcLocal } = useAppState();
  const { displayMode = 'flexRow', assetId, sources, show } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';
  // console.log('#### assetContainer:', sources, srcPath, displayMode);
  const onDragSplitter = React.useCallback((e, data) => {
    const clientX = e.clientX || e.touches[0].clientX;
    const currentPercentX = (clientX / window.innerWidth) * 100;
    setPercentX(currentPercentX);
    setPosition({ x: data.x, y: data.y });
    setIsDragging(true);
  }, []);
  const syncSplitter = React.useCallback((clientX) => {
    const currentPercentX = (clientX / window.innerWidth) * 100;
    setPercentX(currentPercentX);
    setIsDragging(true);
  }, []);
  const onDragStop = React.useCallback(() => {
    setIsDragging(false);
  }, []);
  const offsetX = window.innerWidth/2;
  React.useEffect(() => {
    const position = { x: 0, y: 0 };
    if(dragRef.current === null) return;
    interact(dragRef.current).draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent'
        })
      ],
      listeners: {
        start (event) {
          console.log(event, event.target)
        },
        move (event) {
          position.x += event.dx;
          position.y += event.dy;
          syncSplitter(position.x + offsetX);
          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
        end (event) {
          onDragStop();
        }
      }
    })
  }, [dragRef, offsetX, onDragStop, syncSplitter]);

  return (
    <Container>
      {displayMode === 'overlay' && (
        <OverlayContainer>
          {/* <Draggable
            axis="x"
            bounds="parent"
            onDrag={onDragSplitter}
            onStop={onDragStop}
            position={position}
            positionOffset={{x: "-50%", y: 10}}
          > */}
            <DragDivWithPosition ref={dragRef}>
              <Splitter background="maroon" fontSize="large" />
            </DragDivWithPosition>
          {/* </Draggable> */}
          <ProtectLayer isDragging={isDragging} />
          {sources.map((source, index) => (
            <AbsoluteBox percentX={percentX} key={source.srcId} index={index}>
              <Viewer
                key={`${assetId}-${source.srcId}`}
                assetId={assetId}
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
              key={`${assetId}-${source.srcId}`}
              assetId={assetId}
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
                key={`${assetId}-${source.srcId}`}
                assetId={assetId}
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
              key={`${assetId}-${source.srcId}`}
              assetId={assetId}
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
