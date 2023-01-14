import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useSwiper } from 'swiper/react';

const Container = styled.div`
  position: absolute;
  right: 50px;
  bottom: 140px;
`;

function SwipeButton() {
  const swiper = useSwiper();
  return (
    <Container>
      <IconButton size="large" onClick={() => swiper.slideNext()}>
        <NavigateNextIcon
          sx={{
            fontSize: 35,
            color: 'maroon',
            background: 'white',
            opacity: 0.2,
            borderRadius: '50%',
          }}
        />
      </IconButton>
      <br />
      <IconButton size="large" onClick={() => swiper.slidePrev()}>
        <NavigateBeforeIcon
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
  );
}

export default React.memo(SwipeButton);
