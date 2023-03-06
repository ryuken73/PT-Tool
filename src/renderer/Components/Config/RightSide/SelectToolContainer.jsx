import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useConfigState from 'renderer/hooks/useConfigState';

function RowRadioButtonsGroup() {
  const { config, setConfigValueState } = useConfigState();
  const { toolContainerType } = config;
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      setConfigValueState('toolContainerType', value);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Draw : Tool Container
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={toolContainerType}
        onChange={onChange}
      >
        <FormControlLabel value="classic" control={<Radio />} label="Classic" />
        <FormControlLabel value="simple" control={<Radio />} label="Simple" />
        <FormControlLabel
          value="twoColumn"
          control={<Radio />}
          label="Two Col"
        />
        <FormControlLabel
          value="oneColumn"
          control={<Radio />}
          label="Single Col"
        />
      </RadioGroup>
    </FormControl>
  );
}

export default React.memo(RowRadioButtonsGroup);
