import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  font-size: ${(props) => props.mode === 'vertical' && '20px'};
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-shadow: 0px 0 black, 0 0px black, 1px 0 black, 0 1px black;
  opacity: ${(props) => !props.isCurrent && 0.2};
`

const MenuItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { menuText, isCurrent, onClick, mode="horizontal" } = props;
  return (
    <Container className="menuItem" isCurrent={isCurrent} onClick={onClick} mode={mode}>
      {menuText}
    </Container>
  );
};

export default React.memo(MenuItem)
