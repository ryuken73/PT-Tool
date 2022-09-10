import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh';

const Container = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
`


export default function ReloadButton(props) {
  const {reload} = props;
  return (
    <Container>
      <IconButton size="large" onClick={reload}>
        <RefreshIcon sx={{ fontSize: 40, color: 'maroon', background: 'white', opacity: 0.5, borderRadius: '50%' }}></RefreshIcon>
      </IconButton>
    </Container>
  )
}
