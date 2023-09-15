import React from 'react';
import useAssetState from 'renderer/hooks/useAssetState';
import interact from 'interactjs';
import ColorPicker from './ColorPicker';
import { animate, dragMoveListener, Container, FullBox, SaveConfirm, Button, ColorPickerContainer } from './Resizable';

export function Resizable(props) {
  // eslint-disable-next-line react/prop-types
  const { minScale = 1, index, assetText } = props;
  // eslint-disable-next-line react/prop-types
  const { textId, assetText: text, animationDuration = 500 } = assetText;
  const { updateCurrentAssetText } = useAssetState();
  const [hideButton, setHideButton] = React.useState(true);
  const [hideColor, setHideColor] = React.useState(true);
  const draggableRef = React.useRef(null);
  const resizableRef = React.useRef(null);
  const currentTransformRef = React.useRef({ x: 0, y: 0, angle: 0, scale: 1 });
  const savedTransformRef = React.useRef(null);

  const toggleHideColor = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setHideColor((hideColor) => {
      return !hideColor;
    });
  }, []);

  const saveCurrentTransform = React.useCallback(() => {
    savedTransformRef.current = { ...currentTransformRef.current };
  }, []);

  const restoreSavedTransform = React.useCallback(() => {
    if (savedTransformRef.current === null) return;
    const { x, y, scale } = savedTransformRef.current;
    const { x: xC, y: yC, scale: scaleC } = currentTransformRef.current;

    const from = { transform: `translate(${xC}px, ${yC}px)` };
    const to = { transform: `translate(${x}px, ${y}px)` };
    const translateElement = draggableRef.current;
    const animationOption = {
      duration: animationDuration
    };
    const animation = animate(translateElement, from, to, animationOption);
    const onFinished = () => {
      draggableRef.current.style.transform = `translate(${x}px, ${y}px)`;
      draggableRef.current.setAttribute('data-x', x);
      draggableRef.current.setAttribute('data-y', y);
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
  }, [animationDuration]);

  const onClickConfirm = React.useCallback((event) => {
    event.stopPropagation();
    const answer = event.target.id;
    if (answer === 'save') {
      saveCurrentTransform();
      setHideButton(true);
    }
    if (answer === 'cancel') {
      setHideButton(true);
    }
  },
    [saveCurrentTransform]
  );

  const handleChangeDuration = React.useCallback((event) => {
    updateCurrentAssetText(textId, 'animationDuration', event.target.value);
  },
    [textId, updateCurrentAssetText]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickColor = React.useCallback((event) => {
    toggleHideColor();
  },
    [toggleHideColor]
  );

  React.useEffect(() => {
    if (draggableRef.current === null) return;
    interact(draggableRef.current).gesturable({
      listeners: {
        start(event) {
          currentTransformRef.current.angle -= event.angle;
        },
        move(event) {
          const currentAngle = event.angle + currentTransformRef.current.angle;
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
    }).draggable({
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
          const [, y] = dragMoveListener(event, currentTransformRef);
          // attachToDoc(scalableRef.current, translateRef.current, y);
        },
        inertiastart: (event) => {
          if (event.speed > 2000) {
            restoreSavedTransform();
          }
        }
      },
    }).on('doubletap', function (event) {
      event.preventDefault();
      resizableRef.current.style.transform = `scale(${minScale})`;
      currentTransformRef.current.scale = minScale;
      // restoreSavedTransform();
    }).on('hold', function (event) {
      event.preventDefault();
      setHideButton(false);
    });
  }, [minScale, restoreSavedTransform]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Container ref={draggableRef} index={index}>
        <FullBox ref={resizableRef}>{text}</FullBox>
      </Container>
      <SaveConfirm hide={hideButton}>
        <Button id="save" onClick={onClickConfirm}>Save</Button>
        {/* <Box>
              <Box sx={{ width: 300, margin: '5px', display: 'flex' }}>
                <SmallText>Duration</SmallText>
                <Slider
                  max={5000}
                  step={500}
                  marks
                  value={animationDuration}
                  valueLabelDisplay="on"
                  valueLabelFormat={(value) => `${value}ms`}
                  onChange={handleChangeDuration}
                  aria-label="Default"
                />
              </Box>
              <StyleContainer onClick={onClickColor}>
                <ColorBox id="background" background="yellow" />
                <SmallText id="background">Background</SmallText>
                <ColorBox id="font" background="black" />
                <SmallText id="font">Font</SmallText>
                <ColorBox id="border" background="black" />
                <SmallText id="border">Border</SmallText>
              </StyleContainer>
            </Box> */}
        <Button id="cancel" onClick={onClickConfirm}>Cancel</Button>
        <Button id="styleChange" onClick={onClickConfirm}>
          Open Style Change
        </Button>
      </SaveConfirm>
      <ColorPickerContainer hide={hideColor}>
        <ColorPicker />
      </ColorPickerContainer>
    </>
  );
}
