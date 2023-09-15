import React from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color';

const Container = styled.div``

function ColorPicker(props) {
  // eslint-disable-next-line react/prop-types
  const { color='yellow', setColor=() => {} } = props;
  const onChangeColor = React.useCallback(
    (color, event) => {
      console.log(color);
      setColor(color.rgb);
    },
    [setColor]
  );
  return (
    <Container>
      <SketchPicker color={color} onChange={onChangeColor} />
    </Container>
  )
}

export default React.memo(ColorPicker);