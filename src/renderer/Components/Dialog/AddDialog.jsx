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
import useDialogState from 'renderer/hooks/useDialogState';
import useConfigState from 'hooks/useConfigState';
import CONSTANTS from 'config/constants';
import useAssetState from 'renderer/hooks/useAssetState';

// const toLabelValueFormat = type => {
//   return Object.keys(CONSTANTS[type]).map(key => {
//     return { label: key, value: CONSTANTS[type][key] }
//   })
// }
// const mediaTypeFormItems = toLabelValueFormat('MEDIA_TYPE');
// const urlTypeFormItems = toLabelValueFormat('URL_TYPE');
// const streamTypeFormItems = toLabelValueFormat('STREAM_TYPE');

const assetTypeFormItems = [
  { label: 'video', value: 'video' },
  { label: 'image', value: 'image' },
  { label: 'web', value: 'web' },
];

const radioButtons = [
  { title: 'TYPE', id: 'assetType', formItems: assetTypeFormItems },
];

const CustomDialog = styled(Dialog)`
  div.MuiDialog-container {
    div.MuiPaper-root {
      background: #9f7f7f;
      width: 800px;
      max-width: 800px;
    }
  }
`;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const AddDialog = (props) => {
  const {
    dialogOpen: open,
    setDialogOpenState: setOpen,
    droppedSrc,
  } = useDialogState();
  const { addAssetState } = useAssetState();

  const [asset, setAsset] = React.useState({
    assetId: Date.now(),
    created: null,
    updated: null,
    sources:[{}]
  });

  React.useEffect(() => {
    setAsset((asset) => {
      return {
        ...asset,
        sources: [{
          srcId: Date.now(),
          srcLocal: droppedSrc,
          srcRemote: droppedSrc,
          srcType: 'video'
        }],
      };
    });
  }, [droppedSrc]);

  console.log('%%%', asset);

  const handleClose = React.useCallback(
    (event, reason) => {
      if (reason === 'backdropClick') return;
      setOpen(false);
    },
    [setOpen]
  );

  const handleAddAsset = React.useCallback(() => {
    console.log(asset);
    addAssetState(asset);
    handleClose();
  }, [asset, addAssetState, handleClose]);

  const onChangeOption = React.useCallback(
    (event) => {
      const { value } = event.target;
      setAsset((asset) => {
        return {
          ...asset,
          sources: [{
            ...asset.sources[0],
            srcType: value
          }],
        }
      });
    },
    [setAsset, asset]
  );

  const onChangeTitle = React.useCallback(
    (event) => {
      const title = event.target.value;
      setAsset({
        ...asset,
        assetTitle: title,
      });
    },
    [asset]
  );

  const onChangeSource = React.useCallback(
    (event) => {
      const src = event.target.value;
      const targetSource = { ...asset.sources[0] };
      targetSource.srcLocal = src;
      targetSource.srcRemote = src;
      setAsset({
        ...asset,
        sources: [targetSource],
      });
    },
    [setAsset, asset]
  );

  return (
    <div>
      <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Asset</DialogTitle>
        <DialogContent>
          <OptionItemText
            autoFocus
            onChange={onChangeTitle}
            title="Title"
            id="assetTitle"
          />
          <OptionItemText
            onChange={onChangeSource}
            value={asset.sources[0].srcLocal}
            title="Source"
            id="src"
          />
          {radioButtons.map((radioButton) => (
            <OptionItemRadio
              onChange={onChangeOption}
              title="TYPE"
              id="srcType"
              selected={asset.sources[0].srcType}
              formItems={radioButton.formItems}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: 'black' }} onClick={handleAddAsset}>
            Add
          </Button>
        </DialogActions>
      </CustomDialog>
    </div>
  );
};

export default React.memo(AddDialog);
