import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 10;
  right: 10;
  display: flex;
  flex-direction: row;
  z-index: 9999;
`;

const buttons = ['image', 'image', 'web1', 'web2', 'video', 'video'];

const MenuContainer = (props) => {
  const {setCurrentAsset}  = props;
  return (
    <Container>
      {buttons.map((text, index) => (
        // eslint-disable-next-line react/button-has-type
        <button onClick={() => {setCurrentAsset(index)}}>{text}</button>
      ))}
    </Container>
  )
};

export default React.memo(MenuContainer);
