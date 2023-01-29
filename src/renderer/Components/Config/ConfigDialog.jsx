import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'renderer/hooks/useConfigState';
import SelectTransition from './SelectTransition';
import SelectDebugTransition from './SelectDebugTransition';
import SetBackgroundCapture from './SetBackgroundCapture';
import SetTransitionFull from './SetTransitionFull';
import SetTitleShown from './SetTitleShown';
import SetFillSplitter from './SetFillSplitter';
import SetSwipeThreshold from './SetSwipeThreshold';

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: black;
      opacity: 0.5;
      color: white;
      max-width: 800px;
      border: 1px white solid;
      border-radius: 10px;
    }
  }
`

const InfoBox = styled.div`
  font-size: 12px;
`

const ConfigDialog = props => {
  const { useSrcLocal } = useAppState();
  const { configDialogOpen, config, toggleConfigModalState } = useConfigState();
  const { debugTransition } = config;

  const handleYes = React.useCallback(() => {
    toggleConfigModalState();
  }, [toggleConfigModalState]);

  return (
    <div>
      <CustomDialog open={configDialogOpen} onClose={handleYes}>
        <DialogTitle id="alert-dialog-title">Change Config</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SelectTransition />
          </DialogContentText>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SetTransitionFull />
          </DialogContentText>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SetBackgroundCapture />
          </DialogContentText>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SetTitleShown />
          </DialogContentText>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SetFillSplitter />
          </DialogContentText>
          <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SetSwipeThreshold />
          </DialogContentText>
          {/* <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SelectDebugTransition />
          </DialogContentText> */}
          <InfoBox>Mode: {useSrcLocal ? 'Local' : 'Remote'}</InfoBox>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'white' }} onClick={handleYes} autoFocus>
            OK
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(ConfigDialog);
