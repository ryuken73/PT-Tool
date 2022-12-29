import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function RowRadioButtonsGroup() {
  const { config, setConfigValueState } = useConfigState();
  const { debugTransition } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setConfigValueState('debugTransition', value);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'purple' }}
        id="demo-row-radio-buttons-group-label"
      >
        Debug Transition
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={debugTransition}
        onChange={onChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="True" />
        <FormControlLabel value="no" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(RowRadioButtonsGroup);
