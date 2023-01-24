import React from 'react';
import styled from 'styled-components';
import CSSToggleMenuImage from 'renderer/Components/Menus/CSSToggleMenuImage';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${props => props.objectFit};
  transform: ${(props) => `scale(${props.scale})`};
`;

const ImageBox = (props) => {
  const {
    src,
    srcId,
    show,
    srcIndex,
    objectFit = 'cover',
    scale=1,
    displayMode,
  } = props;
  const isFirstImage = srcIndex === 0;
  return (
    <Container>
      {show && (
        <CSSToggleMenuImage
          srcId={srcId}
          objectFit={objectFit}
          scale={scale}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
        />
      )}
      <StyledImage
        src={src}
        objectFit={objectFit}
        draggable={false}
        scale={scale}
      />
    </Container>
  );
};

export default React.memo(ImageBox);
