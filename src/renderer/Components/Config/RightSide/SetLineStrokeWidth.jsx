import * as React from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useDrawState from 'renderer/hooks/useDrawState';

const CustomLabel = styled(FormLabel)`
  width: 300px;
`

function SetLineStrokeWidth() {
  const { currentOptions, setStrokeWidthFromConfigState } = useDrawState();
  const { strokeWidth } = currentOptions;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setStrokeWidthFromConfigState(value);
    },
    [setStrokeWidthFromConfigState]
  );
  return (
    <FormControl>
      <CustomLabel sx={{ color: 'yellow' }}>
        Draw : Line Border Width
      </CustomLabel>
      <Slider
        aria-label="strokeWidth"
        value={strokeWidth}
        min={1}
        max={10}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetLineStrokeWidth);
