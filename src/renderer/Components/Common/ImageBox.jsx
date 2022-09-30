import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CustomSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageBox = (props) => {
  console.log(props)
  const { src } = props;
  console.log(src)
  const srcIsArray = Array.isArray(src);
  const srcArray = srcIsArray ? src : [src];
  return (
    <CustomSwiper>
    {/* <Container> */}
      {srcArray.map((src) => (
        <SwiperSlide>
          <StyledImage src={src} draggable={false} />
        </SwiperSlide>
      ))}
    {/* </Container> */}
    </CustomSwiper>
  )
}

export default React.memo(ImageBox);
