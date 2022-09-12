import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  cursor: pointer;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const MenuItem = (props) => {
  // eslint-disable-next-line react/prop-types
  const { menuText, onClick } = props;
  return <Container onClick={onClick}>{menuText}</Container>;
};

export default React.memo(MenuItem)
