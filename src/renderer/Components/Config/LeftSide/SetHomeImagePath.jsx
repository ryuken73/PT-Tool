import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useConfigState from 'renderer/hooks/useConfigState';
import useDebounce from 'renderer/hooks/useDebounce';

const dialogConfig = {
  title: 'select image file for home',
  buttonLabel: 'this one will do',
  properties: ['openFile']
}

function SetHomeImagePath() {
  const { config, setConfigValueState } = useConfigState();
  const { homeImagePath } = config;
  // const [threshold, setThreshold] = React.useState(swipeThreshold);
  // const debouncedThreshold = useDebounce(threshold, 200);
  const onClick = React.useCallback(() => {
      window.openFileDialog('showOpenDialog', dialogConfig).then((result) => {
      const fname = result.filePaths[0];
      setConfigValueState('homeImagePath', fname);
    })
      // setConfigValueState('homeImagePath', value);
    },
    // [setConfigValueState]
    [setConfigValueState]
  );
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Home Image Path
      </FormLabel>
      <div>current path: ${homeImagePath}</div>
      <button onClick={onClick}>change home image</button>
    </FormControl>
  );
}

export default React.memo(SetHomeImagePath);
