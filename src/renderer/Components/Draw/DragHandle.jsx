import React from 'react'
import DragHandleIcon from '@mui/icons-material/DragHandle';

const iconStyle = {
  fontSize: '40px',
}
export default function DragHandle() {
  return (
    <DragHandleIcon
      sx={iconStyle}
    ></DragHandleIcon>
  )
}
