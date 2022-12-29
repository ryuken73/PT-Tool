import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 10000;
  border: 3px red solid;
  background: ${(props) => (props.debug === 'yes' ? 'maroon' : 'transparent')};
`;

const CustomImg = styled.img`
  object-fit: contain;
  width: 100%;
`;

function ImageSelfTransition(props) {
  // eslint-disable-next-line react/prop-types
  const { img, debugTransition } = props;
  return (
    <Container debug={debugTransition}>
      <CustomImg src={img} />
    </Container>
  );
}

export default React.memo(ImageSelfTransition);
