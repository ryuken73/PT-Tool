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
  position: absolute;
  top: 200px;
  right: 200px;
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
`
const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background: #140e30; */
  justify-content: space-around;
  background: white;
  opacity: 0.6 !important;
  color: white;
  border-radius: 10px;
  margin-top: 5px;
  padding: 3px;
  flex-wrap: wrap;
  width: 80px;
  border: 2px solid #140e30;
  /* width: 100px; */
`
const iconStyle = {
  background:"#140e30",
  color:"white",
  borderRadius: "20%",
  fontSize: "38px",
  padding: "0px !important"
}

const ToolContainer = (props) => {
  const { drawShow, toggleDraw } = props;
  const { clearPathDatumState, undoPathDatumState } = useDrawState();
  return (
    <Container>
      <IconContainer>
        <IconButton sx={{ padding: '0px' }} size="medium" onClick={toggleDraw}>
          <ModeEditIcon sx={iconStyle} />
        </IconButton>
        <IconButton sx={{ padding: '0px' }} size="medium" onClick={toggleDraw}>
          <ModeEditOutlinedIcon sx={iconStyle} />
        </IconButton>
      </IconContainer>
      <Zoom in={drawShow} timeout={500} style={{ transformOrigin: '0 0 0' }}>
        <div>
          <PalleteContainer>
            <ColorBox color="black" />
            <ColorBox color="white" />
            <ColorBox color="maroon" />
            <ColorBox color="yellow" />
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
