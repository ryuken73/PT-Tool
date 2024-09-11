import * as React from 'react';
import styled from 'styled-components';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'renderer/hooks/useConfigState';

const Row = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.div`
  font-size: 12px;
  color: yellow;
  min-width: 50px;
  margin-right: 20px;
`
const Value = styled(Title)`
  color: white;
`

function SetGoogleEarthPosition() {
  // const { config, setConfigValueState } = useConfigState();
  const { setGooglePositionSetterState } = useAppState();
  const { config, toggleConfigModalState } = useConfigState();
  const {
    googleEarthPrevPosition = { x: 0, y: 0 },
    googleEarthNextPosition = { x: 0, y: 0 },
  } = config;
  // const onChangePrev = React.useCallback((event) => {
  //     const { value } = event.target;
  //     setConfigValueState('showNextButton', value === 'yes');
  //   },
  //   [setConfigValueState]
  // );
  const changePosition = React.useCallback((e) => {
    const mode = e.target.id;
    setGooglePositionSetterState({
        show: true,
        mode,
      });
      toggleConfigModalState();
      // eslint-disable-next-line no-alert
    },
    [setGooglePositionSetterState, toggleConfigModalState]
  );

  return (
    <FormControl>
      <FormLabel
        sx={{ color: 'yellow' }}
        id="demo-row-radio-buttons-group-label"
      >
        Google Earth : Button Position
      </FormLabel>
      <Row>
        <Title>Prev Button Position</Title>
        <Value>x:{googleEarthPrevPosition.x}</Value>
        <Value>y:{googleEarthPrevPosition.y}</Value>
        <button id="prev" onClick={changePosition}>change</button>
      </Row>
      <Row>
        <Title>Next Button Position</Title>
        <Value>x:{googleEarthNextPosition.x}</Value>
        <Value>y:{googleEarthNextPosition.y}</Value>
        <button id="next" onClick={changePosition}>change</button>
      </Row>
      <></>
    </FormControl>
  );
}

export default React.memo(SetGoogleEarthPosition);
