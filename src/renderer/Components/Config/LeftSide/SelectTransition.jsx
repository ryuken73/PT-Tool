import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function RowRadioButtonsGroup() {
  const {
    transitionType,
    transitionResource,
    setTransitionTypeState,
    setTransitionResourceState,
  } = useConfigState();
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      const type = value.split('-')[0];
      const resource = value.split('-')[1] || 'none';
      setTransitionTypeState(type);
      setTransitionResourceState(resource);
    },
    [setTransitionTypeState, setTransitionResourceState]
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
        value={`${transitionType}-${transitionResource}`}
        onChange={onChange}
      >
        <FormControlLabel
          value="videoTransition-toRight"
          control={<Radio />}
          label="To-Right"
        />
        <FormControlLabel
          value="videoTransition-toLeft"
          control={<Radio />}
          label="To-Left"
        />
        <FormControlLabel
          value="videoTransition-blur"
          control={<Radio />}
          label="Blur"
        />
        <FormControlLabel
          value="videoTransition-splitUp"
          control={<Radio />}
          label="Split Up"
        />
        {/* <FormControlLabel
          value="cssTransition-none"
          control={<Radio />}
          label="H-Split"
        /> */}
        <FormControlLabel
          value="noTransition-none"
          control={<Radio />}
          label="None"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(RowRadioButtonsGroup);
