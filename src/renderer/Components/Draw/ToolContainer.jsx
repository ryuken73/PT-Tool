import React from 'react'
import styled from 'styled-components';
import Zoom from '@mui/material/Zoom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useDrawState from 'renderer/hooks/useDrawState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 9999;
  width: auto;
`;
const PalleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #140e30;
  opacity: 0.7 !important;
  color: white;
  border-radius: 10px;
  margin-top: 5px;
  padding: 3px;
  flex-wrap: wrap;
  width: 80px;
  border: 2px solid white;
  /* width: 100px; */
`
const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row
`
const ColorBox = styled.div`
  width: 43%;
  height: 30px;
  background: ${props => props.color};
  border-radius: 7px;
  border: 2px solid white;
  margin-top: 2px;
  margin-bottom: 2px;
  /* margin: 3px; */
  cursor: pointer;
  font-size: 20px;
`
const IconContainer = styled(PalleteContainer)`
  background: grey;
  opacity: 0.6 !important;
`
const IconContainerOne = styled(IconContainer)`
  width: 34px;
`
const IconContainerVertical = styled(IconContainerOne)`
  width: 34px;
  margin-left: 5px;
`
const iconStyle = {
  background:"#140e30",
  color:"white",
  borderRadius: "20%",
  fontSize: "34px",
  padding: "0px !important"
};
const CheckSvg = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 20"
      fill={props.color}
    >
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
    </svg>
  )
};

const COLORS = ["black", "white", "red", "yellow"];
const CHECK_COLORS = ["white", "black", "black", "black"];

const ToolContainer = (props) => {
  const { drawShow, toggleDraw } = props;
  const {
    fillColor,
    showBorder,
    clearPathDatumState,
    undoPathDatumState,
    setFillColorState,
    setShowBorderState,
    increaseFillWidthState,
    decreaseFillWidthState
  } = useDrawState();

  const showStokeIconGrey = !drawShow  || !showBorder;

  const withOutline = {
    ...iconStyle,
    background: `${showStokeIconGrey ? 'darkgrey' : '#140e30'}`,
  };
  const noOutline = {
    ...iconStyle,
    background: `${showStokeIconGrey ? '#140e30': 'darkgrey'}`,
  };

  const onClickColor = React.useCallback((event) => {
    setFillColorState(event.target.getAttribute('color'));
  },[setFillColorState]);

  const toggleStroke = React.useCallback(() => {
    setShowBorderState(!showBorder)
  }, [setShowBorderState, showBorder]);

  return (
    <Container>
      <IconContainerOne>
        <IconButton sx={{ padding: '0px' }} size="medium" onClick={toggleDraw}>
          <ModeEditIcon sx={iconStyle} />
        </IconButton>
      </IconContainerOne>
      <Zoom in={drawShow} timeout={500} style={{ transformOrigin: '0 0 0' }}>
        <div>
          <RowFlexBox>
          <PalleteContainer>
            {COLORS.map((color, index) => (
              <ColorBox key={color} onClick={onClickColor} color={color}>
                {fillColor === color && (
                  <CheckSvg color={CHECK_COLORS[index]} />
                )}
              </ColorBox>
            ))}
          </PalleteContainer>
          <IconContainerVertical>
            <IconButton sx={{ padding: '0px' }} size="medium" onClick={increaseFillWidthState}>
              <ArrowDropUpIcon sx={iconStyle} />
            </IconButton>
            <IconButton sx={{ padding: '0px' }} size="medium" onClick={decreaseFillWidthState}>
              <ArrowDropDownIcon sx={iconStyle} />
            </IconButton>
          </IconContainerVertical>
          </RowFlexBox>
          <IconContainer>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onClick={toggleStroke}
            >
              <CircleIcon sx={noOutline} />
            </IconButton>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onClick={toggleStroke}
            >
              <PanoramaFishEyeIcon sx={withOutline} />
            </IconButton>
          </IconContainer>
          <IconContainer>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onClick={undoPathDatumState}
            >
              <IndeterminateCheckBoxIcon sx={iconStyle} />
            </IconButton>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onClick={clearPathDatumState}
            >
              <DeleteForeverIcon sx={iconStyle} />
            </IconButton>
          </IconContainer>
        </div>
      </Zoom>
    </Container>
  )
}

export default React.memo(ToolContainer);
