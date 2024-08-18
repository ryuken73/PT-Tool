import React from 'react';
import Box from '@mui/material/Box';
import { ReactTyped } from 'react-typed';
import Slider from '@mui/material/Slider';
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
import usePrevious from 'renderer/hooks/usePrevious';
import interact from 'interactjs';
import tackImage from 'renderer/assets/tack.png';
import questionImage from 'renderer/assets/folderQuestion.svg';
import { animate } from 'renderer/lib/appUtil';
import {
  Container,
  FullBox,
  Controls,
  SaveConfirm,
  Button,
  SmallText,
  StyleContainer,
  ColorBox,
  ColorPickerContainer,
  EasingContainer
} from 'renderer/Components/Common/ResizableStyles'
import constants from 'renderer/config/constants';
import ColorPicker from './ColorPicker';

const { EASINGS } = constants;

const StyledTack = styled.img`
  z-index: 1001;
  width: 60px;
  padding: 10px;
  opacity: 1;
  border-radius: 10px;
`;
const StyledReactTyped = styled(ReactTyped)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(10px, 10px);
`;

const dragMoveListener = (event, currentTransformRef) => {
  const { target } = event;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // translate the element
  target.style.transform = `translate(${x}px, ${y}px)`;

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
  currentTransformRef.current.x = x;
  currentTransformRef.current.y = y;
  return [x, y];
};

function Resizable(props) {
  // eslint-disable-next-line react/prop-types
  const { minScale = 1, index, assetText } = props;
  // eslint-disable-next-line react/prop-types
  const {
    textId,
    assetText: text,
    animationDuration = 500,
    background = 'yellow',
    font = 'black',
    border = 'black',
    savedTransform = null,
    easingKey = 'OVER_OUT'
  } = assetText;
  const { updateCurrentAssetText } = useAssetState();
  const [hideButton, setHideButton] = React.useState(true);
  const [hideStyle, setHideStyle] = React.useState(true);
  const [hideColor, setHideColor] = React.useState(true);
  const [hideEasing, setHideEasing] = React.useState(true);
  const [currentColorTarget, setCurrentColorTarget] = React.useState(null);
  const [currentEasingKey, setCurrentEasingKey] = React.useState(easingKey);
  const [isIconShape, setIsIconShape] = React.useState(false);
  const [clientX, setClientX] = React.useState(-100);
  const draggableRef = React.useRef(null);
  const resizableRef = React.useRef(null);
  const currentTransformRef = React.useRef({ x: 0, y: 0, angle: 0, scale: 1 });
  const savedTransformRef = React.useRef(savedTransform);

  const prevX = usePrevious(clientX);
  // console.log(prevX, clientX)

  const toggleHideColor = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setHideColor((hideColor) => {
      return !hideColor;
    });
  }, []);
  const toggleEasing = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setHideEasing((hideEasing) => {
      return !hideEasing;
    });
  }, []);

  const saveCurrentTransform = React.useCallback(() => {
    savedTransformRef.current = { ...currentTransformRef.current };
    updateCurrentAssetText(textId, 'savedTransform', savedTransformRef.current);
  }, [textId, updateCurrentAssetText]);

  const restoreSavedTransform = React.useCallback(() => {
    if (savedTransformRef.current === null) return;
    const { x, y, scale } = savedTransformRef.current;
    const { x: xC, y: yC, scale: scaleC } = currentTransformRef.current;

    const from = { transform: `translate(${xC}px, ${yC}px)` };
    const to = { transform: `translate(${x}px, ${y}px)` };
    const translateElement = draggableRef.current;
    const animationOption = {
      duration: animationDuration,
      easing: EASINGS[currentEasingKey]
    };
    const animation = animate(translateElement, from, to, animationOption);
    const onFinished = () => {
      draggableRef.current.style.transform = `translate(${x}px, ${y}px)`;
      draggableRef.current.setAttribute('data-x', x);
      draggableRef.current.setAttribute('data-y', y);
      currentTransformRef.current.x = x;
      currentTransformRef.current.y = y;
      setIsIconShape(false);
      animation.removeEventListener('finish', onFinished);
    };
    animation.addEventListener('finish', onFinished);

    const fromScale = { transform: `scale(${scaleC})` };
    const toScale = { transform: `scale(${scale})` };
    const scaleElement = resizableRef.current;
    const animationScale = animate(
      scaleElement,
      fromScale,
      toScale,
      animationOption
    );
    const onFinishScale = () => {
      resizableRef.current.style.transform = `scale(${scale})`;
      animationScale.removeEventListener('finish', onFinishScale);
      currentTransformRef.current.scale = scale;
    };
    animationScale.addEventListener('finish', onFinishScale);
  }, [animationDuration, currentEasingKey]);

  const onClickConfirm = React.useCallback(
    (event) => {
      event.stopPropagation();
      const answer = event.target.id;
      if (answer === 'save') {
        saveCurrentTransform();
        setHideButton(true);
        setHideEasing(true);
      }
      if (answer === 'cancel') {
        setHideButton(true);
        setHideEasing(true);
      }
      if (answer === 'styleChange') {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setHideStyle((hideStyle) => {
          const nextHideStyle = !hideStyle;
          if (nextHideStyle) {
            setHideColor(true);
          }
          return nextHideStyle
        })
        return;
      }
      setHideColor(true);
      setHideEasing(true);
    },
    [saveCurrentTransform]
  );

  const handleChangeDuration = React.useCallback(
    (event) => {
      updateCurrentAssetText(textId, 'animationDuration', event.target.value);
    },
    [textId, updateCurrentAssetText]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickColorTarget = React.useCallback(
    (event) => {
      const colorTarget = event.target.id;
      if (colorTarget === currentColorTarget) {
        toggleHideColor();
        setCurrentColorTarget(null);
        return;
      }
      setCurrentColorTarget(colorTarget);
      setHideColor(false);
    },
    [currentColorTarget, toggleHideColor]
  );
  const onClickEasing = React.useCallback((event) => {
    const nextEasingKey = event.target.id;
    setCurrentEasingKey(nextEasingKey);
  }, []);

  const isFontColorActive = currentColorTarget === 'font' && !hideColor
  const isBorderColorActive = currentColorTarget === 'border' && !hideColor
  const isBackgroundColorActive =
    currentColorTarget === 'background' && !hideColor;
  const colorMap = React.useMemo(() => {
    return {
      background,
      font,
      border
    }
  }, [background, border, font])
  const { r: rb, g: gb, b: bb, a: ab } = background;
  const { r: rf, g: gf, b: bf, a: af } = font;
  const { r: rbb, g: gbb, b: bbb, a: abb } = border;
  const backgroundCss =
    typeof background === 'string'
      ? background
      : `rgba(${rb},${gb},${bb},${ab})`;
  const fontCss = typeof font === 'string' ? font : `rgba(${rf},${gf},${bf},${af})`;
  const borderCss = typeof border === 'string' ? border : `rgba(${rbb},${gbb},${bbb},${abb})`;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const updateTargetColor = React.useCallback((color) => {
    updateCurrentAssetText(textId, currentColorTarget, color);
    },
    [currentColorTarget, textId, updateCurrentAssetText]
  );

  React.useEffect(() => {
    if (draggableRef.current === null) return;
    interact(draggableRef.current)
      .gesturable({
        listeners: {
          start(event) {
            currentTransformRef.current.angle -= event.angle;
          },
          move(event) {
            const currentAngle =
              event.angle + currentTransformRef.current.angle;
            const inputScale = event.scale * currentTransformRef.current.scale;
            const currentScale = inputScale < minScale ? minScale : inputScale;

            resizableRef.current.style.transform =
              // 'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')';
              'scale(' + currentScale + ')';
            dragMoveListener(event, currentTransformRef);
          },
          end(event) {
            currentTransformRef.current.angle += event.angle;
            currentTransformRef.current.scale *= event.scale;
          },
        },
      })
      .draggable({
        inertia: {
          resistance: 5,
        },
        modifiers: [
          interact.modifiers.restrict({
            restriction: 'parent',
            endOnly: false,
          }),
        ],
        listeners: {
          move: (event) => {
            const [x, y] = dragMoveListener(event, currentTransformRef);
            // console.log(x, y)
            setClientX(x);
            // attachToDoc(scalableRef.current, translateRef.current, y);
          },
          inertiastart: (event) => {
            if (event.speed > 2000) {
              restoreSavedTransform();
            }
          },
        },
      })
      .on('doubletap', function (event) {
        console.log('doubletap')
        event.preventDefault();
        setIsIconShape((isIconShape) => {
          resizableRef.current.style.transform = `scale(${minScale})`;
          currentTransformRef.current.scale = minScale;
          return !isIconShape;
        });
        // restoreSavedTransform();
      })
      .on('hold', function (event) {
        event.preventDefault();
        setHideButton(false);
      });
  }, [minScale, restoreSavedTransform]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Container ref={draggableRef} index={index}>
        <FullBox
          ref={resizableRef}
          background={backgroundCss}
          font={fontCss}
          border={borderCss}
          isIconShape={isIconShape}
          text={isIconShape ? '' : text}
        >
          {/* {isIconShape ? <StyledTack src={questionImage} /> : <>{text}</>} */}
          {isIconShape ? (
            <StyledTack src={questionImage} />
          ) : (
            <>
            <div style={{visibility: 'hidden'}}>
            {text}
            </div>
            <StyledReactTyped
              typeSpeed={80}
              strings={[text]}
              stopped={true}
              startWhenVisible={true}
              showCursor={false}
            />
            </>
          )}
        </FullBox>
      </Container>
      <Controls hide={hideButton}>
        <StyleContainer hide={hideStyle}>
          <Box sx={{ width: 400, margin: '5px', display: 'flex' }}>
            <SmallText active>Duration</SmallText>
            <Slider
              min={500}
              max={10000}
              step={500}
              marks
              value={animationDuration}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `${value}ms`}
              onChange={handleChangeDuration}
              aria-label="Default"
            />
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center' }}
            onClick={onClickColorTarget}
          >
            <StyleContainer flexStart>
              <ColorBox id="background" background="yellow" />
              <SmallText active={isBackgroundColorActive} id="background">Background</SmallText>
            </StyleContainer>
            <StyleContainer flexStart>
              <ColorBox id="font" background="black" />
              <SmallText active={isFontColorActive} id="font">Font</SmallText>
            </StyleContainer>
            <StyleContainer flexStart>
              <ColorBox id="border" background="black" />
              <SmallText active={isBorderColorActive} id="border">Border</SmallText>
            </StyleContainer>
          </Box>
          <Box>
            <SmallText active={true} onClick={toggleEasing}>Set Animation</SmallText>
          </Box>
        </StyleContainer>
        <SaveConfirm>
          <Button id="save" onClick={onClickConfirm}>
            Save
          </Button>
          <Button id="cancel" onClick={onClickConfirm}>
            Cancel
          </Button>
          <Button id="styleChange" onClick={onClickConfirm}>
            Set Style
          </Button>
        </SaveConfirm>
      </Controls>
      <ColorPickerContainer hide={hideColor}>
        <ColorPicker
          color={colorMap[currentColorTarget]}
          setColor={updateTargetColor}
        />
      </ColorPickerContainer>
      <EasingContainer hide={hideEasing} onClick={onClickEasing}>
        {Object.keys(EASINGS).map((easingKey) => (
          <SmallText
            key={easingKey}
            id={easingKey}
            active={easingKey === currentEasingKey}
          >
            {easingKey}
          </SmallText>
        ))}
      </EasingContainer>
    </>
  );
}

export default React.memo(Resizable);
