import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import SetDrawSize from './SetDrawSize';
import SetLineOpacity from './SetLineOpacity';
import SetLineStrokeWidth from './SetLineStrokeWidth';
import SelectToolContainer from './SelectToolContainer';

function RightSide() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <DialogContent>
      <DialogContentText sx={{ color: 'white' }}>
        <SetDrawSize />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetLineOpacity />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SetLineStrokeWidth />
      </DialogContentText>
      <DialogContentText sx={{ color: 'white' }}>
        <SelectToolContainer />
      </DialogContentText>
    </DialogContent>
  );
}

export default React.memo(RightSide);
