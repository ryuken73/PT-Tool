import React from 'react';
import styled from 'styled-components';
import interact from 'interactjs';

const Container = styled.div`
  touch-action: none;
  user-select: none;
`;
const Progress = styled.div`
  position: relative;
  width: 100%;
  /* height: 0.5em; */
  /* margin: 1.5em auto; */
  height: 5px;
  margin-top: 10px;
  background-color: black;
  border: 1px solid white;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 20px;
  -ms-touch-action: none;
  touch-action: none;
  &:before {
    content: "";
    display: block;
    position: relative;
    top: -6px;
    width: 15px;
    height: 15px;
    margin-left: -5px;
    border: solid 2px #fff;
    border-radius: 10px;
    background-color: inherit;
    box-sizing: border-box;
  }
  /* &:after {
    content: attr(data-value);
    position: absolute;
    top: -1.5em;
    width: 2em;
    line-height:1em;
    margin-left: -0.5em;
    text-align: center;
  } */
`;

const ProgressBar = (props) => {
  const progressRef = React.useRef(null);
  React.useEffect(() => {
    if (progressRef.current === null) return;
    console.log('progressRef', progressRef.current)
    interact(progressRef.current).gesturable({
      origin: 'self',
      modifiers: [
        interact.modifiers.restrict({
          restriction: 'self'
        })
      ],
      listeners: {
        move(event) {
          const sliderWidth = interact.getElementRect(event.target).width;
          const value = event.pageX / sliderWidth;
          event.target.style.paddingLeft = `${value * 100}%`;
        },
      },
    });
  }, [progressRef]);

  return (
    <Container>
      <Progress ref={progressRef} />
    </Container>
  );
};

export default React.memo(ProgressBar)
