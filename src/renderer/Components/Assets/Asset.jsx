/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import AssetViewer from 'renderer/Components/Assets/AssetViewer'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: ${(props) => (props.show ? 'block' : 'none')};
  overflow: hidden;
  transition: transform 0.5s;
  /* height: ${(props) => (props.show ? '100%' : '0%')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  /* width: ${(props) => (props.show ? '100%' : '0%')}; */
  /* transition: all 1s; */
  /* visibility: ${(props) => (props.show ? 'visible' : 'hidden')}; */
  /* filter: grayscale(100%); */
  /* filter: ${(props) => props.drawOn && 'grayscale(100%)'}; */
  /* filter: ${(props) => props.drawOn && 'contrast(175%) brightness(103%)'}; */
  /* ${(props) => props.drawOn && 'transform: scale(1.01)'}; */
`;

const AssetContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  // const { options, show, drawOn } = props;
  const { asset, show } = props;
  const { sources, displayType=0 } = asset;

  return (
    <Container show={show}>
      <AssetViewer displayType={displayType} sources={sources} />
    </Container>
  )

};

export default React.memo(AssetContainer);
