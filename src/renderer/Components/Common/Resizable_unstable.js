import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';
import useAppState from 'renderer/hooks/useAppState';

const Translatable = styled.div`
  position: absolute;
  z-index: 1000;
`;
const Handle = styled.span`
  display: ${(props) => (!props.show ? 'none' : 'inline')};
  font-size: 100px;
`;
const Scalable = styled.div`
  touch-action: none;
  user-select: none;
  background: ${props => props.docked ? 'red' : 'darkblue'};
  border-radius: 10px;
  padding 5px;
  font-size: 100px;
`;
function getScaleX(element) {
  if (element.style.transform === undefined) return 1;
  if (element.style.transform.match(/scale\((.*),*.*\)/)) {
    return element.style.transform.match(/scale\((.*),*.*\)/)[1]
  };
  return 1;
}

const adjustBoundingClientRect = (element, initialWidth) => {
  const { x, right, width } = element.getBoundingClientRect();
  const scaleX = getScaleX(element);
  console.log('^^^', x, right, width, scaleX);
  return { x, scaleX, right, width, initialWidth };
};

function Resizable(props) {
  const { text } = props;
  const [offset, setOffset] = React.useState(null);
  const [showHandle, setShowHandle] = React.useState(false);
  const { dockWidth } = useAppState();
  const translateRef = React.useRef(null);
  const scalableRef = React.useRef(null);
  const gesturebleWidthRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const { x, right } = translateRef.current.getBoundingClientRect();
    const initialWidth = right - x;
    gesturebleWidthRef.current = initialWidth;
  }, []);

  const dragMoveListener = React.useCallback((event) => {
    const { target } = event;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = `translate(${x}px, ${y}px)`;

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    return [x, y]
  }, []);

  const dragEndListener = React.useCallback((event) => {
    const { target } = event;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // eslint-disable-next-line no-sparse-arrays
    return [, y];
  }, []);

  const attachToDoc = React.useCallback(
    (scalableElement, translatableElement, y) => {
      const { x: distanceFromLeft, scaleX } = adjustBoundingClientRect(scalableElement);
      const distanceFromRight = window.innerWidth - distanceFromLeft;
      const dockWidthInt = parseInt(dockWidth);
      const isCloseRight = distanceFromRight - dockWidthInt - 100 < 0;
      console.log(
        '###',
        gesturebleWidthRef.current,
        distanceFromLeft,
        distanceFromRight,
        dockWidthInt,
        dockWidthInt + 100,
        isCloseRight
      );
      if (isCloseRight) {
        // if(showHandle) return;
        setShowHandle(true);
        const boundaryX = window.innerWidth - dockWidthInt - 50;
        console.log('&&&', boundaryX)
        translatableElement.style.transform = `translate(${boundaryX}px, ${y}px)`;
        translatableElement.setAttribute('data-x', boundaryX);
      } else {
        setShowHandle(false);
      }
    },
    [dockWidth, showHandle]
  );

  React.useEffect(() => {
    if (scalableRef.current === null || translateRef.current === null) return;
    const angleScale = {
      angle: 0,
      scale: 1,
    };
    interact(translateRef.current).gesturable({
      listeners: {
        start(event) {
          angleScale.angle -= event.angle;
        },
        move(event) {
          // document.body.appendChild(new Text(event.scale))
          const currentAngle = event.angle + angleScale.angle;
          const currentScale = event.scale * angleScale.scale;

          scalableRef.current.style.transform =
            'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')';
          const [, y] = dragMoveListener(event);
          attachToDoc(scalableRef.current, translateRef.current, y);
        },
        end(event) {
          angleScale.angle += event.angle;
          angleScale.scale *= event.scale;
        },
      },
    });
    interact(translateRef.current).draggable({
      inertia: {
        resistance: 7,
      },
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'parent',
          endOnly: false,
          // elementRect: {
          //   left: 0,
          //   right: 0,
          //   top: 1,
          //   bottom: 1
          // }
        }),
      ],
      listeners: {
        move: (event) => {
          const [, y] = dragMoveListener(event);
          // attachToDoc(scalableRef.current, translateRef.current, y);
        },
        end: (event) => {
          const [, y] = dragEndListener(event);
          attachToDoc(scalableRef.current, translateRef.current, y);
        }
      },
    });
  }, [attachToDoc, dragMoveListener]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Translatable ref={translateRef}>
      <Scalable docked={showHandle} ref={scalableRef}>
        {/* <Handle show={showHandle}>Handle</Handle> */}
        {`${text}-${offset}`}
      </Scalable>
    </Translatable>
  );
}

export default React.memo(Resizable);
