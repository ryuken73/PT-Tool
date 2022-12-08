import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';

const Container = styled.div`
  touch-action: none;
  user-select: none;
`;

const heightBar = 8;
const heightBall = heightBar * 1.7;
const BarBorderRadius = heightBar * 0.4;
const BallBorderRadius = heightBall * 0.8;

const Progress = styled.div`
  position: relative;
  width: 100%;
  height: ${heightBar}px;
  margin-top: 10px;
  background-color: ${(props) => (props.dragging ? 'darkred' : 'black')};
  border: ${(props) =>
    props.dragging ? '1px dashed white' : '1px solid white'};
  border-radius: ${BarBorderRadius}px;
  box-sizing: border-box;
  font-size: 20px;
  -ms-touch-action: none;
  touch-action: none;
  &:before {
    content: "";
    display: block;
    position: relative;
    top: -4px;
    width: ${heightBall}px;
    height: ${heightBall}px;
    margin-left: -5px;
    border: ${(props) => props.dragging ? '2px dashed white' : '2px solid white'};
    border-radius: ${BallBorderRadius}px;
    background-color: inherit;
    box-sizing: border-box;
  }
  &:after {
    content: "";
    position: absolute;
    top: ${heightBar * -1}px;
    left: 0px;
    height: ${heightBall * 2}px;
    width: 100%;
    line-height:1em;
    // margin-left: -0.5em;
    text-align: center;
  }
`;

const ProgressBar = (props) => {
  const { progress, onChangeProgress } = props;
  const [ dragging, setDragging] = React.useState(false);
  const progressRef = React.useRef(null);
  React.useEffect(() => {
    if (progressRef.current === null) return;
    progressRef.current.style.paddingLeft = `${progress}%`;
  }, [progress])
  React.useEffect(() => {
    if (progressRef.current === null) return;
    interact(progressRef.current).draggable({
      origin: 'self',
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'self'
        })
      ],
      listeners: {
        start(event) {
          // event.target.style.background = 'red';
          setDragging(true);
        },
        move(event) {
          setDragging(true);
          // event.target.style.background = 'darkslategrey';
          // event.target.style.border = '1px dashed white';
          const sliderWidth = interact.getElementRect(event.target).width;
          const value = event.pageX / sliderWidth;
          event.target.style.paddingLeft = `${value * 100}%`;
          onChangeProgress(value * 100);
        },
        end(event) {
          setDragging(false);
          // event.target.style.background = 'black';
          // event.target.style.border = '1px solid white';
        }
      },
    });
  }, [onChangeProgress, progressRef]);
  const onClickProgressBar = React.useCallback((event) => {
    // alert(event.nativeEvent.offsetX);
    const percentX = (event.nativeEvent.offsetX / event.target.offsetWidth) * 100;
    onChangeProgress(percentX);
  }, [onChangeProgress]);

  return (
    <Container>
      <Progress
        progress={progress}
        dragging={dragging}
        ref={progressRef}
        onClick={onClickProgressBar}
        onTouchStart={onClickProgressBar}
      />
    </Container>
  );
};

export default React.memo(ProgressBar)
