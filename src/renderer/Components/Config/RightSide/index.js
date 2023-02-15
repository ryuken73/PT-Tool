import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetDrawSize from './SetDrawSize';

function RightSide() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetDrawSize />
      </DialogContentText>
    </DialogContent>
  );
}

export default React.memo(RightSide);
