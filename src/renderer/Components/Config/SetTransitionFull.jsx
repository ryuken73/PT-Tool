import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function SetTransitionFull() {
  const { isTransitionFull, setIsTransitionFullState } = useConfigState();
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setIsTransitionFullState(value === 'yes');
    },
    [setIsTransitionFullState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'purple' }}
        id="demo-row-radio-buttons-group-label"
      >
        Is Transition Full?
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={isTransitionFull ? 'yes' : 'no'}
        onChange={onChange}
      >
        <FormControlLabel value="yes" control={<Radio />} label="True" />
        <FormControlLabel value="no" control={<Radio />} label="False" />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(SetTransitionFull);
