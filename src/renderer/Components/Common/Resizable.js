import React from 'react';
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
import interact from 'interactjs';
import ColorPicker from './ColorPicker';

const Container = styled.div`
  position: absolute;
  bottom: ${(props) => `${props.index * 80 + 10}px`};
  right: 50px;
  touch-action: none;
  user-select: none;
  z-index: 1000;
`;
const FullBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  background: yellow;
  color: black;
  border: 3px solid black;
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  box-sizing: border-box;
`
const SaveConfirm = styled.div`
  display: ${(props) => props.hide ? 'none' : 'flex'};
  position: fixed;
  align-items: center;
  justify-content: space-evenly;
  width: 50%;
  left: 25%;
  z-index: 1000;
  bottom: 5%;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 10px;
`
const Button = styled.div`
  /* margin-bottom: 5%; */
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  font-size: 30px;
  color: yellow;
  backdrop-filter: blur(100px);
  background: grey;
  opacity: 0.8;
`
const SmallText = styled.div`
  backdrop-filter: blur(10px);
  font-size: 1rem;
  /* background: teal; */
  opacity: 0.8;
  color: black;
  margin-right: 20px;
  border-radius: 10px;
`
const StyleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`
const ColorBox = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border: 4px white solid;
  box-sizing: border-box;
  background: ${props => props.background};
`
const ColorPickerContainer = styled.div`
  display: ${(props) => props.hide ? 'none' : 'flex'};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate('-50%', -50%);
  z-index: 1000;
`

const animate = (element, from, to, options={}) => {
  const { duration = 500, easing="cubic-bezier(0.34, 1.56, 0.64, 1)" } = options;
  const keyframe = [{ ...from }, { ...to }];
  const animation = element.animate(keyframe, { duration, easing });
  return animation;
}
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
  return [x, y]
};

function Resizable(props) {
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
    })
  }, [])

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
    }
    const animation = animate(translateElement, from, to, animationOption);
    const onFinished = () => {
      draggableRef.current.style.transform = `translate(${x}px, ${y}px)`;
      draggableRef.current.setAttribute('data-x', x);
      draggableRef.current.setAttribute('data-y', y);
      animation.removeEventListener('finish', onFinished);
    }
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
    }
    animationScale.addEventListener('finish', onFinishScale);
  }, [animationDuration]);

  const onClickConfirm = React.useCallback((event) => {
    event.stopPropagation();
    const answer = event.target.id;
    if (answer === 'save') {
      saveCurrentTransform();
    }
    setHideButton(true);
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
          if(event.speed > 2000){
            restoreSavedTransform();
          }
        }
      },
    }).on('doubletap', function (event) {
      event.preventDefault()
      resizableRef.current.style.transform = `scale(${minScale})`;
      currentTransformRef.current.scale = minScale;
      // restoreSavedTransform();
    }).on('hold', function (event) {
      event.preventDefault()
      setHideButton(false);
    })
  }, [minScale, restoreSavedTransform]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Container ref={draggableRef} index={index}>
        <FullBox ref={resizableRef}>{text}</FullBox>
      </Container>
      <SaveConfirm hide={hideButton}>
        <Button id="save" onClick={onClickConfirm}>save</Button>
        <Box>
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
        </Box>
        <Button id="cancel" onClick={onClickConfirm}>cancel</Button>
      </SaveConfirm>
      <ColorPickerContainer hide={hideColor}>
        <ColorPicker />
      </ColorPickerContainer>
    </>
  );
}

export default React.memo(Resizable);
