import React from 'react';
import styled from 'styled-components';
import useBodyState from 'renderer/hooks/useBodyState';
import MenuItem from './MenuItem';

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  z-index: 9999;
  font-weight: bold;
  /* font-size: 35px; */
  font-size: 2vw;
  color: white;
  background: rgb(0,0,0,0.2);
  padding: 5px;
  /* width: 80%; */
  justify-content: space-around;
  border-radius: 20px;
  /* border-bottom: 6px solid white; */
`;

const MenuContainer = () => {
  const { assets, setCurrentAssetState } = useBodyState();
  return (
    <Container>
      {assets.map((asset, index) => (
        // eslint-disable-next-line react/button-has-type
        <MenuItem
          menuText={asset.title}
          onClick={() => {
            setCurrentAssetState(index);
          }}
        >
        </MenuItem>
      ))}
    </Container>
  )
};

export default React.memo(MenuContainer);
