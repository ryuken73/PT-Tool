import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import useConfigState from 'renderer/hooks/useConfigState';
import useDebounce from 'renderer/hooks/useDebounce';

const dialogConfig = {
  title: 'select image file for home',
  buttonLabel: 'this one will do',
  properties: ['openFile']
};
const Path = styled.div`
  display: flex;
  align-items: center;
  max-width: 450px;
`
const Title = styled.div`
  font-size: 12px;
  color: yellow;
  min-width: 50px;
`
const Value = styled.div`
  font-size: 14px;
  color: cyan;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

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
    },
    [setConfigValueState]
  );
  const onClickSetDefault = React.useCallback(() => {
    setConfigValueState('homeImagePath', null);
  }, [setConfigValueState]);
  const currentPath = homeImagePath || 'default';
  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Home Image Path
      </FormLabel>
      <Path>
        <Title>current : </Title>
        <Value>{currentPath}</Value>
      </Path>
      <Buttons>
        <Button variant="contained" onClick={onClick}>change home image</Button>
        <Button onClick={onClickSetDefault}>set default</Button>
      </Buttons>
    </FormControl>
  );
}

export default React.memo(SetHomeImagePath);
