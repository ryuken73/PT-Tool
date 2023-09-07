import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';

const Gesturable = styled.div`
  position: absolute;
  z-index: 1000;
`
const Draggable = styled.div`
  touch-action: none;
  user-select: none;
  background: darkblue;
  border-radius: 10px;
  padding 5px;
`

function dragMoveListener (event) {
  const { target } = event;
  // keep the dragged position in the data-x/data-y attributes
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = `translate(${x}px, ${y}px)`;

  // update the posiion attributes
  target.setAttribute('data-x', x);
  target.setAttribute('data-y', y);
}

function Resizable(props) {
  const { text } = props;
  const gesturableRef = React.useRef(null);
  const draggableRef = React.useRef(null);

  React.useEffect(() => {
    if (draggableRef.current === null || gesturableRef.current === null) return;
    const angleScale = {
      angle: 0,
      scale: 1
    }
    interact(gesturableRef.current).gesturable({
      listeners: {
        start(event) {
          angleScale.angle -= event.angle
        },
        move(event) {
          // document.body.appendChild(new Text(event.scale))
          const currentAngle = event.angle + angleScale.angle
          const currentScale = event.scale * angleScale.scale

          draggableRef.current.style.transform =
            'rotate(' + currentAngle + 'deg)' + 'scale(' + currentScale + ')'
          dragMoveListener(event);
        },
        end (event) {
          angleScale.angle += event.angle
          angleScale.scale *= event.scale
        }
      },
    })
    interact(gesturableRef.current).draggable({
      inertia: {
        resistance: 8
      },
      listeners: {
        move: dragMoveListener,
      }
    })
  }, []);
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Gesturable ref={gesturableRef}>
      <Draggable ref={draggableRef}>{text}</Draggable>
    </Gesturable>
  )
}

export default React.memo(Resizable);
