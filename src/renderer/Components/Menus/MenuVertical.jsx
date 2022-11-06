import React from 'react';
import styled from 'styled-components';
import MenuItem from 'renderer/Components/Menus/MenuItem';
import CONSTANTS from 'renderer/config/constants';

const { POSITION } = CONSTANTS;

const MenuDiv = styled.div`
  position: absolute;
  bottom: 50px;
  right: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
`;
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
`;


function MenuVertical(props) {
  // eslint-disable-next-line react/prop-types
  const { drawShow, assets, currentAsset, setCurrentAssetState } = props;
  return (
    <MenuDiv>
      <Container hide={drawShow}>
        {assets.map((asset, index) => (
          <MenuItem
            key={asset.assetTitle}
            isCurrent={currentAsset === index}
            menuText={asset.assetTitle}
            mode="vertical"
            onClick={() => {
              setCurrentAssetState(index);
            }}
            onTouchStart={() => {
              setCurrentAssetState(index);
            }}
          />
        ))}
      </Container>
    </MenuDiv>
  )
}

export default React.memo(MenuVertical);
