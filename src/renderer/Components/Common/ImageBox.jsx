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
  -webkit-mask-image: ${(props) =>
    !props.isFirstImage &&
    'linear-gradient(to right, transparent 10%, blue 67%)'};
`

const ImageBox = (props) => {
  const { src, srcIndex } = props;
  const isFirstImage = srcIndex === 0;
  return (
    <Container>
      <StyledImage src={src} draggable={false} isFirstImage={isFirstImage}/>
    </Container>
  );
};

export default React.memo(ImageBox);
