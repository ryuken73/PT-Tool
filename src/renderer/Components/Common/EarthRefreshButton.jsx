import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/DisplaySettings';

const Container = styled.div`
  position: absolute;
  top: 200px;
  right: 50px;
  z-index: 10000;
`


export default function EarthRefreshButton(props) {
  const {onClick} = props;
  return (
    <Container>
      <IconButton size="large" onClick={onClick}>
        <RefreshIcon
          sx={{
            fontSize: 50,
            color: 'maroon',
            background: 'white',
            opacity: 0.2,
            borderRadius: '10%',
          }}
        />
      </IconButton>
    </Container>
  )
}
