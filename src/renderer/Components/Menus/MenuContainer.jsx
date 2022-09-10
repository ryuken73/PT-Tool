import React from 'react';
import styled from 'styled-components';
import useBodyState from 'renderer/hooks/useBodyState';

const Container = styled.div`
  position: fixed;
  top: 10;
  right: 10;
  display: flex;
  flex-direction: row;
  z-index: 9999;
`;

const buttons = ['image', 'image', 'web1', 'web2', 'video', 'video'];

const MenuContainer = () => {
  const { assets, setCurrentAssetState } = useBodyState();
  return (
    <Container>
      {assets.map((asset, index) => (
        // eslint-disable-next-line react/button-has-type
        <button
          onClick={() => {
            setCurrentAssetState(index);
          }}
        >
          {asset.title}
        </button>
      ))}
    </Container>
  )
};

export default React.memo(MenuContainer);
