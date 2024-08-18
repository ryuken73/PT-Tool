import React from 'react';
import styled from 'styled-components';
import useAppState from 'renderer/hooks/useAppState';
import { animate } from 'renderer/lib/appUtil';

const Container = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.mode === 'vertical' && '20px'};
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-shadow: 0px 0 black, 0 0px black, 1px 0 black, 0 1px black;
  opacity: ${(props) => !props.isCurrent ? props.draggableDock ? 0.5 : 0.2 : 1};
  /* box-sizing: border-box;
  border: ${props => props.isCurrent && '1px solid white'};
  width: 100%; */
`
const animateClick = (targetElement) => {
  const from = { transform: `translate(0px, 0px)`};
  const to = { transform: `translate(3px, 3px)`};
  const options = {
    duration: 70
  }
  return animate(targetElement, from, to, options);
}

const MenuItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { menuText, isCurrent, onClick, mode="horizontal" } = props;
  const { draggableDock } = useAppState();
  const itemRef = React.useRef(null);
  const onClickItem = React.useCallback((e) => {
    animateClick(itemRef.current);
      onClick(e);
    },
    [onClick]
  );
  return (
    <Container
      className="menuItem"
      isCurrent={isCurrent}
      onClick={onClickItem}
      draggableDock={draggableDock}
      mode={mode}
      ref={itemRef}
    >
      {menuText}
    </Container>
  );
};

export default React.memo(MenuItem)
