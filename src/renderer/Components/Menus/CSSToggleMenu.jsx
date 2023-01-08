import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 30px;
  left: 100px;
  z-index: 20000;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  background: #444;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  font-size: 20px;
  opacity: 0.5;
  text-align: left;
  & > * {
    float: left;
  }
`;
const ToggleButton = styled.input`
  display: block;
  cursor: pointer;
  opacity: 0;
  z-index: 20000;
  margin: 0;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0;
  &:checked ~ ul {
    width: 150px;
    background-position: 0px -50px;
  }
`;
const ButtonList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 50px;
  height: 50px;
  width: 0px;
  transition: 0.5s width ease;
  background-image: url('https://i.imgur.com/3d0vJzn.png');
  background-repeat: no-repeat;
  background-position: 0px 0px;
`;
const CustomButton = styled.li`
  display: inline-block;
  line-height: 50px;
  width: 50px;
  text-align: center;
  margin: 0;
  a {
    font-size: 1.25em;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
`;

function CSSToggleMenu() {
  return (
    <Container>
      <ToggleButton type="checkbox" />
      <ButtonList>
        <CustomButton>&#x2708;</CustomButton>
        <CustomButton>2</CustomButton>
        <CustomButton>3</CustomButton>
        <CustomButton>4</CustomButton>
      </ButtonList>
    </Container>
  );
}

export default React.memo(CSSToggleMenu);
