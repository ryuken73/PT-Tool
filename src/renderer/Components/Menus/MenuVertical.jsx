import React from 'react';
import styled from 'styled-components';
import MenuItem from 'renderer/Components/Menus/MenuItem';

const Container = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: column;
  z-index: 9999;
  font-weight: bold;
  font-size: 2vw;
  color: white;
  background: rgb(0, 0, 0, 0.5);
  padding: 5px;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  backdrop-filter: blur(2px);
`;


function MenuVertical(props) {
  // eslint-disable-next-line react/prop-types
  const { drawShow, assets, currentAssetIndex, setCurrentAssetIndexState } = props;
  return (
    <Container hide={false}>
      {assets.map((asset, index) => (
        <MenuItem
          key={asset.assetTitle}
          isCurrent={currentAssetIndex === index}
          menuText={asset.assetTitle}
          mode="vertical"
          onClick={() => {
            setCurrentAssetIndexState(index);
          }}
          onTouchStart={() => {
            setCurrentAssetIndexState(index);
          }}
        />
      ))}
    </Container>
  )
}

export default React.memo(MenuVertical);
