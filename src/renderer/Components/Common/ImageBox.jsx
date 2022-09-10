import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`

const ImageBox = (props) => {
  const { src } = props;
  return <StyledImage src={src} />;
}

export default React.memo(ImageBox);
