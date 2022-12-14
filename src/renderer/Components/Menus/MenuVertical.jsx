import React from 'react';
import styled from 'styled-components';
import MenuItem from 'renderer/Components/Menus/MenuItem';
import CONSTANTS from 'renderer/config/constants';

const Container = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
  z-index: 9999;
  font-weight: bold;
  font-size: 2vw;
  color: white;
  background: ${(props) => props.draggableDock ? 'rgb(0, 0, 0, 0)':'rgb(0,0,0,0.5)'};
  padding: 5px;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  backdrop-filter: blur(2px);
`;

const { TRANSITIONS } = CONSTANTS;

function MenuVertical(props) {
  // eslint-disable-next-line react/prop-types
  const {
    drawShow,
    draggableDock,
    assets,
    currentAssetIndex,
    transitionName,
    setCurrentAssetIndexState,
    setShowTransitionState
  } = props;
  const transition = TRANSITIONS[transitionName];

  return (
    <Container hide={false} draggableDock={draggableDock}>
      {assets.map((asset, index) => (
        <MenuItem
          key={asset.assetTitle}
          isCurrent={currentAssetIndex === index}
          menuText={asset.assetTitle}
          mode="vertical"
          onClick={() => {
            // setCurrentAssetIndexState(index);
            setShowTransitionState(true);
            setTimeout(() => {
              setCurrentAssetIndexState(index);
            }, transition.delay);
          }}
          onTouchStart={() => {
            // setCurrentAssetIndexState(index);
            setShowTransitionState(true);
            setTimeout(() => {
              setCurrentAssetIndexState(index);
            }, transition.delay);
          }}
        />
      ))}
    </Container>
  )
}

export default React.memo(MenuVertical);
