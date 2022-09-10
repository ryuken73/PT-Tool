import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 200px;
  right: 200px;
  display: flex;
  flex-direction: row;
  z-index: 9999;
  width: auto;
`;

const ToolContainer = (props) => {
  const {toggleDraw} = props;
  return (
    <Container>
      <button onClick={toggleDraw}>Draw</button>
    </Container>
  )
}

export default React.memo(ToolContainer);
