import React from 'react';
import styled from 'styled-components';
import CONSTANTS from 'renderer/config/constants';
import MenuItem from 'renderer/Components/Menus/MenuItem';

const { POSITION } = CONSTANTS;

const MenuDiv = styled.div`
  position: absolute;
  top: ${POSITION.menuContainer.top};
  right: ${POSITION.menuContainer.right};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  z-index: 9999;
`;
const Container = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: row;
  z-index: 9999;
  font-weight: bold;
  font-size: 2vw;
  color: white;
  background: rgb(0, 0, 0, 0.05);
  padding: 5px;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
`;


function MenuHorizontal(props) {
  // eslint-disable-next-line react/prop-types
  const { drawShow, assets, currentAssetIndex, setCurrentAssetIndexState } = props;
  return (
    <MenuDiv>
      <Container hide={drawShow}>
        {assets.map((asset, index) => (
          <MenuItem
            key={asset.assetTitle}
            isCurrent={currentAssetIndex === index}
            menuText={asset.assetTitle}
            onClick={() => {
              setCurrentAssetIndexState(index);
            }}
            onTouchStart={() => {
              setCurrentAssetIndexState(index);
            }}
          />
        ))}
      </Container>
    </MenuDiv>
  )
}

export default React.memo(MenuHorizontal);
