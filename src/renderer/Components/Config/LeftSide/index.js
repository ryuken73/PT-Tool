import React from 'react';
import styled from 'styled-components';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useAppState from 'renderer/hooks/useAppState';
import SelectTransition from './SelectTransition';
import SetBackgroundCapture from './SetBackgroundCapture';
import SetTransitionFull from './SetTransitionFull';
import SetTitleShown from './SetTitleShown';
import SetFillSplitter from './SetFillSplitter';
import SetSwipeThreshold from './SetSwipeThreshold';
import SetHomeImagePath from './SetHomeImagePath';

const InfoBox = styled.div`
  font-size: 12px;
`;
const OpenDevTools = styled.button`
  font-size: 12px;
  cursor: pointer;
`;

function LeftSide() {
  const [appVersion, setAppVersion] = React.useState('fetching...');
  const { useSrcLocal } = useAppState();
  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return, promise/always-return
    window.getAppVersion().then((version) => {
      setAppVersion(version);
    });
  }, []);
  const openDevTools = React.useCallback(() => {
    window.openDevTools();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetHomeImagePath />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SelectTransition />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTransitionFull />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetBackgroundCapture />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetTitleShown />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetFillSplitter />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetSwipeThreshold />
      </DialogContentText>
      <p></p>
      <InfoBox>
        Mode: {useSrcLocal ? 'Local' : 'Remote'}, Version: {appVersion}
      </InfoBox>
      <OpenDevTools onClick={openDevTools}>Open Debug Tools</OpenDevTools>
    </DialogContent>
  );
}

export default React.memo(LeftSide);
