import React from 'react';
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
import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';
import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import DragHandle from 'renderer/Components/Draw/DragHandle';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useDrawState from 'renderer/hooks/useDrawState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 130px;
`
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.drawShow ? '1fr 1fr 1fr' : '. 1fr .'};
  gap: 0px 2px;
`;
const PalleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #140e30;
  opacity: 0.8 !important;
  color: white;
  border-radius: 10px;
  margin-top: 2px;
  padding: 2px;
  flex-wrap: wrap;
  width: 80px;
  border: 2px solid white;
  /* width: 100px; */
`;
const RowFlexBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const ColorBox = styled.div`
  width: 100%;
  height: 30px;
  background: ${(props) => props.color};
  border-radius: 7px;
  border: 2px solid white;
  /* margin-top: 2px; */
  /* margin-bottom: 2px; */
  /* margin: 3px; */
  cursor: pointer;
  font-size: 20px;
`;
const IconContainer = styled(PalleteContainer)`
  background: grey;
  opacity: 0.8 !important;
`;
const IconContainerOne = styled(IconContainer)`
  width: 34px;
`;
const IconContainerVertical = styled(IconContainerOne)`
  width: 34px;
  margin-left: 5px;
`;
const iconStyle = {
  background: '#140e30',
  color: 'white',
  borderRadius: '20%',
  fontSize: '34px',
  padding: '0px !important',
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
  );
};

const COLORS = ['red', 'darkblue', 'black', 'yellow'];
const CHECK_COLORS = ['black', 'white', 'white', 'black'];
const COLORS_3 = ['darkblue', 'black', 'yellow'];
const CHECK_COLORS_3 = ['white', 'white', 'black'];
const getNextColor = (color) => {
  const nextIndex = COLORS.indexOf(color) + 1;
  const safeNextIndex = nextIndex === COLORS.length ? 0 : nextIndex;
  return COLORS[safeNextIndex];
};

const SIZES = [6, 12, 18];
const getNextSize = (size) => {
  const nextIndex = SIZES.indexOf(size) + 1;
  const safeNextIndex = nextIndex === SIZES.length ? 0 : nextIndex;
  return SIZES[safeNextIndex];
}

const ToolContainer = (props) => {
  // eslint-disable-next-line react/prop-types
  const { drawShow, toggleDraw } = props;
  const [currentColor, setCurrentColor] = React.useState('red');
  const {
    currentOptions,
    changePathOptionState,
    clearPathDatumState,
    undoPathDatumState,
  } = useDrawState();
  const {
    size,
    strokeWidth,
    thinning,
    streamline,
    smoothing,
    isFilled,
    stroke,
    fill,
  } = currentOptions;

  const showStokeIconGrey = !drawShow || strokeWidth === 0;

  const withOutline = {
    ...iconStyle,
    background: `${showStokeIconGrey ? 'darkgrey' : '#140e30'}`,
  };
  const noOutline = {
    ...iconStyle,
    background: `${showStokeIconGrey ? '#140e30' : 'darkgrey'}`,
  };

  const PencilIcon = strokeWidth === 0 ? CircleIcon : PanoramaFishEyeIcon;
  const pencilStyle = strokeWidth === 0 ? noOutline : withOutline;

  // eslint-disable-next-line no-nested-ternary
  const SizeIcon =
    // eslint-disable-next-line no-nested-ternary
    size === 6
      ? SignalWifi1BarIcon
      : size === 12
      ? SignalWifi2BarIcon
      : SignalWifi4BarIcon;

  const onClickColor = React.useCallback((event) => {
      const targetFill = event.target.getAttribute('color');
      changePathOptionState('fill', targetFill);
      changePathOptionState('stroke', CHECK_COLORS[COLORS.indexOf(targetFill)]);
    },
    [changePathOptionState]
  );

  const toggleColor = React.useCallback(() => {
    const nextColor = getNextColor(currentColor);
    changePathOptionState('fill', nextColor);
    changePathOptionState('stroke', CHECK_COLORS[COLORS.indexOf(nextColor)]);
    setCurrentColor(nextColor);
  }, [changePathOptionState, currentColor]);

  const toggleStroke = React.useCallback(() => {
    const nextValue = strokeWidth === 0 ? 3 : 0;
    changePathOptionState('strokeWidth', nextValue);
  }, [changePathOptionState, strokeWidth]);

  const toggleSize = React.useCallback(() => {
    const nextValue = getNextSize(size);
    changePathOptionState('size', nextValue);
  }, [changePathOptionState, size]);

  const timeout = 200;

  return (
    <Container>
    <strong>
      <DragHandle className="dragHandler" size="small" />
    </strong>
    <GridContainer drawShow={drawShow}>
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'right 50%',
          transitionDelay: 0,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <ColorBox
            onTouchStart={onClickColor}
            onClick={onClickColor}
            color="red"
          >
            {fill === 'red' && <CheckSvg color="black" />}
          </ColorBox>
        </IconContainerOne>
      </Zoom>
      <IconContainerOne>
        <IconButton
          sx={{ padding: '0px' }}
          size="medium"
          onTouchStart={toggleDraw}
          onClick={toggleDraw}
          onTouchTap={toggleDraw}
        >
          <ModeEditIcon sx={iconStyle} />
        </IconButton>
      </IconContainerOne>
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'right 50%',
          transitionDelay: 0,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <ColorBox
            onTouchStart={onClickColor}
            onClick={onClickColor}
            color="yellow"
          >
            {fill === 'yellow' && <CheckSvg color="black" />}
          </ColorBox>
        </IconContainerOne>
      </Zoom>
      {/* color changer */}
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'right 50%',
          transitionDelay: 0,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <ColorBox
            onTouchStart={onClickColor}
            onClick={onClickColor}
            color="darkblue"
          >
            {fill === 'darkblue' && <CheckSvg color="white" />}
          </ColorBox>
        </IconContainerOne>
      </Zoom>
      {/* toggleStrokie */}
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'right 0%',
          transitionDelay: 100,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <IconButton
            sx={{ padding: '0px' }}
            size="medium"
            onTouchStart={toggleStroke}
            onClick={toggleStroke}
            onTouchTap={toggleStroke}
          >
            <PencilIcon sx={pencilStyle} />
          </IconButton>
        </IconContainerOne>
      </Zoom>
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'right 50%',
          transitionDelay: 0,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <ColorBox
            onTouchStart={onClickColor}
            onClick={onClickColor}
            color="black"
          >
            {fill === 'black' && <CheckSvg color="white" />}
          </ColorBox>
        </IconContainerOne>
      </Zoom>
      {/* minus paths */}
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: '50% top',
          transitionDelay: 200,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <IconButton
            sx={{ padding: '0px' }}
            size="medium"
            onTouchStart={undoPathDatumState}
            onClick={undoPathDatumState}
          >
            <IndeterminateCheckBoxIcon sx={iconStyle} />
          </IconButton>
        </IconContainerOne>
      </Zoom>
      {/* clear button */}
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'left 0%',
          transitionDelay: 300,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <IconButton
            sx={{ padding: '0px' }}
            size="medium"
            onTouchStart={clearPathDatumState}
            onClick={clearPathDatumState}
          >
            <DeleteForeverIcon sx={iconStyle} />
          </IconButton>
        </IconContainerOne>
      </Zoom>
      {/* toggle size of pen */}
      <Zoom
        in={drawShow}
        timeout={timeout}
        style={{
          transformOrigin: 'left 50%',
          transitionDelay: 300,
          display: drawShow ? 'flex' : 'none',
        }}
      >
        <IconContainerOne>
          <IconButton
            sx={{ padding: '0px' }}
            size="medium"
            onTouchStart={toggleSize}
            onClick={toggleSize}
            onTouchTap={toggleSize}
          >
            <SizeIcon sx={iconStyle} />
          </IconButton>
        </IconContainerOne>
      </Zoom>
      {/* <Zoom in={drawShow} timeout={500} style={{ transformOrigin: '0 0 0' }}>
        <div>
          <RowFlexBox>
          <PalleteContainer>
            {COLORS.map((color, index) => (
                <ColorBox
                  key={color}
                  onTouchStart={onClickColor}
                  onClick={onClickColor}
                  color={color}
                >
                  {fill === color && <CheckSvg color={CHECK_COLORS[index]} />}
                </ColorBox>
              ))}
          </PalleteContainer>
          </RowFlexBox>
          <IconContainer>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onTouchStart={toggleStroke}
              onClick={toggleStroke}
            >
              <CircleIcon sx={noOutline} />
            </IconButton>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onTouchStart={toggleStroke}
              onClick={toggleStroke}
            >
              <PanoramaFishEyeIcon sx={withOutline} />
            </IconButton>
          </IconContainer>
          <IconContainer>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onTouchStart={undoPathDatumState}
              onClick={undoPathDatumState}
            >
              <IndeterminateCheckBoxIcon sx={iconStyle} />
            </IconButton>
            <IconButton
              sx={{ padding: '0px' }}
              size="medium"
              onTouchStart={clearPathDatumState}
              onClick={clearPathDatumState}
            >
              <DeleteForeverIcon sx={iconStyle} />
            </IconButton>
          </IconContainer>
        </div>
      </Zoom> */}
    </GridContainer>
    </Container>
  );
};

export default React.memo(ToolContainer);
