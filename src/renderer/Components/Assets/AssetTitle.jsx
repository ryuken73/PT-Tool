import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import useAssetState from 'renderer/hooks/useAssetState';

const Container = styled.div`
  position: absolute;
  top: 5%;
  left: 10%;
  min-width: 10%;
  z-index: 10000;
  font-weight: bold;
  background: rgb(0, 0, 0, 0.5);
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 10px;
  text-shadow: 0px 0 black, 0 0px black, 1px 0 black, 0 1px black;
  backdrop-filter: blur(5px);
  font-size: calc(10px + 4vmin) !important;
`

export default function AssetTitle() {
  const { currentAssetTitle } = useAssetState();
  return (
    <Draggable>
      <Container>{currentAssetTitle}</Container>
    </Draggable>
  )
}
