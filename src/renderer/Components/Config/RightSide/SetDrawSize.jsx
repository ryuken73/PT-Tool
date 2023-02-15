import * as React from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useConfigState from 'renderer/hooks/useConfigState';

const CustomLabel = styled(FormLabel)`
  width: 300px;
`

function SetDrawSize() {
  const { config, setConfigValueState } = useConfigState();
  const { baseLineSize = 6 } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setConfigValueState('baseLineSize', value);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <CustomLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Draw : Pen Size
      </CustomLabel>
      <Slider
        aria-label="baseLineSize"
        value={baseLineSize}
        min={5}
        max={100}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetDrawSize);
