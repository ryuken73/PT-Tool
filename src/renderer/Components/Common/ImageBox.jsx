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
  /* -webkit-mask-image: ${(props) =>
    !props.isFirstImage &&
    'linear-gradient(to right, transparent 10%, blue 67%)'}; */
`

const ImageBox = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    src,
    srcId,
    show,
    srcIndex,
    objectFit = 'cover',
    displayMode,
  } = props;
  const isFirstImage = srcIndex === 0;
  return (
    <Container>
      {show && (
        <CSSToggleMenuImage
          srcId={srcId}
          objectFit={objectFit}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
        />
      )}
      <StyledImage
        src={src}
        objectFit={objectFit}
        draggable={false}
        isFirstImage={isFirstImage}
      />
    </Container>
  );
};

export default React.memo(ImageBox);
