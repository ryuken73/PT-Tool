import React from 'react';
import AssetContainer from 'renderer/Components/Body/AssetContainer';
import DrawSvg from 'renderer/Components/Draw/DrawSvg';
import MenuContainer from 'renderer/Components/Menus/MenuContainer';
import styled from 'styled-components';
import colors from 'renderer/config/colors';
import Loading from './Components/Common/Loading';
import ToolContainer from './Components/Common/ToolContainer';
import useAppState from './hooks/useAppState';

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: grey 1px solid;
  box-sizing: border-box;
  border-collapse: collapse;
  font-size: calc(10px + 2vmin);
  overflow: hidden;
`;

const AppContainer = styled(BodyContainer)`
  text-align: center;
  background-color: ${colors.base};
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  overflow: hidden;
`;

export default function App() {
  const {drawShow, toggleDraw} = useAppState();
  return (
    <AppContainer>
      {drawShow && <DrawSvg />}
      <Loading />
      <MenuContainer />
      <ToolContainer toggleDraw={toggleDraw} />
      <AssetContainer />
    </AppContainer>
  );
}
