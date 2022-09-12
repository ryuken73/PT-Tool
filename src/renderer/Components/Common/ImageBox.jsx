import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageBox = (props) => {
  const { src } = props;
  return <StyledImage src={src} draggable={false} />;
}

export default React.memo(ImageBox);
