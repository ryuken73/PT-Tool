import * as React from 'react';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useConfigState from 'renderer/hooks/useConfigState';

const CustomLabel = styled(FormLabel)`
  width: 300px;
`

function SetLineOpacity() {
  const { config, setConfigValueState } = useConfigState();
  const { lineOpacity } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setConfigValueState('lineOpacity', value/10);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <CustomLabel sx={{ color: 'yellow' }}>
        Draw : Line Transparency
      </CustomLabel>
      <Slider
        aria-label="lineOpacity"
        value={lineOpacity*10}
        min={1}
        max={10}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetLineOpacity);
