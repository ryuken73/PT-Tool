/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import ImageIcon from 'renderer/Components/Common/ImageIcon';
import SrcViewer from 'renderer/Components/Assets/SrcViewer';
import SwipeButton from 'renderer/Components/Assets/SwipeButton';
import Swipers from 'renderer/Components/Assets/Swipers';
import useAppState from 'renderer/hooks/useAppState';
import useAssetState from 'renderer/hooks/useAssetState';
import useConfigState from 'renderer/hooks/useConfigState';
import useWindowSize from 'renderer/hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import SplitIcon from 'renderer/assets/Split.svg';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-creative';
import { getStroke } from 'perfect-freehand';
import { getSvgPathFromStroke } from 'renderer/lib/appUtil';
import NextButton from '../Common/NextButton';

const options = {
  size: 300,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  touch-action: none;
  user-select: none;
`;

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
const AbsoluteBoxBrush = styled.div`
  position: absolute;
  display: ${props => props.index === 1 && !props.pathData ? 'none':'block'};
  width: 100%;
  height: 100%;
  clip-path: ${(props) => props.index === 1 && props.pathData && `path("${props.pathData}")`};
`;
  // clip-path: ${(props) = props.index === 1 && props.pathData ? `path("${props.pathData}")` : `polygon(0 0,100% 0, 100% 100%, 100% 0)`};
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

const ProtectLayer = styled(Container)`
  display: ${(props) => (props.isDragging ? 'block' : 'none')};
  position: absolute;
  background: transparent;
  z-index: 8888;
`;

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const [percentX, setPercentX] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const draggerOffset = React.useRef({ x: 0, y: 0 });
  const containerRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const { useSrcLocal, draggableDock, dockWidth } = useAppState();
  const { assets, currentAssetIndex, setCurrentAssetIndexState }= useAssetState();
  const { config } = useConfigState();
  const { fillSplitter } = config;
  const size = useWindowSize();
  const {
    displayMode = 'flexRow',
    swipeMode,
    swipeThreshold,
    assetId,
    sources,
    show,
  } = props;
  const srcPath = useSrcLocal ? 'srcLocal' : 'srcRemote';
  // console.log('#### assetContainer:', sources, srcPath, displayMode);

  const FILL_OFFSET = fillSplitter ? 26 : 0;

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

  const SplitSvg = React.useCallback(() => {
    const color = isDragging ? 'white':'transparent';
    return <ImageIcon src={SplitIcon} color={color} />;
  }, [isDragging]);

  const SplitLeftSvg = React.useCallback(() => {
    return <ImageIcon width="40px" src={SplitIcon} />;
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
          // restriction: '#topContainer',
          restriction: 'parent',
          endOnly: false
        })
      ],
      listeners: {
        start (event) {
          console.log(event, event.target)
        },
        move (event) {
          draggerOffset.current.x += event.dx;
          draggerOffset.current.y += event.dy;
          const LEFT_OFFSET = draggerOffset.current.x > 0 ? FILL_OFFSET : FILL_OFFSET * -1;
          syncSplitter(draggerOffset.current.x + offsetX + LEFT_OFFSET);
          event.target.style.transform = `translate(${draggerOffset.current.x}px, ${draggerOffset.current.y}px)`;
        },
        end (event) {
          onDragStop();
        }
      }
    })

    // eslint-disable-next-line consistent-return
    return () => {
      if(dragRef.current === null) return;
      interact(dragRef.current).unset();
    }
  }, [
    dragRef,
    offsetX,
    onDragStop,
    syncSplitter,
    displayMode,
    draggerOffset,
    FILL_OFFSET,
  ]);

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
    // eslint-disable-next-line consistent-return
    return () => {
      if (containerRef.current === null) return;
      interact(containerRef.current).unset();
    };
  }, [
    containerRef,
    offsetX,
    onDragStop,
    syncSplitter,
    displayMode,
    draggerOffset,
  ]);

  const [points, setPoints] = React.useState([]);

  const handlePointerDown = React.useCallback((e) => {
    e.target.setPointerCapture(e.pointerId);
    setPoints([[e.pageX, e.pageY, e.pressure]]);
  }, []);

  const handlePointerMove = React.useCallback((e) => {
    if (e.buttons !== 1) return;
    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
    },
    [points]
  );

  const stroke = React.useMemo(() => getStroke(points, options),[points]);
  const pathData = getSvgPathFromStroke(stroke);
  // console.log(pathData);
  const nextIndex = React.useMemo(() => {
    if (parseInt(currentAssetIndex, 10) === assets.length - 1) {
      return 0;
    }
    return currentAssetIndex + 1;
  }, [assets.length, currentAssetIndex]);
  const goNext = React.useCallback(() => {
    setCurrentAssetIndexState(nextIndex);
  }, [nextIndex, setCurrentAssetIndexState]);
  const nextTitle = assets[nextIndex].assetTitle;

  return (
    <Container id="xxx" ref={containerRef}>
      {displayMode === 'brush' && (
        <OverlayContainer>
          <NextButton onClick={goNext} nextTitle={nextTitle} />
          <ProtectLayer isDragging={isDragging} />
          {sources.map((source, index) => (
            <AbsoluteBoxBrush
              pathData={pathData}
              key={`${assetId}-${source.srcId}`}
              index={index}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              style={{ touchAction: "none" }}
            >
              <SrcViewer
                key={`${assetId}-${source.srcId}`}
                assetId={assetId}
                srcPath={srcPath}
                show={show}
                source={source}
                srcIndex={index}
                displayMode={displayMode}
              />
            </AbsoluteBoxBrush>
          ))}
        </OverlayContainer>
      )}
      {displayMode === 'overlaySplit' && (
        <OverlayContainer>
          <NextButton onClick={goNext} nextTitle={nextTitle} />
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
                key={`${assetId}-${source.srcId}`}
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
          <NextButton onClick={goNext} nextTitle={nextTitle} />
          {sources.map((source, index) => (
            <SrcViewer
              key={`${assetId}-${source.srcId}`}
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
        // <StyledSwiper
        //   effect="creative"
        //   threshold={100}
        //   pagination={{ clickable: true }}
        //   modules={[EffectFlip, EffectFade, EffectCreative, Pagination]}
        //   creativeEffect={{
        //     prev: {
        //       shadow: true,
        //       translate: [0, 0, -400],
        //     },
        //     next: {
        //       translate: ["100%", 0, 0],
        //     },
        //   }}
        // >
        // <Swipers swipeMode={swipeMode} swipeThreshold={swipeThreshold}>
        <Swipers swipeMode={swipeMode}>
          <NextButton onClick={goNext} nextTitle={nextTitle} />
          {sources.map((source, index) => (
            <SwiperSlide>
              {({ isActive }) => (
                <>
                <SrcViewer
                  key={`${assetId}-${source.srcId}`}
                  assetId={assetId}
                  srcPath={srcPath}
                  show={show}
                  source={source}
                  srcIndex={index}
                  isSwipeActive={isActive}
                  displayMode={displayMode}
                />
                <SwipeButton />
                </>
              )}
            </SwiperSlide>
          ))}
        </Swipers>
      )}
      {(displayMode === '' || displayMode === undefined) && (
        <Container>
        <NextButton onClick={goNext} nextTitle={nextTitle} />
          {sources.map((source, index) => (
            <SrcViewer
              key={`${assetId}-${source.srcId}`}
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
