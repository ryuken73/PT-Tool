import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import RemoveIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import useAssetState from 'renderer/hooks/useAssetState';

const Container = styled.div`
  position: absolute;
  top: ${(props) => !props.isBottomSide && '30px'};
  bottom: ${(props) => props.isBottomSide && '30px'};
  left: ${(props) => !props.isRightSide && '30px'};
  right: ${(props) => props.isRightSide && '30px'};
  z-index: 20000;
  height: 50px;
  border-radius: 25px;
  overflow: hidden;
  background: #444;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;
  font-size: 20px;
  opacity: 0.3;
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
    width: 300px;
    // background-position: 0px -50px;
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

function CSSToggleMenuWebView(props) {
  // eslint-disable-next-line react/prop-types
  const { srcId, isFirstImage, displayMode, scale, translateX, translateY } = props;
  const { updateCurrentAssetSrc } = useAssetState();
  const isToggleBtnRightSide =
    !isFirstImage &&
    (displayMode === 'overlaySplit' ||
      displayMode === 'flexRow' ||
      displayMode === 'flexColumn');
  const isToggleBtnDownSide = !isFirstImage && displayMode === 'flexColumn';

  const zoomIn = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'scale', scale + 0.05);
  }, [scale, srcId, updateCurrentAssetSrc]);

  const zoomOut = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'scale', scale - 0.05);
  }, [scale, srcId, updateCurrentAssetSrc]);

  const moveLeft = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateX', translateX - 1);
  }, [srcId, translateX, updateCurrentAssetSrc]);

  const moveRight = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateX', translateX + 1);
  }, [srcId, translateX, updateCurrentAssetSrc]);

  const moveUp = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateY', translateY - 1);
  }, [srcId, translateY, updateCurrentAssetSrc]);

  const moveDown = React.useCallback(() => {
    updateCurrentAssetSrc(srcId, 'translateY', translateY + 1);
  }, [srcId, translateY, updateCurrentAssetSrc]);

  return (
    <Container
      isRightSide={isToggleBtnRightSide}
      isBottomSide={isToggleBtnDownSide}
    >
      <ToggleButton type="checkbox" />
      <ButtonList>
        <CustomButton>
          <IconButton onClick={zoomIn}>
            <AddIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={zoomOut}>
            <RemoveIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveLeft}>
            <ArrowBackIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveRight}>
            <ArrowForwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveUp}>
            <ArrowUpwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
        <CustomButton>
          <IconButton onClick={moveDown}>
            <ArrowDownwardIcon
              sx={{
                fontSize: 30,
                color: 'white',
                opacity: 1,
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </CustomButton>
      </ButtonList>
    </Container>
  );
}

export default React.memo(CSSToggleMenuWebView);
