import React from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import useAssetState from 'renderer/hooks/useAssetState';
import CONSTANTS from 'renderer/config/constants';
import MenuItem from './MenuItem';

const { POSITION } = CONSTANTS;

const Container = styled.div`
  position: absolute;
  top: ${POSITION.menuContainer.top};
  right: ${POSITION.menuContainer.right};
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  flex-direction: row;
  z-index: 9999;
  font-weight: bold;
  /* font-size: 35px; */
  font-size: 2vw;
  color: white;
  background: rgb(0, 0, 0, 0.05);
  padding: 5px;
  /* width: 80%; */
  justify-content: space-around;
  border-radius: 20px;
  /* border-bottom: 6px solid white; */
`;

const MenuContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow } = props;
  const { assets, currentAsset, setCurrentAssetState } = useAssetState();
  return (
    <Draggable>
      <Container hide={drawShow}>
        {assets.map((asset, index) => (
          // eslint-disable-next-line react/button-has-type
          <MenuItem
            key={asset.title}
            isCurrent={currentAsset === index}
            menuText={asset.title}
            onClick={() => {
              setCurrentAssetState(index);
            }}
          />
        ))}
      </Container>
    </Draggable>
  );
};

export default React.memo(MenuContainer);
