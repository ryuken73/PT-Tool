/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import ImageIcon from 'renderer/Components/Common/ImageIcon';
import SrcViewer from 'renderer/Components/Assets/SrcViewer';
import useAppState from 'renderer/hooks/useAppState';
import useWindowSize from 'renderer/hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import SplitIcon from 'renderer/assets/Split.svg';
import HeightIcon from '@mui/icons-material/Height';
import 'swiper/css';
import 'swiper/css/navigation';

const Container = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
  user-select: none;
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
  position: relative;
  width: 100%;
  height: 100%;
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
  left: calc(50% - 25.5px);
  z-index: 9999;
  touch-action: none;
  user-select: none;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ProtectLayer = styled(Container)`
  display: ${(props) => (props.isDragging ? 'block' : 'none')};
  position: absolute;
  background: transparent;
  z-index: 8888;
`;

const SplitSvg = () => {
  return <ImageIcon src={SplitIcon} />;
};

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const [percentX, setPercentX] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const draggerOffset = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const { useSrcLocal, draggableDock, dockWidth } = useAppState();
  const size = useWindowSize();
  const { displayMode = 'flexRow', assetId, sources, show } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';
  // console.log('#### assetContainer:', sources, srcPath, displayMode);

  const viewWidth = React.useMemo(() => {
    if(!draggableDock) return window.innerWidth;
    return window.innerWidth - dockWidth;
  }, [draggableDock, dockWidth, size])

  const offsetX = viewWidth / 2;

  const draggerPosition = React.useMemo(() => {
    return { x: draggerOffset.current.x + offsetX, y: draggerOffset.current.y }
  }, [offsetX]);

  const syncSplitter = React.useCallback((clientX, byDragging=true) => {
    const currentPercentX = (clientX / viewWidth) * 100;
    setPercentX(currentPercentX);
    if(byDragging) setIsDragging(true);
    },
    [viewWidth]
  );

  const onDragStop = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if(displayMode !== 'overlaySplit') return;
    const { x, y } = draggerOffset.current;
    const position = { x, y };
    if(dragRef.current === null) return;
    dragRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
  }, [displayMode]);

  // adjust splitter position(sync)
  React.useEffect(() => {
    syncSplitter(draggerPosition.x, false);
  }, [draggerPosition, draggableDock, syncSplitter])

  React.useEffect(() => {
    // console.log('^^^: redifine interactjs draggable', draggerOffset.current, offsetX, displayMode)
    if(displayMode !== 'overlaySplit') return;
    // const position = { x: 0, y: 0 };
    if(dragRef.current === null) return;
    interact(dragRef.current).draggable({
      inertia: {
        resistance: 3,
        // minSpeed: 200,
      },
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
          draggerOffset.current.x += event.dx;
          draggerOffset.current.y += event.dy;
          syncSplitter(draggerOffset.current.x + offsetX);
          event.target.style.transform = `translate(${draggerOffset.current.x}px, ${draggerOffset.current.y}px)`;
        },
        end (event) {
          onDragStop();
        }
      }
    })
  }, [dragRef, offsetX, onDragStop, syncSplitter, displayMode, draggerOffset]);

  React.useEffect(() => {
    if(displayMode !== 'overlaySplit') return;
    if(containerRef.current === null) return;
    interact(containerRef.current).gesturable({
      listeners: {
        move (event) {
          draggerOffset.current.x += event.dx;
          draggerOffset.current.y += event.dy;
          syncSplitter(draggerOffset.current.x + offsetX);
          dragRef.current.style.transform = `translate(${draggerOffset.current.x}px, ${draggerOffset.current.y}px)`;
        },
        end (event) {
          onDragStop();
        }
      }
    })
  },[containerRef, offsetX, onDragStop, syncSplitter, displayMode, draggerOffset])

  return (
    <Container ref={containerRef}>
      {displayMode === 'overlaySplit' && (
        <OverlayContainer>
          <DragDivWithPosition ref={dragRef}>
            <SplitSvg />
          </DragDivWithPosition>
          <ProtectLayer isDragging={isDragging} />
          {sources.map((source, index) => (
            <AbsoluteBox
              percentX={percentX}
              key={`${assetId}-${source.srcId}`}
              index={index}
            >
              <SrcViewer
                assetId={assetId}
                srcPath={srcPath}
                show={show}
                source={source}
                srcIndex={index}
                displayMode={displayMode}
              />
            </AbsoluteBox>
          ))}
        </OverlayContainer>
      )}
      {(displayMode === 'flexColumn' || displayMode === 'flexRow') && (
        <FlexContainer displayMode={displayMode}>
          {sources.map((source, index) => (
            <SrcViewer
              assetId={assetId}
              srcPath={srcPath}
              show={show}
              source={source}
              srcIndex={index}
              displayMode={displayMode}
            />
          ))}
        </FlexContainer>
      )}
      {displayMode === 'swipe' && (
        <StyledSwiper threshold={100}>
          {sources.map((source, index) => (
            <SwiperSlide>
              <SrcViewer
                assetId={assetId}
                srcPath={srcPath}
                show={show}
                source={source}
                srcIndex={index}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      )}
      {(displayMode === '' || displayMode === undefined) && (
        <Container>
          {sources.map((source, index) => (
            <SrcViewer
              assetId={assetId}
              srcPath={srcPath}
              show={show}
              source={source}
              srcIndex={index}
            />
          ))}
        </Container>
      )}
    </Container>
  );
};

export default React.memo(AssetContainer);
