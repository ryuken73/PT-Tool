import React from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function DragHandle(props) {
  const { size } = props;
  const iconStyle = {
    fontSize: `${size === 'small' ? '40px !important' : '40px !important'}`,
    paddingRight: '2px',
    paddingLeft: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <DehazeIcon sx={iconStyle} />;
}
