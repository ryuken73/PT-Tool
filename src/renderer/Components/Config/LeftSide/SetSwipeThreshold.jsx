import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useConfigState from 'renderer/hooks/useConfigState';
import useDebounce from 'renderer/hooks/useDebounce';

function SetFillSplitter() {
  const { config, setConfigValueState } = useConfigState();
  const { swipeThreshold = 10 } = config;
  // const [threshold, setThreshold] = React.useState(swipeThreshold);
  // const debouncedThreshold = useDebounce(threshold, 200);
  const onChange = React.useCallback((event) => {
      const { value } = event.target;
      // setThreshold(value);
      setConfigValueState('swipeThreshold', value);
    },
    [setConfigValueState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Swipe Mode : Swipe Threshold
      </FormLabel>
      <Slider
        aria-label="swipeThreshold"
        value={swipeThreshold}
        onChange={onChange}
        valueLabelDisplay="auto"
      />
    </FormControl>
  );
}

export default React.memo(SetFillSplitter);
