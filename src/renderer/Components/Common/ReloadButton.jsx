import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh';

const Container = styled.div`
  position: absolute;
  bottom: 70px;
  right: 50px;
`


export default function ReloadButton(props) {
  const {reload} = props;
  return (
    <Container>
      <IconButton size="large" onClick={reload}>
        <RefreshIcon
          sx={{
            fontSize: 35,
            color: 'maroon',
            background: 'white',
            opacity: 0.2,
            borderRadius: '50%',
          }}
        />
      </IconButton>
    </Container>
  )
}
