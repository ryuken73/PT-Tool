import React from 'react'
import styled from 'styled-components';
import Zoom from '@mui/material/Zoom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import EditIcon from '@mui/icons-material/Edit';
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
  width: auto;
`
const iconStyle = {
  background:"#140e30",
  color:"white",
  borderRadius: "20%",
  fontSize: "38px",
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
  } = useDrawState();

  const showStokeIconGrey = !drawShow  || !showBorder;

  const customIconStyle = {
    ...iconStyle,
    background: `${showStokeIconGrey ? 'darkgrey' : '#140e30'}`,
  };
  const onClickColor = React.useCallback((event) => {
    setFillColorState(event.target.getAttribute('color'));
  },[setFillColorState]);

  const toggleStroke = React.useCallback(() => {
    setShowBorderState(!showBorder)
  }, [setShowBorderState, showBorder]);
  return (
    <Container>
      <IconContainer>
        <IconButton sx={{ padding: '0px' }} size="medium" onClick={toggleDraw}>
          <ModeEditIcon sx={iconStyle} />
        </IconButton>
        <IconButton
          sx={{ padding: '0px' }}
          disabled={!drawShow}
          size="medium"
          onClick={toggleStroke}
        >
          <ModeEditOutlinedIcon sx={customIconStyle} />
        </IconButton>
      </IconContainer>
      <Zoom in={drawShow} timeout={500} style={{ transformOrigin: '0 0 0' }}>
        <div>
          <PalleteContainer>
            {COLORS.map((color, index) => (
              <ColorBox key={color} onClick={onClickColor} color={color}>
                {fillColor === color && (
                  <CheckSvg color={CHECK_COLORS[index]} />
                )}
              </ColorBox>
            ))}
          </PalleteContainer>
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
