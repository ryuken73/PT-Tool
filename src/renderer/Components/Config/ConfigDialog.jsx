import * as React from 'react';
import styled from 'styled-components';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useConfigState from 'renderer/hooks/useConfigState';
import Divider from '@mui/material/Divider';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const CustomDialog = styled(Dialog)`
  z-index: 9999 !important;
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: black;
      opacity: 0.5;
      color: white;
      max-width: 1200px;
      width: 1000px;
      border: 1px white solid;
      border-radius: 10px;
    }
  }
`
const Container = styled.div`
  display: flex;
`
const ConfigDialog = props => {
  const { configDialogOpen, config, toggleConfigModalState } = useConfigState();
  const { debugTransition } = config;

  const handleYes = React.useCallback(() => {
    toggleConfigModalState();
  }, [toggleConfigModalState]);

  return (
      <CustomDialog open={configDialogOpen} onClose={handleYes}>
        <DialogTitle id="alert-dialog-title">Change Config</DialogTitle>
        <Container>
          <LeftSide />
          <Divider orientation="vertical" FlexItem />
          <RightSide />
          {/* <DialogContentText
            sx={{ color: 'white' }}
            id="alert-dialog-description"
          >
            <SelectDebugTransition />
          </DialogContentText> */}
        </Container>
        <DialogActions>
          <Button sx={{ color: 'white' }} onClick={handleYes} autoFocus>
            OK
          </Button>
        </DialogActions>
      </CustomDialog>
  );
}

export default React.memo(ConfigDialog);
