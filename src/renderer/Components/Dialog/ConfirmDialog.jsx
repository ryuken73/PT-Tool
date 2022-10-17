import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: black;
      opacity: 0.5;
      color: white;
      width: 200px;
      max-width: 800px;
      border: 1px white solid;
      border-radius: 10px;
    }
  }
`

const ConfirmDialog = props => {
  const {open, handleYes, handleNo, title} = props;

  return (
    <div>
      <CustomDialog
        open={open}
        onClose={handleNo}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: 'white'}} id="alert-dialog-description">
              {title}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'white'}} onClick={handleNo}>No</Button>
          <Button sx={{color: 'white'}} onClick={handleYes} autoFocus>Yes</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(ConfirmDialog);
