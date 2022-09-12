import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OptionItemText from 'renderer/Components/Dialog/OptionItemText';
import OptionItemRadio from 'renderer/Components/Dialog/OptionItemRadio';
import useAppState from 'renderer/hooks/useAppState';
import useConfigState from 'hooks/useConfigState';
import useMonitorListState from 'hooks/useMonitorListState';
import CONSTANTS from 'config/constants';


// const toLabelValueFormat = type => {
//   return Object.keys(CONSTANTS[type]).map(key => {
//     return { label: key, value: CONSTANTS[type][key] }
//   })
// }
// const mediaTypeFormItems = toLabelValueFormat('MEDIA_TYPE');
// const urlTypeFormItems = toLabelValueFormat('URL_TYPE');
// const streamTypeFormItems = toLabelValueFormat('STREAM_TYPE');

const assetTypeFormItems = [
  {label: 'video', value: 'video'},
  {label: 'image', value: 'image'},
  {label: 'web', value: 'web'}
]

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: #9f7f7f;
      width: 800px;
      max-width: 800px;
    }
  }
`
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AddDialog = props => {
  const {dialogOpen:open, setDialogOpenState:setOpen, droppedSrc, addAssetState} = useAppState();
  const [asset, setAsset] = React.useState({
    src: droppedSrc,
    assetType: 'web'
  })
  React.useEffect(() => {
    setAsset(asset => {
      return {
        ...asset,
        src: droppedSrc
      }
    })
  },[droppedSrc])
  console.log(asset.src)
  // const {addMonitorItemToList} = useMonitorListState();

  const handleClose = React.useCallback((event, reason) => {
    if(reason === 'backdropClick') return;
    setOpen(false);
  },[setOpen]);

  const handleAddAsset = React.useCallback(() => {
    console.log(asset);
    addAssetState(asset);
    handleClose();
  },[asset, addAssetState, handleClose])

  const onChangeOption = React.useCallback((event, idOfRadiioButton) => {
      const key = event.target.id !== '' ? event.target.id : idOfRadiioButton;
      const value = event.target.value;
      console.log(key, value)
      setAsset({
        ...asset,
        [key]: value
      })
  },[setAsset, asset])

  const radioButtons = [
    {title: 'TYPE', id: 'assetType', formItems: assetTypeFormItems}
  ]

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add Asset"}</DialogTitle>
        <DialogContent>
          <OptionItemText autoFocus onChange={onChangeOption} title="Title" id="title"></OptionItemText>
          <OptionItemText onChange={onChangeOption} value={asset.src} title="Source" id="src"></OptionItemText>
          {radioButtons.map(radioButton => (
            <OptionItemRadio
              onChange={onChangeOption}
              title={radioButton.title}
              id={radioButton.id}
              selected={asset[radioButton.id]}
              formItems={radioButton.formItems}
            ></OptionItemRadio>
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{color: 'black'}} onClick={handleClose}>Cancel</Button>
          <Button sx={{color: 'black'}} onClick={handleAddAsset}>Add</Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
}

export default React.memo(AddDialog)
