import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function RowRadioButtonsGroup() {
  const { transitionName, setTransitionNameState } = useConfigState();
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setTransitionNameState(value);
    },
    [setTransitionNameState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Transition
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={transitionName}
        onChange={onChange}
      >
        <FormControlLabel
          value="videoTransition"
          control={<Radio />}
          label="News"
        />
        <FormControlLabel
          value="cssTransition"
          control={<Radio />}
          label="H-Split"
        />
        <FormControlLabel
          value="noTransition"
          control={<Radio />}
          label="Nothing"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(RowRadioButtonsGroup);
