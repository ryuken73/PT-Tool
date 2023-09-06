import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function SelectArrowShape() {
  const { config, setConfigValueState } = useConfigState();
  const { arrowShape } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setConfigValueState('arrowShape', value);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Draw : Arrow Shape
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={arrowShape}
        onChange={onChange}
      >
        <FormControlLabel value="normal" control={<Radio />} label="Normal" />
        <FormControlLabel value="sharp" control={<Radio />} label="Sharp" />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(SelectArrowShape);
