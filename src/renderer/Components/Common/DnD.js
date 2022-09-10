import React from 'react';
import Box from '@mui/material/Box'
import styled from 'styled-components';
import {useDropzone} from 'react-dropzone';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px white dashed;
  font-size: 12px;
  color: white;
  padding: 5px;
  height: 20px;
  width: 300px;
  margin-right: 20px;
  flex: 1;
  border-color: ${props => getColor(props)};
  background: ${props => props.isDragAccept ? '#343858':'transparent'};
  color: #bdbdbd;
  outline: none;
  transition: all .24s ease-in-out;
`

const DnD = props => {
  const {onDropJson, message='Drop Files or Folder'} = props;
  const dropZoneOptions = {
    noClick: true,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      onDropJson(acceptedFiles);
    }
  }
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone(dropZoneOptions);

  return (
    <Container {...getRootProps({isFocused, isDragAccept, isDragReject})}>
      <input {...getInputProps()}></input>
      <Box sx={{padding: '0px'}}>{message}</Box>
    </Container>
  );
}

export default React.memo(DnD);
