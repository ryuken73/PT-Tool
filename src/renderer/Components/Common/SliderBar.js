import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import SliderUnstyled from '@mui/base/SliderUnstyled';

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? '#a31700' : '#90caf9'};
  height: 4px;
  width: 100%;
  padding: 5px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 2px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 12px;
    height: 12px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#a31700' : '#90caf9',
        0.15,
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#a31700' : '#90caf9',
        0.3,
      )};
    }
  }
`,
);

const UnstyledSlider = props => {
  const {value="0", onChange=()=>{}} = props;
  const handleChange = React.useCallback((event, value) => {
    console.log('****', value);
    onChange(value);
  },[])
  return (
    <Box>
      <StyledSlider defaultValue={"0"} value={value} onChange={handleChange}/>
    </Box>
  );
}

export default React.memo(UnstyledSlider);
