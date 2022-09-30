import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageBox = (props) => {
  const { src } = props;
  return (
    <Container>
      <StyledImage src={src} draggable={false} />
    </Container>
  );
};

export default React.memo(ImageBox);
