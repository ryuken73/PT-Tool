import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import useAppState from 'renderer/hooks/useAppState';

const Container = styled.div`
  position: absolute;
  touch-action: none;
  user-select: none;
  z-index: 1000;
`;
const FullBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 80px;
  background: darkblue;
  border-radius: 20px;
  padding: 10px;
`
const SaveConfirm = styled.div`
  display: ${(props) => props.hide ? 'none' : 'flex'};
  position: fixed;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  z-index: 1000;
  bottom: 5px;
`
const Button = styled.div`
  margin-bottom: 5%;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  font-size: 30px;
  color: yellow;
  backdrop-filter: blur(100px);
  background: grey;
  opacity: 0.5;
`
const animate = (element, from, to, options={}) => {
  const { duration = 500, easing="cubic-bezier(0.34, 1.56, 0.64, 1)" } = options;
  const keyframe = [{...from}, {...to}];
  const animation = element.animate(keyframe, {duration, easing});
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
  const { minScale = 0.5 } = props;
  const { dockWidth } = useAppState();
  const [hideButton, setHideButton] = React.useState(true);
  const draggableRef = React.useRef(null);
  const resizableRef = React.useRef(null);
  const currentTransformRef = React.useRef({x:0, y:0, scale: 1});
  const savedTransformRef = React.useRef(null);
  const angleScaleRef = React.useRef({ angle: 0, scale: 1 });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const angleScale = {
  //   angle: 0,
  //   scale: 1,
  // };


  const saveCurrentTransform = React.useCallback(() => {
    savedTransformRef.current = {...currentTransformRef.current};
  }, []);

  const restoreSavedTransform = React.useCallback(() => {
    if(savedTransformRef.current === null) return;
    const { x, y, scale } = savedTransformRef.current;
    const { x:xC, y:yC, scale:scaleC} = currentTransformRef.current;

    const from = { transform: `translate(${xC}px, ${yC}px)` };
    const to = { transform: `translate(${x}px, ${y}px)` };
    const translateElement = draggableRef.current;
    const animation = animate(translateElement, from, to);
    const onFinished = () => {
      // resizableRef.current.style.transform = `scale(${scale})`;
      draggableRef.current.style.transform = `translate(${x}px, ${y}px)`;
      draggableRef.current.setAttribute('data-x', x);
      draggableRef.current.setAttribute('data-y', y);
      animation.removeEventListener('finish', onFinished);
    }
    animation.addEventListener('finish', onFinished);

    const fromScale = { transform: `scale(${scaleC})` };
    const toScale = { transform: `scale(${scale})` };
    const scaleElement = resizableRef.current;
    const animationScale = animate(scaleElement, fromScale, toScale);
    const onFinishScale = () => {
      resizableRef.current.style.transform = `scale(${scale})`;
      animationScale.removeEventListener('finish', onFinishScale);
      angleScaleRef.current.scale *= scale;
    }
    animationScale.addEventListener('finish', onFinishScale);
  }, []);

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

  React.useEffect(() => {
    if (draggableRef.current === null) return;
    interact(draggableRef.current).gesturable({
      listeners: {
        start(event) {
          angleScaleRef.current.angle -= event.angle;
        },
        move(event) {
          // document.body.appendChild(new Text(event.scale))
          const currentAngle = event.angle + angleScaleRef.current.angle;
          const inputScale = event.scale * angleScaleRef.current.scale;
          const currentScale = inputScale < minScale ? minScale : inputScale;
          currentTransformRef.current.scale = currentScale;

          resizableRef.current.style.transform =
            // 'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')';
            'scale(' + currentScale + ')';
          dragMoveListener(event, currentTransformRef);
        },
        end(event) {
          angleScaleRef.current.angle += event.angle;
          angleScaleRef.current.scale *= event.scale;
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
        },
        end: (event) => {
          // if(event.speed > 2000){
          //   restoreSavedTransform();
          // }
        }
      },
    }).on('doubletap', function (event) {
      event.preventDefault()
      restoreSavedTransform();
    }).on('hold', function (event) {
      event.preventDefault()
      setHideButton(false);
    })
  }, [minScale, restoreSavedTransform]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
    <Container ref={draggableRef}>
      <FullBox ref={resizableRef}>
        나는 솔로
      </FullBox>
    </Container>
      <SaveConfirm hide={hideButton} onClick={onClickConfirm}>
        <Button id="save">save</Button>
        <Button id="cancel">cancel</Button>
      </SaveConfirm>
    </>
  );
}

export default React.memo(Resizable);
