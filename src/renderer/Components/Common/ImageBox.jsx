import React from 'react';
import styled from 'styled-components';
import CSSToggleMenuImage from 'renderer/Components/Menus/CSSToggleMenuImage';
import CSSToggleMenu from 'renderer/Components/Menus/CSSToggleMenu';

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
    translateX = 0,
    translateY = 0,
    displayMode,
    onClick
  } = props;
  const isFirstImage = srcIndex === 0;
  return (
    <Container>
      {show && (
        <CSSToggleMenu
          srcId={srcId}
          objectFit={objectFit}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
        />
      )}
      <StyledImage
        src={src}
        objectFit={objectFit}
        draggable={false}
        scale={scale}
        onClick={onClick}
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateX(${translateX}%) translateY(${translateY}%)`,
        }}
      />
    </Container>
  );
};

export default React.memo(ImageBox);
